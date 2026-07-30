/**
 * Ported verbatim from Trooper `src/components/CodeHighlight.jsx` so code
 * artifacts in the marketing demo are tokenised by the same highlighter the
 * product uses. Zero dependencies; kept as .jsx to stay a byte-for-byte-ish
 * copy that is easy to re-sync when the app's version changes.
 */
'use client';

/**
 * CodeHighlight — zero-dependency syntax highlighter
 * Supports: jsx/tsx, js/ts, python, html, css, json, bash/sh, sql, markdown, plain text
 */

import { useMemo } from 'react';

/* ─── Token types → CSS classes ─── */
const T = {
  keyword:    'ch-kw',    // purple
  type:       'ch-ty',    // blue
  string:     'ch-str',   // green
  comment:    'ch-cmt',   // gray italic
  number:     'ch-num',   // orange
  operator:   'ch-op',    // gray
  tag:        'ch-tag',   // red/pink
  attr:       'ch-attr',  // cyan
  builtin:    'ch-bi',    // teal
  decorator:  'ch-dec',   // yellow
  plain:      '',
};

/* ─── Language definitions ─── */
const LANGS = {
  js:       { label: 'JavaScript', aliases: ['js', 'javascript', 'jsx', 'tsx', 'ts', 'typescript'] },
  python:   { label: 'Python',     aliases: ['python', 'py'] },
  html:     { label: 'HTML',       aliases: ['html', 'xml', 'svg'] },
  css:      { label: 'CSS',        aliases: ['css', 'scss', 'less'] },
  json:     { label: 'JSON',       aliases: ['json'] },
  bash:     { label: 'Bash',       aliases: ['bash', 'sh', 'shell', 'zsh'] },
  sql:      { label: 'SQL',        aliases: ['sql'] },
  /** Prose / markdown must not use JS tokenizer (avoids highlighting words like "with", "in"). */
  markdown: { label: 'Markdown',   aliases: ['markdown', 'md'] },
  plain:    { label: 'Plain text', aliases: ['text', 'plaintext'] },
};

