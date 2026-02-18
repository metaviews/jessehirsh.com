---
layout: layouts/home.njk
title: Jesse Hirsh | Speaking
dek: Strategic keynotes and briefings for organizations that need decision-grade clarity under pressure.
description: Book Jesse Hirsh for practical, outcome-driven speaking engagements on AI, media, governance, and systems change.
permalink: /
heroImage: /assets/img/PXL_20230904_124710967.jpg
heroAlt: Jesse Hirsh speaking on stage in front of a projected city skyline and his name.
---

## Who this is for

Conference organizers, associations, public institutions, executive teams, and media producers booking audiences that need signal over noise.

{% include "partials/cta.njk" %}

## Audience outcomes

- Clear frameworks to evaluate AI and media claims.
- Shared language for risk, governance, and institutional trust.
- Action priorities leaders can execute in the next quarter.

## Formats you can book

- Keynotes (30-60 minutes)
- Executive briefings (45-90 minutes)
- Moderated conversations and fireside sessions
- Strategy workshops (half-day)

{% include "partials/cta.njk" %}

## Topics

<div class="grid">
  <article class="card">
    <h3><a href="/topics/future-of-authority/">Future of Authority</a></h3>
    <p>How institutions retain legitimacy in networked publics.</p>
  </article>
  <article class="card">
    <h3><a href="/topics/ai-literacy/">AI Literacy</a></h3>
    <p>How leaders separate capability, hype, and implementation risk.</p>
  </article>
  <article class="card">
    <h3><a href="/topics/disinformation/">Disinformation</a></h3>
    <p>Operational responses to manipulation, narratives, and trust decay.</p>
  </article>
  <article class="card">
    <h3><a href="/topics/agroecology/">Agroecology</a></h3>
    <p>Food systems as practical models for resilient policy and governance.</p>
  </article>
</div>

## Proof

### Endorsements

{% for item in endorsements %}
- "{{ item.quote }}" - {{ item.attribution }}
{% endfor %}

### Selected engagements

{% for item in engagements %}
- {% if item.year %}{{ item.year }}: {% endif %}{{ item.name }}{% if item.type %} ({{ item.type }}){% endif %}
{% endfor %}

{% include "partials/cta.njk" %}
