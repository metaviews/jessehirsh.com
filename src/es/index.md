---
lang: es
layout: layouts/home.njk
title: Jesse Hirsh
dek: Investigador, orador y estratega que trabaja en la intersección de AI, medios y gobernanza.
description: Jesse Hirsh ayuda a líderes y organizaciones a comprender AI, desinformación y disrupción de sistemas a través de conferencias, investigación y asesoramiento estratégico.
permalink: /es/
heroImage: /assets/img/PXL_20230904_124710967.jpg
heroAlt: Jesse Hirsh speaking on stage in front of a projected city skyline and his name.
---
## Áreas de trabajo

Adopción de AI y gobernanza, alfabetización mediática, desinformación, confianza institucional y las presiones sistémicas que están remodelando cómo lideramos, decidimos y comunicamos. Llevo estos temas a escenarios de conferencias, sesiones ejecutivas, podcasts y comentarios públicos, y al sector agrícola a través de [The Future Herd](https://thefutureherd.ca), un podcast y foro de liderazgo en la intersección de la tecnología, la política y la agricultura.

## Anfitrión e invitado en medios

Durante más de tres décadas, los medios han sido parte de mi trabajo: conducir, entrevistar, participar como invitado, moderar y traducir temas complejos en tiempo real. Estoy disponible para podcasts, radio, televisión, entrevistas documentales, comentarios recurrentes y conversaciones conducidas donde el objetivo es la claridad, no el ruido.

<div class="grid">
  <article class="card">
    <span class="card-label">Aparición reciente</span>
    <h3><a href="https://chatterthatmatters.libsyn.com/there-is-only-one-jesse-hirsh">There is only one Jesse Hirsh</a></h3>
    <p>Chatter That Matters, 16 de abril de 2026. Una conversación amplia sobre autoridad, plataformas, educación, agricultura y los sistemas de medios, tecnología y cultura que moldean la vida pública.</p>
  </article>
  <article class="card">
    <span class="card-label">Para productores y anfitriones</span>
    <h3><a href="/es/media/">Reservar a Jesse para medios</a></h3>
    <p>Invitado en vivo, invitado de podcast de largo formato, anfitrión, moderador, comentarista recurrente y sujeto documental sobre AI, gobernanza, poder mediático, confianza pública, agricultura y cambio sistémico.</p>
  </article>
</div>

## Brief Jesse

Cuéntame sobre tu evento. Diseñaré la charla — título, premisa, gancho inicial y un borrador de correo de reserva — específica para tus necesidades.

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
    <p>Reuniendo a agricultores, responsables políticos y tecnólogos para pensar con claridad sobre el futuro de la agricultura. Conducido por Jesse en la intersección de la tecnología, la política y la práctica.</p>
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
