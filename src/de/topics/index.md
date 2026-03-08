---
lang: de
layout: layouts/page.njk
title: Themen
dek: Ergebnisorientierte Vorträge, entwickelt für Führungskräfte, die weitreichende Entscheidungen treffen.
description: Vortragsthemen von Jesse Hirsh — aktuell und zentral.
permalink: /de/topics/
---
Wählen Sie den Themenbereich, der am besten zu den Anforderungen Ihres Publikums passt.

## Worüber ich aktuell spreche

<div class="grid">
{% for item in currentFocus %}
  <article class="card">
    <span class="card-label">Aktueller Vortrag</span>
    <h3>{{ item.title }}</h3>
    <p>{{ item.hook }}</p>
    <a class="cta" href="mailto:speaking@jessehirsh.com?subject={{ item.bookingSubject }}">Diesen Vortrag buchen</a>
  </article>
{% endfor %}
</div>

## Kernthemen

<div class="grid">
{% for topic in collections.deTopics %}
  <article class="card">
    <h3><a href="{{ topic.url }}">{{ topic.data.title }}</a></h3>
    <p>{{ topic.data.cardDek }}</p>
  </article>
{% endfor %}
</div>

{% include "partials/cta.njk" %}