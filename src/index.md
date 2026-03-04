---
layout: layouts/home.njk
title: Jesse Hirsh
dek: Researcher, speaker, and strategist working at the intersection of AI, media, and governance.
description: Jesse Hirsh helps leaders and organizations make sense of AI, disinformation, and systems disruption through speaking, research, and strategic counsel.
permalink: /
heroImage: /assets/img/PXL_20230904_124710967.jpg
heroAlt: Jesse Hirsh speaking on stage in front of a projected city skyline and his name.
---

## Upcoming event

**Building with AI: Community Workshop** — March 21, 2026, 9:30–11:00 AM, John Levi Community Centre, Lanark County. A free, hands-on session on AI literacy, LLMs, and responsible use. [Register here](https://metaviews.ca/LINK/event/)

## What I work on

AI adoption and governance, media literacy, disinformation, institutional trust, and the systems pressures reshaping how we lead, decide, and communicate. I bring these to conference stages, executive briefings, podcasts, and public commentary — and to the agricultural sector through [The Future Herd](https://thefutureherd.ca), a podcast and leadership forum at the intersection of technology, policy, and farming.


## Current focus

<div class="grid">
{% for item in currentFocus %}
  <article class="card">
    <span class="card-label">Current focus</span>
    <h3>{{ item.title }}</h3>
    <p>{{ item.hook }}</p>
  </article>
{% endfor %}
  <article class="card">
    <span class="card-label">Podcast & convening</span>
    <h3><a href="/future-herd/">The Future Herd</a></h3>
    <p>Bringing together farmers, policymakers, and technologists to think clearly about the future of agriculture. Hosted by Jesse at the intersection of technology, policy, and practice.</p>
</div>

</div>

## Topics

<div class="grid">
{% for topic in collections.topics %}
  <article class="card">
    <h3><a href="{{ topic.url }}">{{ topic.data.title }}</a></h3>
    <p>{{ topic.data.cardDek }}</p>
  </article>
{% endfor %}
</div>

## What people say

{% for item in endorsements %}
- "{{ item.quote }}" — {{ item.attribution }}
{% endfor %}

## Selected engagements

{% for item in engagements %}
- {% if item.year %}{{ item.year }}: {% endif %}{{ item.name }}{% if item.type %} ({{ item.type }}){% endif %}
{% endfor %}

{% include "partials/cta.njk" %}
