---
layout: layouts/home.njk
title: Jesse Hirsh
dek: Researcher, speaker, and strategist working at the intersection of AI, media, and governance.
description: Jesse Hirsh helps leaders and organizations make sense of AI, disinformation, and systems disruption through speaking, research, and strategic counsel.
permalink: /
heroImage: /assets/img/PXL_20230904_124710967.jpg
heroAlt: Jesse Hirsh speaking on stage in front of a projected city skyline and his name.
---

## What I work on

AI adoption and governance, media literacy, disinformation, institutional trust, and the systems pressures reshaping how we lead, decide, and communicate. I bring these to conference stages, executive briefings, podcasts, and public commentary — and to the agricultural sector through [The Future Herd](https://thefutureherd.ca), a podcast and leadership forum at the intersection of technology, policy, and farming.

## Media host and guest

For more than three decades, media has been part of my work: hosting, interviewing, guesting, moderating, and translating complex issues in real time. I am available for podcasts, radio, television, documentary interviews, recurring commentary, and hosted conversations where the goal is clarity rather than noise.

<div class="grid">
  <article class="card">
    <span class="card-label">Recent appearance</span>
    <h3><a href="https://chatterthatmatters.libsyn.com/there-is-only-one-jesse-hirsh">There is only one Jesse Hirsh</a></h3>
    <p>Chatter That Matters, April 16, 2026. A wide-ranging conversation on authority, platforms, education, farming, and the media, technology, and culture systems shaping public life.</p>
  </article>
  <article class="card">
    <span class="card-label">For producers and hosts</span>
    <h3><a href="/media/">Book Jesse for media</a></h3>
    <p>Live guest, long-form podcast guest, host, moderator, recurring commentator, and documentary subject for AI, governance, media power, public trust, agriculture, and systems change.</p>
  </article>
</div>

## Brief Jesse

Tell me about your event. I'll build the talk — title, premise, opening hook, and a draft booking email — specific to your needs.

[Brief Jesse →](/brief/)

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
  </article>
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
