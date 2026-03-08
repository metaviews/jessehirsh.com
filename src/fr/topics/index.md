---
lang: fr
layout: layouts/page.njk
title: Sujets
dek: Séances axées sur les résultats conçues pour les dirigeants prenant des décisions à fort enjeu.
description: Sujets de conférence offerts par Jesse Hirsh — actuels et essentiels.
permalink: /fr/topics/
---
Choisissez le domaine thématique qui correspond le mieux au mandat de votre public.

## Mes sujets de conférence actuels

<div class="grid">
{% for item in currentFocus %}
  <article class="card">
    <span class="card-label">Conférences actuelles</span>
    <h3>{{ item.title }}</h3>
    <p>{{ item.hook }}</p>
    <a class="cta" href="mailto:speaking@jessehirsh.com?subject={{ item.bookingSubject }}">Réserver cette conférence</a>
  </article>
{% endfor %}
</div>

## Thématiques clés

<div class="grid">
{% for topic in collections.frTopics %}
  <article class="card">
    <h3><a href="{{ topic.url }}">{{ topic.data.title }}</a></h3>
    <p>{{ topic.data.cardDek }}</p>
  </article>
{% endfor %}
</div>

{% include "partials/cta.njk" %}