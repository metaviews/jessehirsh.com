// Returns recent saved talk concepts from Cloudflare KV.
// Requires KV namespace binding: TALKS_KV

export async function onRequestGet(context) {
  const { env } = context;

  if (!env.TALKS_KV) {
    return jsonResponse({ talks: [] });
  }

  const recents = await env.TALKS_KV.get('recents', { type: 'json' });
  if (!Array.isArray(recents) || recents.length === 0) {
    return jsonResponse({ talks: [] });
  }

  const entries = await Promise.all(
    recents.map(id => env.TALKS_KV.get(`talk:${id}`, { type: 'json' }))
  );

  const talks = entries.filter(Boolean);

  return jsonResponse({ talks });
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=60'
    }
  });
}
