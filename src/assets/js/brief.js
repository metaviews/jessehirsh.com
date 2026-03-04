(function () {
  const form = document.getElementById('brief-form');
  const submit = document.getElementById('brief-submit');
  const result = document.getElementById('brief-result');
  const output = document.getElementById('brief-output');
  const error = document.getElementById('brief-error');
  const reset = document.getElementById('brief-reset');
  const textarea = document.getElementById('brief-description');

  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const description = textarea.value.trim();
    if (!description) return;

    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description })
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error || 'Something went wrong. Please try again.');
        setLoading(false);
        return;
      }

      output.innerHTML = renderBrief(data.brief);
      form.hidden = true;
      result.hidden = false;
    } catch {
      setError('Could not reach the server. Please check your connection and try again.');
    }

    setLoading(false);
  });

  reset.addEventListener('click', function () {
    form.hidden = false;
    result.hidden = true;
    textarea.value = '';
    output.innerHTML = '';
  });

  function setLoading(on) {
    submit.disabled = on;
    submit.textContent = on ? 'Generating…' : 'Generate briefing';
  }

  function setError(msg) {
    error.textContent = msg;
    error.hidden = !msg;
  }

  // Render the plain-text markdown response into basic HTML.
  // Handles **bold**, section headers (lines ending in nothing after **text**),
  // bullet lists, and paragraphs — without a library.
  function renderBrief(text) {
    const lines = text.split('\n');
    const html = [];
    let inList = false;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];

      // Bold section headers: **Some text** on its own line
      if (/^\*\*[^*]+\*\*\s*$/.test(line)) {
        if (inList) { html.push('</ul>'); inList = false; }
        const label = line.replace(/\*\*/g, '').trim();
        html.push('<h3>' + escHtml(label) + '</h3>');
        continue;
      }

      // Bullet items
      if (/^[-*]\s/.test(line)) {
        if (!inList) { html.push('<ul>'); inList = true; }
        const item = inlineBold(escHtml(line.replace(/^[-*]\s/, '')));
        html.push('<li>' + item + '</li>');
        continue;
      }

      if (inList) { html.push('</ul>'); inList = false; }

      // Blank line
      if (!line.trim()) {
        continue;
      }

      html.push('<p>' + inlineBold(escHtml(line)) + '</p>');
    }

    if (inList) html.push('</ul>');
    return html.join('\n');
  }

  function inlineBold(str) {
    return str.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  }

  function escHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
})();
