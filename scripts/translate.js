// scripts/translate.js
//
// Translates jessehirsh.com content files into a target language.
// Generates mirrored content under src/{lang}/ and a directory data file
// src/{lang}/{lang}.json that overrides strings and currentFocus for those pages.
//
// Usage:
//   node scripts/translate.js --lang zh
//   node scripts/translate.js --lang zh --force   (re-translate even unchanged files)
//
// Supported language codes: zh, fr, de, es

const { loadEnv, createClient, getArg, hasFlag } = require('./lib/openrouter');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

loadEnv();

// ─── Language config ────────────────────────────────────────────────────────

const LANG_CONFIGS = {
  zh: { name: 'Simplified Chinese', langAttr: 'zh-CN', topicsTag: 'zhTopics' },
  fr: { name: 'French',             langAttr: 'fr',    topicsTag: 'frTopics' },
  de: { name: 'German',             langAttr: 'de',    topicsTag: 'deTopics' },
  es: { name: 'Spanish',            langAttr: 'es',    topicsTag: 'esTopics' },
};

// Files to skip (relative to src/)
const SKIP_FILES = new Set(['404.md']);

// Front matter fields whose values should be translated
const TRANSLATE_FM_FIELDS = ['title', 'description', 'dek', 'cardDek'];

// ─── Paths ───────────────────────────────────────────────────────────────────

const ROOT        = path.join(__dirname, '..');
const SRC         = path.join(ROOT, 'src');
const MANIFEST    = path.join(__dirname, '.translation-manifest.json');

// ─── Manifest (incremental tracking) ─────────────────────────────────────────

function loadManifest() {
  try { return JSON.parse(fs.readFileSync(MANIFEST, 'utf8')); } catch { return {}; }
}

function saveManifest(m) {
  fs.writeFileSync(MANIFEST, JSON.stringify(m, null, 2));
}

function hash(str) {
  return crypto.createHash('sha256').update(str).digest('hex').slice(0, 16);
}

// ─── File discovery ───────────────────────────────────────────────────────────

function findMdFiles(dir, base = dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      // Skip _includes, _data, assets, and any language output dirs
      if (['_includes', '_data', 'assets'].includes(entry.name)) continue;
      if (LANG_CONFIGS[entry.name]) continue;
      results.push(...findMdFiles(path.join(dir, entry.name), base));
    } else if (entry.name.endsWith('.md')) {
      const rel = path.relative(base, path.join(dir, entry.name)).replace(/\\/g, '/');
      if (!SKIP_FILES.has(rel)) results.push(rel);
    }
  }
  return results;
}

// ─── Front matter parsing ────────────────────────────────────────────────────

function parseFrontMatter(content) {
  const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) return { fm: null, body: content };
  return { fm: m[1], body: m[2] };
}

// ─── Translation helpers ──────────────────────────────────────────────────────

const PROPER_NOUNS = 'Jesse Hirsh, The Future Herd, Red-Tory, Metaviews, CBC, LinkedIn, AI, OpenRouter';

function sanitizeModelOutput(text) {
  if (typeof text !== 'string') return text;

  let cleaned = text.replace(/\uFEFF/g, '').trim();

  if (cleaned.includes('</think>')) {
    cleaned = cleaned.slice(cleaned.lastIndexOf('</think>') + '</think>'.length).trim();
  }

  cleaned = cleaned.replace(/<think\b[^>]*>[\s\S]*?<\/think>/gi, '').trim();
  cleaned = cleaned.replace(/^\s*<\/think>\s*$/gim, '').trim();

  return cleaned;
}

async function translateFrontMatter(fm, langName, client) {
  const fieldsNote = TRANSLATE_FM_FIELDS.join(', ');
  const prompt =
`You are translating content for a professional speaker's website from English to ${langName}.

Translate ONLY the values of these YAML keys (if present): ${fieldsNote}, and cta.label.
Leave every other key and value exactly unchanged.

Rules:
- Do NOT translate: layout, permalink, tags, order, heroImage, heroAlt, cta.href, ctaHref, bookingSubject, lang
- Keep proper nouns in English: ${PROPER_NOUNS}
- Never include reasoning, analysis, or any <think> tags
- Output the complete YAML block with only those values translated — no fences, no explanations

YAML:
${fm}`;
  return sanitizeModelOutput(await client.ask(prompt));
}

async function translateBody(body, langName, topicsTag, client) {
  const prompt =
`You are translating content for a professional speaker's website from English to ${langName}.

Translate the markdown below. Rules:
- Preserve ALL Nunjucks syntax exactly: {% ... %}, {{ ... }}, {%- ... -%}
- Preserve ALL HTML tags and attributes exactly
- Preserve ALL URLs, email addresses, and file paths unchanged
- Preserve ALL markdown structure (##, **, -, [ ], etc.) — translate only the text
- Keep proper nouns in English: ${PROPER_NOUNS}
- Professional, direct, outcome-focused tone
- Never include reasoning, analysis, or any <think> tags
- Output ONLY the translated markdown — no fences, no explanations

Markdown:
${body}`;

  let translated = sanitizeModelOutput(await client.ask(prompt));
  // Repoint Eleventy collection reference to the language-specific tag
  translated = translated.replace(/collections\.topics\b/g, `collections.${topicsTag}`);
  return translated;
}

