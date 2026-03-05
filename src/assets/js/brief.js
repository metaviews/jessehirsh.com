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
  const saveBtn = document.getElementById('brief-save-btn');
  const saveStatus = document.getElementById('brief-save-status');

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
  let lastParsed = null;

  // Initialise display states explicitly — don't rely on [hidden] attribute
  hide(loading);
  hide(result);
  hide(error);
  show(form);

  textarea.addEventListener('input', function () {
    charcount.textContent = textarea.value.length + ' / 1000';
  });

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const description = textarea.value.trim();
    if (!description) return;

    setError('');
    lastParsed = null;
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

      lastParsed = parseForSave(data.brief);
      output.innerHTML = renderBrief(data.brief);
      hide(form);
      show(result);
      if (saveBtn) saveBtn.disabled = false;
      if (saveStatus) { hide(saveStatus); saveStatus.innerHTML = ''; }
    } catch {
      stopLoading();
      setError('Could not reach the server. Please check your connection and try again.');
    }
  });

  if (saveBtn) {
    saveBtn.addEventListener('click', async function () {
      console.log('[brief] save clicked, lastParsed:', lastParsed);
      if (!lastParsed) {
        console.log('[brief] lastParsed is null, aborting');
        return;
      }
      if (!lastParsed.title) {
        console.log('[brief] title is empty, parse failed');
        saveStatus.textContent = 'Could not parse the talk for saving. Try generating a new one.';
        show(saveStatus);
        return;
      }
      saveBtn.disabled = true;
      saveStatus.textContent = 'Saving…';
      show(saveStatus);

      try {
        console.log('[brief] posting to /api/save-talk:', lastParsed);
        const res = await fetch('/api/save-talk', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(lastParsed)
        });
        const data = await res.json();
        console.log('[brief] save response:', res.status, data);
        if (res.ok && data.ok) {
          saveStatus.innerHTML =
            'Added to the gallery. <a href="/talks/" class="brief-gallery-link">See all generated talks →</a>';
        } else {
          saveStatus.textContent = 'Could not save. Try again later.';
          saveBtn.disabled = false;
        }
      } catch (err) {
        console.log('[brief] save fetch error:', err);
        saveStatus.textContent = 'Could not save. Try again later.';
        saveBtn.disabled = false;
      }
    });
  }

  reset.addEventListener('click', function () {
    show(form);
    hide(result);
    textarea.value = '';
    charcount.textContent = '0 / 1000';
    output.innerHTML = '';
    lastParsed = null;
  });

  function startLoading() {
    submit.disabled = true;
    hide(form);
    show(loading);
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
    hide(loading);
    submit.disabled = false;
  }

  function setError(msg) {
    error.textContent = msg;
    if (msg) { show(error); show(form); } else { hide(error); }
  }

  function show(el) { if (el) { el.removeAttribute('hidden'); el.style.display = ''; } }
  function hide(el) { if (el) el.style.display = 'none'; }

  // Extract title, premise, opening from the generated text for saving.
  function parseForSave(text) {
    const sections = splitSections(text);
    return {
      title: extractTitle(sections['the talk'] || ''),
      premise: extractPremise(sections['the talk'] || ''),
      opening: (sections['the opening'] || '').trim().slice(0, 800)
    };
  }

  function splitSections(text) {
    const result = {};
    let current = null;
    const HEADERS = ['the talk', 'the opening', 'what the room leaves with', 'reach out'];
    for (const line of text.split('\n')) {
      const normalized = line
        .replace(/\*\*/g, '')
        .replace(/^#{1,4}\s*/, '')
        .replace(/[:\s]+$/, '')
        .trim()
        .toLowerCase();
      if (HEADERS.includes(normalized)) {
        current = normalized;
        result[current] = '';
      } else if (current) {
        result[current] += line + '\n';
      }
    }
    return result;
  }

  function extractTitle(talkSection) {
    const lines = talkSection.split('\n').map(l => l.replace(/\*\*/g, '').trim()).filter(Boolean);
    return (lines[0] || '').slice(0, 200);
  }

  function extractPremise(talkSection) {
    const lines = talkSection.split('\n').map(l => l.replace(/\*\*/g, '').trim()).filter(Boolean);
    return lines.slice(1).join(' ').slice(0, 800);
  }

  // Render plain-text markdown into basic HTML without a library.
  function renderBrief(text) {
    const lines = text.split('\n');
    const html = [];
    let inList = false;

    for (const line of lines) {
      if (/^\*\*[^*]+\*\*\s*$/.test(line)) {
        if (inList) { html.push('</ul>'); inList = false; }
        html.push('<h3>' + escHtml(line.replace(/\*\*/g, '').trim()) + '</h3>');
        continue;
      }
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
