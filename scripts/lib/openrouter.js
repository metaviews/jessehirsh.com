// OpenRouter API helper
//
// Generic, project-agnostic wrapper for OpenRouter chat completions.
// Handles .env loading, model selection, and 429 fallback retry.
//
// Usage:
//   const { createClient, loadEnv } = require('./lib/openrouter');
//   loadEnv();
//   const client = createClient({ title: 'My Agent' });
//   const text = await client.complete([{ role: 'user', content: 'Hello' }]);
//
// Environment variables read:
//   OPENROUTER_API_KEY       — required
//   OPENROUTER_MODEL         — default model (fallback: google/gemini-flash-1.5)
//   FALLBACK_OPENROUTER_MODEL — retry model on 429 (optional)

const { readFileSync } = require('fs');
const { join } = require('path');

// Load .env from project root into process.env (idempotent — won't overwrite existing vars)
function loadEnv(rootDir = join(__dirname, '..', '..')) {
  try {
    const envFile = readFileSync(join(rootDir, '.env'), 'utf8');
    for (const line of envFile.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
      if (key && !(key in process.env)) process.env[key] = val;
    }
  } catch {}
}

// Parse CLI args — thin utility, same interface used across all scripts
function getArg(args, flag) {
  const long = args.find(a => a.startsWith(`--${flag}=`));
  if (long) return long.slice(flag.length + 3);
  const idx = args.indexOf(`--${flag}`);
  return idx !== -1 ? args[idx + 1] : null;
}

function hasFlag(args, flag) {
  return args.includes(`--${flag}`);
}

// Create an OpenRouter client bound to specific credentials and options
function createClient(options = {}) {
  const {
    title = 'OpenRouter Agent',
    referer = 'https://openflows.org',
    defaultModel = null,
    temperature = 0.5,
  } = options;

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error('OPENROUTER_API_KEY not set. Add it to .env');

  const primaryModel = defaultModel || process.env.OPENROUTER_MODEL || 'google/gemini-flash-1.5';
  const fallbackModel = process.env.FALLBACK_OPENROUTER_MODEL || null;

  async function complete(messages, { model = primaryModel, temp = temperature } = {}) {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': referer,
        'X-Title': title,
      },
      body: JSON.stringify({ model, messages, temperature: temp }),
    });

    if (!res.ok) {
      const errText = await res.text();
      if (res.status === 429 && fallbackModel && model !== fallbackModel) {
        process.stderr.write(`\n  ⚠ Rate limit on ${model}, retrying with fallback: ${fallbackModel}\n`);
        return complete(messages, { model: fallbackModel, temp });
      }
      throw new Error(`OpenRouter ${res.status}: ${errText}`);
    }

    const data = await res.json();
    return data.choices?.[0]?.message?.content ?? '';
  }

  // Convenience: single user prompt → string response
  async function ask(prompt, opts = {}) {
    return complete([{ role: 'user', content: prompt }], opts);
  }

  // Convenience: system + user → string response
  async function chat(systemPrompt, userPrompt, opts = {}) {
    return complete(
      [{ role: 'system', content: systemPrompt }, { role: 'user', content: userPrompt }],
      opts
    );
  }

  return { complete, ask, chat, primaryModel, fallbackModel };
}

module.exports = { loadEnv, createClient, getArg, hasFlag };
