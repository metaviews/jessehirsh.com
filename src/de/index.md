---
lang: de
layout: layouts/home.njk
title: Jesse Hirsh
dek: Forscher, Redner und Stratege an der Schnittstelle von AI, Medien und Governance.
description: Jesse Hirsh hilft Führungskräften und Organisationen, AI, Desinformation und Systemstörungen durch Vorträge, Forschung und strategische Beratung zu verstehen.
permalink: /de/
heroImage: /assets/img/PXL_20230904_124710967.jpg
heroAlt: Jesse Hirsh speaking on stage in front of a projected city skyline and his name.
---
## Anstehende Veranstaltung

**Entwicklung mit AI: Community-Workshop** — 21. März 2026, 9:30–11:00 Uhr, John Levi Community Centre, Lanark County. Eine kostenlose, praxisorientierte Session zu AI-Literacy, LLMs und verantwortungsvollem Einsatz. [Hier anmelden](https://metaviews.ca/LINK/event/)

## Meine Schwerpunkte

AI-Adoption und Governance, Medienkompetenz, Desinformation, institutionelles Vertrauen und die systemischen Belastungen, die neu definieren, wie wir führen, entscheiden und kommunizieren. Ich bringe diese Themen auf Konferenzbühnen, Executive-Briefings, Podcasts und in die öffentliche Diskussion — und in die Landwirtschaft durch [The Future Herd](https://thefutureherd.ca), einen Podcast und Leadership-Forum an der Schnittstelle von Technologie, Politik und Landwirtschaft.

## Projektbriefing

Erzählen Sie mir von Ihrer Veranstaltung. Ich erstelle den Vortrag — Titel, Prämisse, Einstiegshook und einen Entwurf für eine Buchungs-E-Mail — speziell auf Ihre Bedürfnisse zugeschnitten.

[Projektbriefing →](/brief/)

## Aktuelle Schwerpunkte

<div class="grid">
{% for item in currentFocus %}
  <article class="card">
    <span class="card-label">Aktuelle Schwerpunkte</span>
    <h3>{{ item.title }}</h3>
    <p>{{ item.hook }}</p>
  </article>
{% endfor %}
  <article class="card">
    <span class="card-label">Podcast & Vernetzung</span>
    <h3><a href="/future-herd/">The Future Herd</a></h3>
    <p>Landwirte, politische Entscheidungsträger und Technologen zusammenbringen, um klar über die Zukunft der Landwirtschaft nachzudenken. Moderiert von Jesse an der Schnittstelle von Technologie, Politik und Praxis.</p>
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