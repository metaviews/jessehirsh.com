---
lang: es
layout: layouts/page.njk
title: Temas
dek: Sesiones orientadas a resultados diseñadas para líderes que toman decisiones de alto riesgo.
description: Temas de conferencias ofrecidos por Jesse Hirsh — actuales y fundamentales.
permalink: /es/topics/
---
Selecciona el área temática que mejor se alinee con el mandato de tu audiencia.

## Temas sobre los que hablo actualmente

<div class="grid">
{% for item in currentFocus %}
  <article class="card">
    <span class="card-label">Hablando ahora</span>
    <h3>{{ item.title }}</h3>
    <p>{{ item.hook }}</p>
    <a class="cta" href="mailto:speaking@jessehirsh.com?subject={{ item.bookingSubject }}">Reserva esta charla</a>
  </article>
{% endfor %}
</div>

## Temas principales

<div class="grid">
{% for topic in collections.esTopics %}
  <article class="card">
    <h3><a href="{{ topic.url }}">{{ topic.data.title }}</a></h3>
    <p>{{ topic.data.cardDek }}</p>
  </article>
{% endfor %}
</div>

{% include "partials/cta.njk" %}