async function translateJSON(obj, langName, client, extraInstructions = '') {
  const prompt =
`Translate the following JSON values from English to ${langName}.
Keep all JSON keys exactly unchanged.${extraInstructions ? '\n' + extraInstructions : ''}
Keep proper nouns in English: ${PROPER_NOUNS}
Never include reasoning, analysis, or any <think> tags.
Output only valid JSON — no fences, no explanations.

${JSON.stringify(obj, null, 2)}`;

  const raw = sanitizeModelOutput(await client.ask(prompt));
  try {
    return JSON.parse(raw.trim());
  } catch {
    const m = raw.match(/[\[{][\s\S]*[\]}]/);
    if (m) return JSON.parse(m[0]);
    throw new Error('Could not parse JSON from model response:\n' + raw.slice(0, 300));
  }
}

// ─── Permalink rewriting ──────────────────────────────────────────────────────

function rewritePermalink(fm, lang) {
  return fm.replace(/^(permalink:\s*)(\/.*)$/m, (_, key, val) => {
    if (val.startsWith(`/${lang}/`)) return `${key}${val}`;
    const newVal = val === '/' ? `/${lang}/` : `/${lang}${val}`;
    return `${key}${newVal}`;
  });
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const args    = process.argv.slice(2);
  const lang    = getArg(args, 'lang');
  const force   = hasFlag(args, 'force');

  if (!lang || !LANG_CONFIGS[lang]) {
    console.error(`Usage: node scripts/translate.js --lang <${Object.keys(LANG_CONFIGS).join('|')}> [--force]`);
    process.exit(1);
  }

  const cfg      = LANG_CONFIGS[lang];
  const client   = createClient({ title: 'jessehirsh.com translator' });
  const manifest = loadManifest();
  if (!manifest[lang]) manifest[lang] = {};

  console.log(`Translating to ${cfg.name} (${lang})`);
  console.log(`Model: ${client.primaryModel}\n`);

  // 1. Content files
  const mdFiles = findMdFiles(SRC);
  console.log(`Found ${mdFiles.length} content files.\n`);

  for (const rel of mdFiles) {
    const srcFile = path.join(SRC, rel);
    const content = fs.readFileSync(srcFile, 'utf8');
    const h       = hash(content);

    if (!force && manifest[lang][rel]?.hash === h) {
      console.log(`  skip    ${rel}`);
      continue;
    }

    process.stdout.write(`  translate ${rel} ...`);

    const { fm, body } = parseFrontMatter(content);

    let translatedFm   = fm;
    let translatedBody = body;

    if (fm !== null) {
      translatedFm = await translateFrontMatter(fm, cfg.name, client);

      // Rewrite permalink to /lang/...
      translatedFm = rewritePermalink(translatedFm, lang);

      // Replace topics tag with language-specific tag
      translatedFm = translatedFm.replace(/^(tags:\s*)topics\s*$/m, `$1${cfg.topicsTag}`);

      // Inject lang attribute if not already present
      if (!/^lang:/m.test(translatedFm)) {
        translatedFm = `lang: ${cfg.langAttr}\n${translatedFm}`;
      }
    }

    translatedBody = await translateBody(body, cfg.name, cfg.topicsTag, client);

    // Write output
    const outPath = path.join(SRC, lang, rel);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });

    const output = fm !== null
      ? `---\n${translatedFm}\n---\n${translatedBody}`
      : translatedBody;

    fs.writeFileSync(outPath, output);

    manifest[lang][rel] = { hash: h, translatedAt: new Date().toISOString() };
    saveManifest(manifest);

    console.log(' done');
  }

  // 2. Directory data file: strings + currentFocus
  console.log('\nTranslating UI strings and current focus...');

  const stringsRaw      = fs.readFileSync(path.join(SRC, '_data', 'strings.json'), 'utf8');
  const currentFocusRaw = fs.readFileSync(path.join(SRC, '_data', 'currentFocus.json'), 'utf8');
  const dataHash        = hash(stringsRaw + currentFocusRaw);
  const dataKey         = '_data/strings+currentFocus';

  if (!force && manifest[lang][dataKey]?.hash === dataHash) {
    console.log('  skip    strings + currentFocus (unchanged)');
  } else {
    process.stdout.write('  translate strings.json ...');
    const translatedStrings = await translateJSON(
      JSON.parse(stringsRaw),
      cfg.name,
      client
    );
    console.log(' done');

    process.stdout.write('  translate currentFocus.json ...');
    const sourceItems = JSON.parse(currentFocusRaw);
    const translatedFocus = await translateJSON(
      sourceItems,
      cfg.name,
      client,
      'Translate "title" and "hook" fields only. Leave "bookingSubject" exactly unchanged.'
    );
    console.log(' done');

    // Write src/{lang}/{lang}.json — Eleventy directory data file
    const dirDataPath = path.join(SRC, lang, `${lang}.json`);
    fs.mkdirSync(path.dirname(dirDataPath), { recursive: true });
    fs.writeFileSync(dirDataPath, JSON.stringify({
      lang: cfg.langAttr,
      strings: translatedStrings,
      currentFocus: translatedFocus,
    }, null, 2));

    manifest[lang][dataKey] = { hash: dataHash, translatedAt: new Date().toISOString() };
    saveManifest(manifest);

    console.log(`  wrote   src/${lang}/${lang}.json`);
  }

  console.log(`\nDone. Run \`npm run build\` to verify.`);
  console.log(`Translated pages will be served at /${lang}/*`);
}

main().catch(err => {
  console.error('\nFatal:', err.message);
  process.exit(1);
});
