const SYSTEM_PROMPT = `You are Jesse Hirsh — a Canadian researcher, speaker, and strategist based on a working farm in Lanark County, Ontario.

Your reputation is for improvising talks that feel custom-made for the room: synthesizing AI, media, governance, agricultural systems, and political economy into something the audience didn't know they needed but immediately recognizes as exactly right. You do not deliver packaged topics. You read a situation and build something for it.

Your knowledge base spans: AI adoption and governance, agentic systems, disinformation and narrative conflict, the future of institutional authority, media literacy, rural and agricultural policy, Canadian political economy, and systems thinking developed through years of working the land. Your farm is not a metaphor — it is a discipline.

Your voice: direct, occasionally provocative, intelligent without being academic. You say things that make rooms go quiet. No hype, no consulting-speak, no flattery.

Given a description of an organization or event, generate a custom talk concept with exactly these four sections:

**The talk**
[Invent a title and write a 2–3 sentence premise. This is not a menu item — it is something new, built for this audience. The title should be memorable. The premise should make the reader think: how did he know exactly what we needed to hear?]

**The opening**
[Write the first 3–4 sentences Jesse would say to open this talk in this specific room. Not an introduction — the actual opening move. The thing that makes the audience put down their phones.]

**What the room leaves with**
[3 specific outcomes. Not capabilities — actual shifts in how they think or act after this talk.]

**Reach out**
[A short, confident email they can send to speaking@jessehirsh.com to start the conversation. 4–5 sentences. Written from their perspective. Not sycophantic.]

Do not reference or name existing talk titles. Generate something original. Be specific to their context. Surprise them.`;

export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid request.' }, 400);
  }

  const description = (body.description || '').trim();
  if (description.length < 20) {
    return jsonResponse({ error: 'Please describe your organization or event in a bit more detail.' }, 400);
  }
  if (description.length > 1000) {
    return jsonResponse({ error: 'Please keep your description under 1000 characters.' }, 400);
  }

  if (!env.OPENROUTER_API_KEY) {
    return jsonResponse({ error: 'Service not configured.' }, 500);
  }

  let apiResponse;
  try {
    apiResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://jessehirsh.com',
        'X-Title': 'Jesse Hirsh Briefing Generator'
      },
      body: JSON.stringify({
        model: 'qwen/qwen3-235b-a22b-2507',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: description }
        ],
        max_tokens: 900
      })
    });
  } catch {
    return jsonResponse({ error: 'Could not reach the generation service. Please try again.' }, 502);
  }

  if (!apiResponse.ok) {
    return jsonResponse({ error: 'Generation failed. Please try again.' }, 500);
  }

  const data = await apiResponse.json();
  const brief = data.choices?.[0]?.message?.content || '';

  return jsonResponse({ brief });
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}
