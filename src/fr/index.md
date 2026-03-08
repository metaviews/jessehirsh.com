---
lang: fr
layout: layouts/home.njk
title: Jesse Hirsh
dek: Chercheur, conférencier et stratège travaillant à l'intersection de l'AI, des médias et de la gouvernance.
description: Jesse Hirsh aide les dirigeants et les organisations à décrypter l'AI, la désinformation et les perturbations systémiques grâce à la prise de parole, à la recherche et à des conseils stratégiques.
permalink: /fr/
heroImage: /assets/img/PXL_20230904_124710967.jpg
heroAlt: Jesse Hirsh speaking on stage in front of a projected city skyline and his name.
---
## Événement à venir

**Construire avec AI : Atelier communautaire** — 21 mars 2026, 9h30–11h00, John Levi Community Centre, Lanark County. Une session gratuite et pratique sur la littératie en AI, les LLM et l'utilisation responsable. [S'inscrire ici](https://metaviews.ca/LINK/event/)

## Ce sur quoi je travaille

Adoption et gouvernance de l'AI, littératie médiatique, désinformation, confiance institutionnelle, et les pressions systémiques qui transforment notre façon de diriger, décider et communiquer. J'interviens sur des scènes de conférence, des briefings pour cadres, des podcasts et des commentaires publics — et dans le secteur agricole grâce à [The Future Herd](https://thefutureherd.ca), un podcast et un forum de leadership à l'intersection de la technologie, de la politique et de l'agriculture.

## Brief Jesse

Dites-moi en plus sur votre événement. Je construirai la conférence — titre, prémisse, accroche d'ouverture et un projet d'email de réservation — adaptés à vos besoins.

[Brief Jesse →](/brief/)

## Focus actuel

<div class="grid">
{% for item in currentFocus %}
  <article class="card">
    <span class="card-label">Focus actuel</span>
    <h3>{{ item.title }}</h3>
    <p>{{ item.hook }}</p>
  </article>
{% endfor %}
  <article class="card">
    <span class="card-label">Podcast et rassemblement</span>
    <h3><a href="/future-herd/">The Future Herd</a></h3>
    <p>Rassembler agriculteurs, décideurs et technologues pour penser clairement l'avenir de l'agriculture. Animé par Jesse à l'intersection de la technologie, de la politique et de la pratique.</p>
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

## Ce que les gens disent

{% for item in endorsements %}
- "{{ item.quote }}" — {{ item.attribution }}
{% endfor %}

## Engagements sélectionnés

{% for item in engagements %}
- {% if item.year %}{{ item.year }} : {% endif %}{{ item.name }}{% if item.type %} ({{ item.type }}){% endif %}
{% endfor %}

{% include "partials/cta.njk" %}