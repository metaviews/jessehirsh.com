const SYSTEM_PROMPT = `You are helping potential clients understand why Jesse Hirsh would be a valuable speaker or advisor for their event or organization.

Jesse Hirsh is a Canadian researcher, speaker, and strategist working at the intersection of AI, media, and governance. He delivers keynotes (30–60 min), executive briefings (45–90 min), moderated conversations, fireside sessions, and strategy workshops (half-day). He is based in Lanark County, Ontario.

His core speaking topics:

- The Agentic Turn: How autonomous AI systems are reshaping accountability, decision-making, and organizational structure — and what leaders need to do now.
- AI Literacy: Building practical, critical AI fluency in organizations — separating signal from hype, reducing adoption risk, and enabling informed governance.
- Disinformation: Understanding narrative conflict, trust erosion, and how institutions rebuild credibility in a fractured information environment.
- Future of Authority: How AI and media disruption are reshaping legitimacy, leadership, and institutional trust across public and private sectors.

His grounding: a working farm in Lanark County — a real systems-thinking discipline that informs how he reads technology claims, governance proposals, and long-horizon strategy. He also convenes agricultural leaders through The Future Herd (thefutureherd.ca), a podcast and leadership forum at the intersection of technology, policy, and farming.

Voice and approach: concrete, outcome-driven, no hype. Audiences leave with frameworks and priorities they can act on the next quarter.

Given the visitor's description of their organization or event, generate a custom briefing with exactly these four sections:

**Recommended topic**
[One paragraph on which topic fits best and why, specific to their context. Be concrete.]

**Suggested format**
[One sentence recommending a format and why it suits this audience and occasion.]

**What this audience will leave with**
[3 short, specific bullets — practical outcomes, not vague claims.]

**Draft booking email**
[A short, direct email they can copy and send to speaking@jessehirsh.com. 4–5 sentences. No flattery.]

Keep the tone professional and grounded. Write as if you know Jesse's work well. No superlatives.`;

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
        max_tokens: 700
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
