// Saves a generated talk concept to Cloudflare KV (opt-in only).
// Stores only the generated output — never the visitor's input.
// Requires KV namespace binding: TALKS_KV

const MAX_TALKS = 100;

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.TALKS_KV) {
    return jsonResponse({ error: 'Gallery not configured.' }, 500);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid request.' }, 400);
  }

  const { title, premise, opening } = body;

  if (!title || !premise || !opening) {
    return jsonResponse({ error: 'Missing required fields.' }, 400);
  }

  if (
    typeof title !== 'string' || title.length > 200 ||
    typeof premise !== 'string' || premise.length > 1000 ||
    typeof opening !== 'string' || opening.length > 1000
  ) {
    return jsonResponse({ error: 'Invalid field length.' }, 400);
  }

  const id = crypto.randomUUID();
  const entry = {
    id,
    title: title.trim(),
    premise: premise.trim(),
    opening: opening.trim(),
    createdAt: new Date().toISOString()
  };

  // Store the individual entry
  await env.TALKS_KV.put(`talk:${id}`, JSON.stringify(entry), {
    expirationTtl: 60 * 60 * 24 * 365 // 1 year
  });

  // Update the recents list (keep last MAX_TALKS)
  let recents = [];
  const existing = await env.TALKS_KV.get('recents', { type: 'json' });
  if (Array.isArray(existing)) {
    recents = existing;
  }
  recents.unshift(id);
  if (recents.length > MAX_TALKS) recents = recents.slice(0, MAX_TALKS);
  await env.TALKS_KV.put('recents', JSON.stringify(recents));

  return jsonResponse({ ok: true, id });
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}
