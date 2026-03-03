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

## Topics

### What I'm speaking on right now

<div class="grid">
{% for item in currentFocus %}
  <article class="card">
    <span class="card-label">Speaking now</span>
    <h3>{{ item.title }}</h3>
    <p>{{ item.hook }}</p>
  </article>
{% endfor %}
</div>

### Core topics

<div class="grid">
{% for topic in collections.topics %}
  <article class="card">
    <h3><a href="{{ topic.url }}">{{ topic.data.title }}</a></h3>
    <p>{{ topic.data.cardDek }}</p>
  </article>
{% endfor %}
</div>

## Proof

### Endorsements

{% for item in endorsements %}
- "{{ item.quote }}" — {{ item.attribution }}
{% endfor %}

### Selected engagements

{% for item in engagements %}
- {% if item.year %}{{ item.year }}: {% endif %}{{ item.name }}{% if item.type %} ({{ item.type }}){% endif %}
{% endfor %}

{% include "partials/cta.njk" %}
