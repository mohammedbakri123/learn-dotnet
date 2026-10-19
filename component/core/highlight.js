/* ============================================================
   Raff Backend Academy — shared syntax highlighter
   Languages: C#, SQL, JSON, HTTP (one token-* class system).
   Exposes window.RaffHighlight.
   ============================================================ */

(function () {
  'use strict';

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  var CS_RE = /(\/\/[^\n]*)|("(?:[^"\\\n]|\\.)*")|(\b\d+(?:\.\d+)?\b)|\b(await|async|var|new|public|private|protected|internal|static|sealed|abstract|virtual|override|class|record|void|string|int|bool|decimal|double|float|long|null|true|false|return|if|else|foreach|for|while|using|namespace|this|base|is|as|in|out|ref|default|where|select|from|orderby|group|into|when|throw|try|catch|finally|lock|params|get|set|value)\b|([A-Z][A-Za-z0-9_]*)(?=\s*\()|([A-Z][A-Za-z0-9_]*)/g;
  var SQL_RE = /(--[^\n]*)|('(?:[^'\\\n]|\\.)*')|(\b\d+(?:\.\d+)?\b)|\b(SELECT|FROM|WHERE|JOIN|LEFT|RIGHT|INNER|OUTER|ON|AS|AND|OR|NOT|SET|UPDATE|INSERT|INTO|VALUES|DELETE|CREATE|TABLE|PRIMARY|KEY|FOREIGN|REFERENCES|UNIQUE|INDEX|COUNT|GROUP|BY|ORDER|DESC|ASC|LIMIT|OFFSET|NULL|IS|EXISTS)\b/gi;

  function highlightRe(raw, re) {
    var out = '', last = 0, m;
    re.lastIndex = 0;
    while ((m = re.exec(raw)) !== null) {
      out += esc(raw.slice(last, m.index));
      var cls = '';
      if (m[1]) cls = 'token-comment';
      else if (m[2]) cls = 'token-str';
      else if (m[3]) cls = 'token-num';
      else if (m[4]) cls = 'token-kw';
      else if (m[5]) cls = 'token-fn';
      else if (m[6]) cls = 'token-type';
      out += '<span class="' + cls + '">' + esc(m[0]) + '</span>';
      last = m.index + m[0].length;
    }
    out += esc(raw.slice(last));
    return out;
  }

  function highlightJson(raw) {
    var text = esc(raw);
    return text.replace(
      /(&quot;.*?&quot;|".*?")(\s*:)|(&quot;.*?&quot;|".*?")|(\b-?\d+(?:\.\d+)?\b)|(\b(?:true|false|null)\b)/g,
      function (match, key, colon, strVal, num, boolVal) {
        if (key) return '<span class="token-type">' + key + '</span>' + colon;
        if (strVal) return '<span class="token-str">' + strVal + '</span>';
        if (num) return '<span class="token-num">' + num + '</span>';
        if (boolVal) return '<span class="token-kw">' + boolVal + '</span>';
        return match;
      }
    );
  }

  function highlightHttp(raw) {
    var text = esc(raw);
    return text.replace(
      /^(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)\b|(HTTP\/1\.[01]\s+\d{3}\s+[A-Za-z ]+)|^([A-Za-z0-9-]+):/gm,
      function (match, verb, status, header) {
        if (verb) return '<span class="token-http-verb">' + verb + '</span>';
        if (status) return '<span class="token-http-status">' + status + '</span>';
        if (header) return '<span class="token-http-header">' + header + ':</span>';
        return match;
      }
    );
  }

  function normalizeLang(lang) {
    var l = String(lang || '').toLowerCase();
    if (l === 'c#' || l === 'csharp' || l === 'cs') return 'cs';
    if (l === 'sql') return 'sql';
    if (l === 'json') return 'json';
    if (l === 'http') return 'http';
    if (l === 'text' || l === 'plaintext') return 'text';
    return l || 'cs';
  }

  function text(raw, lang) {
    var l = normalizeLang(lang);
    if (l === 'json') return highlightJson(raw);
    if (l === 'http') return highlightHttp(raw);
    if (l === 'text') return esc(raw);
    if (l === 'sql') return highlightRe(raw, SQL_RE);
    return highlightRe(raw, CS_RE);
  }

  function apply(root) {
    var host = root || document;
    host.querySelectorAll('pre code').forEach(function (block) {
      if (block.getAttribute('data-highlighted')) return;
      var match = (block.className || '').match(/language-([A-Za-z#]+)/);
      var lang = match ? match[1] : (block.getAttribute('data-lang') || 'cs');
      block.innerHTML = text(block.textContent, lang);
      block.setAttribute('data-highlighted', 'true');
    });
  }

  window.RaffHighlight = { text: text, apply: apply, escapeHtml: esc };
})();
