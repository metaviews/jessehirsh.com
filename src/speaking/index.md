---
layout: layouts/page.njk
title: Speaking
dek: Keynotes and briefings that turn uncertainty into concrete organizational decisions.
description: Speaking formats, outcomes, endorsements, and booking information for Jesse Hirsh.
permalink: /speaking/
---

Jesse works with conferences, associations, public institutions, and executive teams that need strategic clarity on complex systems.

{% include "partials/cta.njk" %}

## Outcomes your audience leaves with

- Better judgment on AI and media narratives.
- Practical framing for governance and trust.
- A decision agenda matched to institutional realities.

## Formats

- Keynote: high-context framing with direct strategic implications.
- Briefing: focused analysis for leadership teams.
- Conversation: moderated Q and A, fireside, or panel anchoring.
- Workshop: hands-on strategic synthesis for working groups.

## Proof

- <a href="/speaking/endorsements/">Read endorsements</a>
- Selected engagements:

{% for item in engagements %}
  - {{ item.year }}: {{ item.name }}
{% endfor %}

{% include "partials/cta.njk" %}