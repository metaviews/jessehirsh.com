---
lang: de
layout: layouts/home.njk
title: Jesse Hirsh
dek: Forscher, Redner und Stratege, der an der Schnittstelle von AI, Medien und Governance arbeitet.
description: Jesse Hirsh hilft Führungskräften und Organisationen, AI, Desinformation und Systemdisruption durch Vorträge, Forschung und strategische Beratung zu verstehen.
permalink: /de/
heroImage: /assets/img/PXL_20230904_124710967.jpg
heroAlt: Jesse Hirsh speaking on stage in front of a projected city skyline and his name.
---
## Meine Schwerpunkte

AI-Adoption und Governance, Medienkompetenz, Desinformation, institutionelles Vertrauen und systemische Druckfaktoren, die neu definieren, wie wir führen, entscheiden und kommunizieren. Ich bringe diese Themen auf Konferenzbühnen, Executive-Briefings, Podcasts und öffentliche Kommentare — und in den Agrarsektor durch [The Future Herd](https://thefutureherd.ca), einen Podcast und Leadership-Forum an der Schnittstelle von Technologie, Politik und Landwirtschaft.

## Briefing an Jesse

Erzählen Sie mir von Ihrer Veranstaltung. Ich entwickle den Vortrag — Titel, Prämisse, Eröffnungshaken und einen Entwurf für die Buchungs-E-Mail — spezifisch auf Ihre Bedürfnisse zugeschnitten.

[Briefing an Jesse →](/brief/)

## Aktuelle Schwerpunkte

<div class="grid">
{% for item in currentFocus %}
  <article class="card">
    <span class="card-label">Aktueller Fokus</span>
    <h3>{{ item.title }}</h3>
    <p>{{ item.hook }}</p>
  </article>
{% endfor %}
  <article class="card">
    <span class="card-label">Podcast & Zusammenkünfte</span>
    <h3><a href="/future-herd/">The Future Herd</a></h3>
    <p>Vereinigt Landwirte, Politikentscheider und Technologen, um klar über die Zukunft der Landwirtschaft nachzudenken. Moderiert von Jesse an der Schnittstelle von Technologie, Politik und Praxis.</p>
  </article>
</div>

## Themen

<div class="grid">
{% for topic in collections.deTopics %}
  <article class="card">
    <h3><a href="{{ topic.url }}">{{ topic.data.title }}</a></h3>
    <p>{{ topic.data.cardDek }}</p>
  </article>
{% endfor %}
</div>

## Was andere sagen

{% for item in endorsements %}
- "{{ item.quote }}" — {{ item.attribution }}
{% endfor %}

## Ausgewählte Engagements

{% for item in engagements %}
- {% if item.year %}{{ item.year }}: {% endif %}{{ item.name }}{% if item.type %} ({{ item.type }}){% endif %}
{% endfor %}

{% include "partials/cta.njk" %}