(function () {
  const loading = document.getElementById('talks-loading');
  const empty = document.getElementById('talks-empty');
  const list = document.getElementById('talks-list');

  if (!list) return;

  fetch('/api/talks')
    .then(function (res) { return res.json(); })
    .then(function (data) {
      loading.hidden = true;
      const talks = data.talks || [];
      if (talks.length === 0) {
        empty.hidden = false;
        return;
      }
      list.innerHTML = talks.map(function (t) {
        const date = t.createdAt
          ? new Date(t.createdAt).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })
          : '';
        return '<article class="talk-card">' +
          (date ? '<span class="talk-date">' + escHtml(date) + '</span>' : '') +
          '<h3>' + escHtml(t.title) + '</h3>' +
          '<p>' + escHtml(t.premise) + '</p>' +
          '<blockquote class="talk-opening">' + escHtml(t.opening) + '</blockquote>' +
          '</article>';
      }).join('\n');
      list.hidden = false;
    })
    .catch(function () {
      loading.textContent = 'Could not load the gallery.';
    });

  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
})();
