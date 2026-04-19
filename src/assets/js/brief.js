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
  const copyEl = document.getElementById('brief-copy');

  if (!form) return;

  const copy = Object.assign({
    parseError: 'Could not parse the talk for saving. Try generating a new one.',
    saving: 'Saving…',
    saved: 'Added to the gallery.',
    savedLink: 'See all generated talks →',
    saveFailed: 'Could not save. Try again later.',
    requestFailed: 'Something went wrong. Please try again.',
    networkError: 'Could not reach the server. Please check your connection and try again.',
    loading: ['The goats are reading your brief…']
  }, readCopy(copyEl));

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
        setError(data.error || copy.requestFailed);
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
      setError(copy.networkError);
    }
  });

  if (saveBtn) {
    saveBtn.addEventListener('click', async function () {
      if (!lastParsed) return;
      if (!lastParsed.title) {
        saveStatus.textContent = copy.parseError;
        show(saveStatus);
        return;
      }
      saveBtn.disabled = true;
      saveStatus.textContent = copy.saving;
      show(saveStatus);

      try {
        const res = await fetch('/api/save-talk', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(lastParsed)
        });
        const data = await res.json();
        if (res.ok && data.ok) {
          saveStatus.innerHTML =
            escHtml(copy.saved) + ' <a href="' + galleryHref() + '" class="brief-gallery-link">' + escHtml(copy.savedLink) + '</a>';
        } else {
          saveStatus.textContent = copy.saveFailed;
          saveBtn.disabled = false;
        }
      } catch {
        saveStatus.textContent = copy.saveFailed;
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
    loadingMsg.textContent = copy.loading[0];
    loadingInterval = setInterval(function () {
      loadingIndex = (loadingIndex + 1) % copy.loading.length;
      loadingMsg.textContent = copy.loading[loadingIndex];
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

  function readCopy(el) {
    if (!el) return {};
    try {
      const parsed = JSON.parse(el.textContent || '{}');
      if (!Array.isArray(parsed.loading) || !parsed.loading.length) delete parsed.loading;
      return parsed;
    } catch {
      return {};
    }
  }

  function galleryHref() {
    const galleryLink = document.querySelector('.brief-actions a');
    return galleryLink ? galleryLink.getAttribute('href') : '/talks/';
  }

  // Extract title, premise, opening from the generated text for saving.
  function parseForSave(text) {
    const sections = splitSections(text);
    const talkSection = sections['the talk'] || '';
    return {
      title: extractTitle(talkSection),
      premise: extractPremise(talkSection),
      opening: (sections['the opening'] || '').trim().slice(0, 800)
    };
  }

  function splitSections(text) {
    const result = {};
    let current = null;
    const HEADERS = ['the talk', 'the opening', 'what the room leaves with', 'reach out'];
    for (const line of text.split('\n')) {
      const section = readSectionHeader(line, HEADERS);
      if (section) {
        current = section.name;
        result[current] = '';
        if (section.inline) result[current] += section.inline + '\n';
      } else if (current) {
        result[current] += line + '\n';
      }
    }
    return result;
  }

  function readSectionHeader(line, headers) {
    let cleaned = line
      .trim()
      .replace(/^#{1,6}\s*/, '')
      .replace(/^[-*]\s+/, '')
      .replace(/^\d+[.)]\s+/, '')
      .replace(/\*\*/g, '')
      .replace(/__/g, '')
      .replace(/`/g, '')
      .trim();

    for (const header of headers) {
      const escaped = header.replace(/\s+/g, '\\s+');
      const match = cleaned.match(new RegExp('^' + escaped + '\\s*(?:[:\\-–—]\\s*(.*))?$', 'i'));
      if (match) {
        return {
          name: header,
          inline: cleanMarkdown(match[1] || '')
        };
      }
    }
    return null;
  }

  function extractTitle(talkSection) {
    const lines = cleanLines(talkSection);
    if (!lines.length) return '';
    const titleMatch = lines[0].match(/^(?:title|talk title)\s*[:\-–—]\s*(.+)$/i);
    return cleanTitle(titleMatch ? titleMatch[1] : lines[0]).slice(0, 200);
  }

  function extractPremise(talkSection) {
    const lines = cleanLines(talkSection);
    if (!lines.length) return '';
    const titleMatch = lines[0].match(/^(?:title|talk title)\s*[:\-–—]\s*(.+)$/i);
    const premiseLines = titleMatch ? lines.slice(1) : lines.slice(1);
    const premise = premiseLines
      .join(' ')
      .replace(/^(?:premise|description)\s*[:\-–—]\s*/i, '')
      .trim();
    return premise.slice(0, 800);
  }

  function cleanLines(text) {
    return text
      .split('\n')
      .map(cleanMarkdown)
      .filter(Boolean);
  }

  function cleanMarkdown(line) {
    return String(line || '')
      .replace(/^#{1,6}\s*/, '')
      .replace(/^[-*]\s+/, '')
      .replace(/^\d+[.)]\s+/, '')
      .replace(/\*\*/g, '')
      .replace(/__/g, '')
      .replace(/`/g, '')
      .trim();
  }

  function cleanTitle(title) {
    return cleanMarkdown(title)
      .replace(/^["“”'‘’]+|["“”'‘’]+$/g, '')
      .trim();
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
