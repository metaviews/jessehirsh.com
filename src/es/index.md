---
lang: es
layout: layouts/home.njk
title: Jesse Hirsh
dek: Investigador, conferenciante y estratega que trabaja en la intersección de AI, medios y gobernanza.
description: Jesse Hirsh ayuda a líderes y organizaciones a dar sentido a la AI, la desinformación y la disrupción de sistemas a través de conferencias, investigación y asesoramiento estratégico.
permalink: /es/
heroImage: /assets/img/PXL_20230904_124710967.jpg
heroAlt: Jesse Hirsh speaking on stage in front of a projected city skyline and his name.
---
## Próximo evento

**Building with AI: Taller Comunitario** — 21 de marzo de 2026, 9:30–11:00 AM, John Levi Community Centre, Lanark County. Una sesión gratuita y práctica sobre alfabetización en AI, LLMs y uso responsable. [Regístrate aquí](https://metaviews.ca/LINK/event/)

## Áreas de trabajo

Adopción y gobernanza de AI, alfabetización mediática, desinformación, confianza institucional y las presiones sistémicas que están redefiniendo cómo lideramos, decidimos y nos comunicamos. Llevo estos temas a escenarios de conferencias, briefings ejecutivos, podcasts y comentarios públicos — y al sector agrícola a través de [The Future Herd](https://thefutureherd.ca), un podcast y foro de liderazgo en la intersección de tecnología, políticas y agricultura.

## Brief Jesse

Cuéntame sobre tu evento. Yo construiré la charla — título, premisa, gancho de apertura y un borrador de correo de reserva — específica para tus necesidades.

[Brief Jesse →](/brief/)

## Enfoque actual

<div class="grid">
{% for item in currentFocus %}
  <article class="card">
    <span class="card-label">Enfoque actual</span>
    <h3>{{ item.title }}</h3>
    <p>{{ item.hook }}</p>
  </article>
{% endfor %}
  <article class="card">
    <span class="card-label">Podcast y convocatoria</span>
    <h3><a href="/future-herd/">The Future Herd</a></h3>
    <p>Agrupando a agricultores, responsables políticos y tecnólogos para pensar con claridad sobre el futuro de la agricultura. Conducido por Jesse en la intersección de tecnología, políticas y práctica.</p>
  </article>
</div>

## Temas

<div class="grid">
{% for topic in collections.esTopics %}
  <article class="card">
    <h3><a href="{{ topic.url }}">{{ topic.data.title }}</a></h3>
    <p>{{ topic.data.cardDek }}</p>
  </article>
{% endfor %}
</div>

## Lo que dicen

{% for item in endorsements %}
- "{{ item.quote }}" — {{ item.attribution }}
{% endfor %}

## Participaciones seleccionadas

{% for item in engagements %}
- {% if item.year %}{{ item.year }}: {% endif %}{{ item.name }}{% if item.type %} ({{ item.type }}){% endif %}
{% endfor %}

{% include "partials/cta.njk" %}