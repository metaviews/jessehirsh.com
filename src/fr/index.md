---
lang: fr
layout: layouts/home.njk
title: Jesse Hirsh
dek: Chercheur, conférencier et stratège travaillant à l'intersection de AI, des médias et de la gouvernance.
description: Jesse Hirsh aide les leaders et les organisations à comprendre AI, la désinformation et la perturbation des systèmes grâce à ses conférences, sa recherche et son conseil stratégique.
permalink: /fr/
heroImage: /assets/img/PXL_20230904_124710967.jpg
heroAlt: Jesse Hirsh speaking on stage in front of a projected city skyline and his name.
---
## Mes domaines d'intervention

L'adoption et la gouvernance de l'AI, la littératie médiatique, la désinformation, la confiance institutionnelle, et les pressions systémiques qui transforment la façon dont nous menons, décidons et communiquons. Je les aborde sur les scènes de conférence, dans les briefings exécutifs, les podcasts et les commentaires publics — et dans le secteur agricole via [The Future Herd](https://thefutureherd.ca), un podcast et un forum de leadership à l'intersection de la technologie, de la politique et de l'agriculture.

## Envoyez un brief à Jesse

Parlez-moi de votre événement. Je concevrai la conférence — titre, prémisse, accroche d'ouverture et un projet d'email de réservation — spécifiquement adaptée à vos besoins.

[Envoyez un brief →](/brief/)

## Axes actuels

<div class="grid">
{% for item in currentFocus %}
  <article class="card">
    <span class="card-label">Focus actuel</span>
    <h3>{{ item.title }}</h3>
    <p>{{ item.hook }}</p>
  </article>
{% endfor %}
  <article class="card">
    <span class="card-label">Podcast & rassemblements</span>
    <h3><a href="/future-herd/">The Future Herd</a></h3>
    <p>Rassembler des agriculteurs, des décideurs politiques et des technologues pour réfléchir clairement à l'avenir de l'agriculture. Animé par Jesse à l'intersection de la technologie, de la politique et de la pratique.</p>
  </article>
</div>

## Thèmes

<div class="grid">
{% for topic in collections.frTopics %}
  <article class="card">
    <h3><a href="{{ topic.url }}">{{ topic.data.title }}</a></h3>
    <p>{{ topic.data.cardDek }}</p>
  </article>
{% endfor %}
</div>

## Ce qu'ils en disent

{% for item in endorsements %}
- "{{ item.quote }}" — {{ item.attribution }}
{% endfor %}

## Interventions sélectionnées

{% for item in engagements %}
- {% if item.year %}{{ item.year }}: {% endif %}{{ item.name }}{% if item.type %} ({{ item.type }}){% endif %}
{% endfor %}

{% include "partials/cta.njk" %}