export function detectLang(code = '', hint = '') {
  const h = hint.toLowerCase().trim();
  for (const [lang, def] of Object.entries(LANGS)) {
    if (def.aliases.includes(h)) return lang;
  }
  // Auto-detect from code patterns
  if (/<\w[\w.:-]*(\s+[\w:.-]+(="[^"]*")?)*\s*\/?>/.test(code) && /<\/\w+>/.test(code)) return 'html';
  if (/^\s*\{[\s\S]*\}\s*$/.test(code.trim()) || /^[\[\{]/.test(code.trim())) {
    try { JSON.parse(code); return 'json'; } catch {}
  }
  if (/^(def |class |import |from .* import|if __name__|@\w+\n)/.test(code)) return 'python';
  if (/^(SELECT|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER)\b/i.test(code.trim())) return 'sql';
  if (/^(#!\/bin\/(ba)?sh|sudo |apt |brew |npm |pip |git )/.test(code)) return 'bash';
  if (/[{};]\s*$/.test(code) && /:\s*[\w"'#]/.test(code) && !code.includes('=>')) return 'css';
  if (/import\s+|export\s+|const\s+|let\s+|function\s+|=>\s*\{|React/.test(code)) return 'js';
  return 'js'; // default
}

/* ─── Tokenizers ─── */

function tokenizePlain(code) {
  if (!code) return [];
  return [{ t: T.plain, s: code }];
}

function tokenizeJS(code) {
  const KW = /^(abstract|as|async|await|break|case|catch|class|const|continue|debugger|declare|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|keyof|let|module|namespace|new|null|of|override|package|private|protected|public|readonly|return|set|static|super|switch|this|throw|try|type|typeof|undefined|var|void|while|with|yield)\b/;
  const TYPE = /^(Array|Boolean|Date|Error|Function|Map|Number|Object|Promise|Proxy|RegExp|Set|String|Symbol|WeakMap|WeakSet|any|boolean|never|number|object|string|unknown|void|React|Component|FC|ReactNode|useState|useEffect|useRef|useMemo|useCallback|useContext|Props)\b/;
  const BUILTIN = /^(console|document|window|process|Math|JSON|Object|Array|String|Number|Boolean|Date|Error|fetch|setTimeout|setInterval|clearTimeout|clearInterval|require|module|exports|Promise|Reflect|Proxy)\b/;

  const tokens = [];
  let i = 0;
  while (i < code.length) {
    // Line comment
    if (code[i] === '/' && code[i+1] === '/') {
      const end = code.indexOf('\n', i);
      const s = end === -1 ? code.slice(i) : code.slice(i, end);
      tokens.push({ t: T.comment, s }); i += s.length; continue;
    }
    // Block comment
    if (code[i] === '/' && code[i+1] === '*') {
      const end = code.indexOf('*/', i + 2);
      const s = end === -1 ? code.slice(i) : code.slice(i, end + 2);
      tokens.push({ t: T.comment, s }); i += s.length; continue;
    }
    // Template literal
    if (code[i] === '`') {
      let j = i + 1, s = '`';
      while (j < code.length) {
        if (code[j] === '\\') { s += code[j] + code[j+1]; j += 2; continue; }
        if (code[j] === '`') { s += '`'; j++; break; }
        s += code[j++];
      }
      tokens.push({ t: T.string, s }); i = j; continue;
    }
    // String
    if (code[i] === '"' || code[i] === "'") {
      const q = code[i]; let j = i + 1, s = q;
      while (j < code.length) {
        if (code[j] === '\\') { s += code[j] + code[j+1]; j += 2; continue; }
        if (code[j] === q) { s += q; j++; break; }
        if (code[j] === '\n') break;
        s += code[j++];
      }
      tokens.push({ t: T.string, s }); i = j; continue;
    }
    // Number
    if (/[0-9]/.test(code[i]) || (code[i] === '.' && /[0-9]/.test(code[i+1]))) {
      let j = i, s = '';
      while (j < code.length && /[\d.xXoObBa-fA-FnN_]/.test(code[j])) s += code[j++];
      tokens.push({ t: T.number, s }); i = j; continue;
    }
    // Decorator
    if (code[i] === '@' && /[a-zA-Z_]/.test(code[i+1])) {
      let j = i + 1, s = '@';
      while (j < code.length && /[\w.]/.test(code[j])) s += code[j++];
      tokens.push({ t: T.decorator, s }); i = j; continue;
    }
    // Identifier / keyword / type / builtin
    if (/[a-zA-Z_$]/.test(code[i])) {
      let j = i, s = '';
      while (j < code.length && /[\w$]/.test(code[j])) s += code[j++];
      if (KW.test(s)) tokens.push({ t: T.keyword, s });
      else if (TYPE.test(s)) tokens.push({ t: T.type, s });
      else if (BUILTIN.test(s)) tokens.push({ t: T.builtin, s });
      else tokens.push({ t: T.plain, s });
      i = j; continue;
    }
    // JSX tag start <Component or <div
    if (code[i] === '<' && /[a-zA-Z\/!]/.test(code[i+1])) {
      tokens.push({ t: T.tag, s: '<' }); i++; continue;
    }
    // Operator
    if (/[=+\-*/%&|^~!<>?:,;.[\](){}]/.test(code[i])) {
      tokens.push({ t: T.operator, s: code[i] }); i++; continue;
    }
    // Whitespace / plain
    tokens.push({ t: T.plain, s: code[i] }); i++;
  }
  return tokens;
}

function tokenizePython(code) {
  const KW = /^(False|None|True|and|as|assert|async|await|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield)\b/;
  const BUILTIN = /^(abs|all|any|bin|bool|bytes|callable|chr|compile|complex|delattr|dict|dir|divmod|enumerate|eval|exec|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|isinstance|issubclass|iter|len|list|locals|map|max|memoryview|min|next|object|oct|open|ord|pow|print|property|range|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|vars|zip|__name__|__file__|__doc__|self|cls)\b/;
  const tokens = [];
  let i = 0;
  while (i < code.length) {
    if (code[i] === '#') {
      const end = code.indexOf('\n', i);
      const s = end === -1 ? code.slice(i) : code.slice(i, end);
      tokens.push({ t: T.comment, s }); i += s.length; continue;
    }
    // Triple-quoted string
    if ((code[i] === '"' || code[i] === "'") && code.slice(i, i+3) === code[i].repeat(3)) {
      const q = code[i].repeat(3); const end = code.indexOf(q, i + 3);
      const s = end === -1 ? code.slice(i) : code.slice(i, end + 3);
      tokens.push({ t: T.string, s }); i += s.length; continue;
    }
    if (code[i] === '"' || code[i] === "'") {
      const q = code[i]; let j = i + 1, s = q;
      while (j < code.length && code[j] !== q && code[j] !== '\n') {
        if (code[j] === '\\') { s += code[j] + code[j+1]; j += 2; } else s += code[j++];
      }
      s += code[j] === q ? q : ''; j++;
      tokens.push({ t: T.string, s }); i = j; continue;
    }
    if (/[0-9]/.test(code[i])) {
      let j = i, s = '';
      while (j < code.length && /[\d.e+\-jJ_]/.test(code[j])) s += code[j++];
      tokens.push({ t: T.number, s }); i = j; continue;
    }
    if (code[i] === '@') {
      let j = i + 1, s = '@';
      while (j < code.length && /[\w.]/.test(code[j])) s += code[j++];
      tokens.push({ t: T.decorator, s }); i = j; continue;
    }
    if (/[a-zA-Z_]/.test(code[i])) {
      let j = i, s = '';
      while (j < code.length && /\w/.test(code[j])) s += code[j++];
      if (KW.test(s)) tokens.push({ t: T.keyword, s });
      else if (BUILTIN.test(s)) tokens.push({ t: T.builtin, s });
      else tokens.push({ t: T.plain, s });
      i = j; continue;
    }
    tokens.push({ t: T.plain, s: code[i] }); i++;
  }
  return tokens;
}

function tokenizeHTML(code) {
  const tokens = [];
  let i = 0;
  while (i < code.length) {
    if (code.slice(i, i + 4) === '<!--') {
      const end = code.indexOf('-->', i + 4);
      const s = end === -1 ? code.slice(i) : code.slice(i, end + 3);
      tokens.push({ t: T.comment, s }); i += s.length; continue;
    }
    if (code[i] === '<') {
      // Tag
      let j = i + 1, s = '<';
      while (j < code.length && code[j] !== '>') {
        if (code[j] === '"' || code[j] === "'") {
          const q = code[j]; let qs = q; j++;
          while (j < code.length && code[j] !== q) qs += code[j++];
          qs += q; j++;
          tokens.push({ t: T.string, s: qs });
          s = ''; // reset accumulator after emitting string
        } else if (/[\w-]/.test(code[j]) && (s.endsWith(' ') || s.endsWith('\t') || s.endsWith('\n'))) {
          // attribute name
          let as = '';
          while (j < code.length && /[\w-]/.test(code[j])) as += code[j++];
          if (s) tokens.push({ t: T.tag, s }); s = '';
          tokens.push({ t: T.attr, s: as });
        } else { s += code[j++]; }
      }
      s += '>'; j++;
      if (s) tokens.push({ t: T.tag, s });
      i = j; continue;
    }
    // Text content
    let j = i, s = '';
    while (j < code.length && code[j] !== '<') s += code[j++];
    tokens.push({ t: T.plain, s }); i = j;
  }
  return tokens;
}

function tokenizeCSS(code) {
  const tokens = [];
  let i = 0;
  while (i < code.length) {
    if (code[i] === '/' && code[i+1] === '*') {
      const end = code.indexOf('*/', i + 2);
      const s = end === -1 ? code.slice(i) : code.slice(i, end + 2);
      tokens.push({ t: T.comment, s }); i += s.length; continue;
    }
    if (code[i] === '"' || code[i] === "'") {
      const q = code[i]; let j = i + 1, s = q;
      while (j < code.length && code[j] !== q) s += code[j++];
      s += q; j++;
      tokens.push({ t: T.string, s }); i = j; continue;
    }
    if (/[0-9]/.test(code[i]) || (code[i] === '.' && /[0-9]/.test(code[i+1]))) {
      let j = i, s = '';
      while (j < code.length && /[\d.%a-zA-Z]/.test(code[j])) s += code[j++];
      tokens.push({ t: T.number, s }); i = j; continue;
    }
    if (code[i] === '#' && /[0-9a-fA-F]/.test(code[i+1])) {
      let j = i + 1, s = '#';
      while (j < code.length && /[\w]/.test(code[j])) s += code[j++];
      tokens.push({ t: T.number, s }); i = j; continue;
    }
    if (code[i] === ':' || code[i] === '.' || code[i] === '#') {
      tokens.push({ t: T.keyword, s: code[i] }); i++; continue;
    }
    tokens.push({ t: T.plain, s: code[i] }); i++;
  }
  return tokens;
}

function tokenizeJSON(code) {
  const tokens = [];
  let i = 0;
  while (i < code.length) {
    if (code[i] === '"') {
      let j = i + 1, s = '"';
      while (j < code.length) {
        if (code[j] === '\\') { s += code[j] + code[j+1]; j += 2; continue; }
        if (code[j] === '"') { s += '"'; j++; break; }
        s += code[j++];
      }
      // If followed by :, it's a key
      let k = j; while (k < code.length && (code[k] === ' ' || code[k] === '\t')) k++;
      tokens.push({ t: code[k] === ':' ? T.attr : T.string, s }); i = j; continue;
    }
    if (/[0-9\-]/.test(code[i])) {
      let j = i, s = '';
      while (j < code.length && /[\d.eE+\-]/.test(code[j])) s += code[j++];
      tokens.push({ t: T.number, s }); i = j; continue;
    }
    if (/[truefalsn]/.test(code[i])) {
      const kw = ['true','false','null'].find(k => code.startsWith(k, i));
      if (kw) { tokens.push({ t: T.keyword, s: kw }); i += kw.length; continue; }
    }
    tokens.push({ t: T.plain, s: code[i] }); i++;
  }
  return tokens;
}

function tokenizeBash(code) {
  const KW = /^(alias|bg|bind|break|builtin|case|cd|command|compgen|complete|continue|declare|dirs|disown|echo|enable|eval|exec|exit|export|fc|fg|getopts|hash|help|history|if|then|else|elif|fi|for|in|do|done|while|until|function|jobs|kill|let|local|logout|popd|printf|pushd|pwd|read|readonly|return|select|set|shift|shopt|source|suspend|test|times|trap|type|typeset|ulimit|umask|unalias|unset|until|wait|while)\b/;
  const tokens = [];
  let i = 0;
  while (i < code.length) {
    if (code[i] === '#') {
      const end = code.indexOf('\n', i);
      const s = end === -1 ? code.slice(i) : code.slice(i, end);
      tokens.push({ t: T.comment, s }); i += s.length; continue;
    }
    if (code[i] === '"' || code[i] === "'") {
      const q = code[i]; let j = i + 1, s = q;
      while (j < code.length && code[j] !== q) { if (code[j] === '\\') { s += code[j]+code[j+1]; j += 2; } else s += code[j++]; }
      s += q; j++;
      tokens.push({ t: T.string, s }); i = j; continue;
    }
    if (/\$/.test(code[i])) {
      let j = i + 1, s = '$';
      if (code[j] === '{') { while (j < code.length && code[j] !== '}') s += code[j++]; s += '}'; j++; }
      else while (j < code.length && /\w/.test(code[j])) s += code[j++];
      tokens.push({ t: T.builtin, s }); i = j; continue;
    }
    if (/[a-zA-Z_]/.test(code[i])) {
      let j = i, s = '';
      while (j < code.length && /[\w-]/.test(code[j])) s += code[j++];
      tokens.push({ t: KW.test(s) ? T.keyword : T.plain, s }); i = j; continue;
    }
    tokens.push({ t: T.plain, s: code[i] }); i++;
  }
  return tokens;
}

function tokenizeSQL(code) {
  const KW = /^(SELECT|FROM|WHERE|JOIN|LEFT|RIGHT|INNER|OUTER|ON|AS|AND|OR|NOT|IN|IS|NULL|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|DROP|ALTER|ADD|COLUMN|PRIMARY|KEY|INDEX|UNIQUE|CONSTRAINT|FOREIGN|REFERENCES|GROUP BY|ORDER BY|HAVING|LIMIT|OFFSET|DISTINCT|COUNT|SUM|AVG|MIN|MAX|CASE|WHEN|THEN|ELSE|END|WITH|BEGIN|COMMIT|ROLLBACK)\b/i;
  const tokens = [];
  let i = 0;
  while (i < code.length) {
    if (code[i] === '-' && code[i+1] === '-') {
      const end = code.indexOf('\n', i);
      const s = end === -1 ? code.slice(i) : code.slice(i, end);
      tokens.push({ t: T.comment, s }); i += s.length; continue;
    }
    if (code[i] === "'" || code[i] === '"') {
      const q = code[i]; let j = i + 1, s = q;
      while (j < code.length && code[j] !== q) s += code[j++];
      s += q; j++;
      tokens.push({ t: T.string, s }); i = j; continue;
    }
    if (/[0-9]/.test(code[i])) {
      let j = i, s = '';
      while (j < code.length && /[\d.]/.test(code[j])) s += code[j++];
      tokens.push({ t: T.number, s }); i = j; continue;
    }
    if (/[a-zA-Z_]/.test(code[i])) {
      let j = i, s = '';
      while (j < code.length && /[\w]/.test(code[j])) s += code[j++];
      tokens.push({ t: KW.test(s) ? T.keyword : T.plain, s }); i = j; continue;
    }
    tokens.push({ t: T.plain, s: code[i] }); i++;
  }
  return tokens;
}

export function tokenize(code, lang) {
  switch (lang) {
    case 'markdown':
    case 'plain':
      return tokenizePlain(code);
    case 'python': return tokenizePython(code);
    case 'html':   return tokenizeHTML(code);
    case 'css':    return tokenizeCSS(code);
    case 'json':   return tokenizeJSON(code);
    case 'bash':   return tokenizeBash(code);
    case 'sql':    return tokenizeSQL(code);
    default:       return tokenizeJS(code);
  }
}

/* ─── React component ─── */

// Above this size, tokenizing emits hundreds of thousands of <span>s in one
// synchronous pass — enough to trigger Chrome's "Page Unresponsive" dialog on
// a 2.8 MB JSON. Render big files as one plain text node instead.
export const HIGHLIGHT_MAX_CHARS = 150_000;

export default function CodeHighlight({ code = '', lang = '', className = '' }) {
  const highlightable = code.length <= HIGHLIGHT_MAX_CHARS;
  const { detectedLang, tokens } = useMemo(() => {
    if (!highlightable) return { detectedLang: String(lang || 'text'), tokens: null };
    const detected = detectLang(code, lang);
    return { detectedLang: detected, tokens: tokenize(code, detected) };
  }, [code, lang, highlightable]);
  const langDef = LANGS[detectedLang] || Object.values(LANGS).find((l) => l.aliases.includes(detectedLang));

  return (
    <div
      className={`relative flex min-h-0 w-full flex-col overflow-hidden bg-[#0d1117] ${className}`}
    >
      {/* Language badge */}
      <span className="pointer-events-none absolute right-3 top-2.5 z-10 select-none rounded-md bg-white/10 px-2 py-0.5 font-mono text-[10px] text-[#8b949e]">
        {langDef?.label || detectedLang}
      </span>

      {!highlightable && (
        <div className="absolute left-3 top-2 z-10 select-none rounded-md bg-white/10 px-2 py-0.5 font-mono text-[10px] text-[#8b949e]">
          Large file — syntax highlighting off for performance
        </div>
      )}

      <pre className="min-h-0 flex-1 overflow-auto px-5 pb-5 pt-9 text-[12.5px] font-mono leading-[1.9] text-[#e6edf3]">
        <code>
          {tokens
            ? tokens.map((tok, i) => (
              tok.t
                ? <span key={i} className={tok.t}>{tok.s}</span>
                : <span key={i}>{tok.s}</span>
            ))
            : code}
        </code>
      </pre>

      <style>{`
        .ch-kw  { color: #ff7b72; }
        .ch-ty  { color: #79c0ff; }
        .ch-str { color: #a5d6ff; }
        .ch-cmt { color: #8b949e; font-style: italic; }
        .ch-num { color: #f2cc60; }
        .ch-op  { color: #8b949e; }
        .ch-tag { color: #7ee787; }
        .ch-attr{ color: #79c0ff; }
        .ch-bi  { color: #ffa657; }
        .ch-dec { color: #d2a8ff; }
      `}</style>
    </div>
  );
}
