(function () {
  const form = document.getElementById('brief-form');
  const submit = document.getElementById('brief-submit');
  const loading = document.getElementById('brief-loading');
  const loadingMsg = document.getElementById('brief-loading-msg');
  const result = document.getElementById('brief-result');
  const output = document.getElementById('brief-output');
  const error = document.getElementById('brief-error');
  const reset = document.getElementById('brief-reset');
  const textarea = document.getElementById('brief-description');
  const charcount = document.getElementById('brief-charcount');

  if (!form) return;

  const LOADING_SEQUENCE = [
    'The goats are reading your brief…',
    'The horses are considering the implications…',
    'The dogs have convened an emergency strategy session…',
    'The chickens have a strong opinion about your sector…',
    'The geese are arguing about the framing…',
    'The goats have overruled the geese…',
    'The horses are drafting the opening line…',
    'The dogs are fact-checking the assumptions…',
    'The chickens insist on one more revision…',
    'The farm has reached a consensus…',
    'Synthesizing across three fields and five disciplines…',
    'Almost there — final review in progress…',
  ];

  let loadingInterval = null;
  let loadingIndex = 0;

  textarea.addEventListener('input', function () {
    const len = textarea.value.length;
    charcount.textContent = len + ' / 1000';
  });

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const description = textarea.value.trim();
    if (!description) return;

    setError('');
    startLoading();

    try {
      const res = await fetch('/api/brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description })
      });

      const data = await res.json();

      stopLoading();

      if (!res.ok || data.error) {
        setError(data.error || 'Something went wrong. Please try again.');
        return;
      }

      output.innerHTML = renderBrief(data.brief);
      form.hidden = true;
      result.hidden = false;
    } catch {
      stopLoading();
      setError('Could not reach the server. Please check your connection and try again.');
    }
  });

  reset.addEventListener('click', function () {
    form.hidden = false;
    result.hidden = true;
    textarea.value = '';
    charcount.textContent = '0 / 1000';
    output.innerHTML = '';
  });

  function startLoading() {
    submit.disabled = true;
    form.hidden = true;
    loading.hidden = false;
    loadingIndex = 0;
    loadingMsg.textContent = LOADING_SEQUENCE[0];
    loadingInterval = setInterval(function () {
      loadingIndex = (loadingIndex + 1) % LOADING_SEQUENCE.length;
      loadingMsg.textContent = LOADING_SEQUENCE[loadingIndex];
    }, 2200);
  }

  function stopLoading() {
    clearInterval(loadingInterval);
    loadingInterval = null;
    loading.hidden = true;
    submit.disabled = false;
  }

  function setError(msg) {
    error.textContent = msg;
    error.hidden = !msg;
    if (msg) form.hidden = false;
  }

  // Render plain-text markdown into basic HTML without a library.
  function renderBrief(text) {
    const lines = text.split('\n');
    const html = [];
    let inList = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

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
        html.push('<li>' + inlineBold(escHtml(line.replace(/^[-*]\s/, ''))) + '</li>');
        continue;
      }

      if (inList) { html.push('</ul>'); inList = false; }

      if (!line.trim()) continue;

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
