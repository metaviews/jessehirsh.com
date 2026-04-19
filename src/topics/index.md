---
layout: layouts/page.njk
title: Topics
dek: Outcome-driven sessions built for leaders making high-stakes decisions.
description: Speaking topics from Jesse Hirsh on AI governance, media disruption, disinformation, authority, food systems, uncertainty, and systems change.
permalink: /topics/
---

Choose the topic area that best matches your audience mandate.

## What I'm speaking on right now

<div class="grid">
{% for item in currentFocus %}
  <article class="card">
    <span class="card-label">Speaking now</span>
    <h3>{{ item.title }}</h3>
    <p>{{ item.hook }}</p>
    <a class="cta" href="mailto:speaking@jessehirsh.com?subject={{ item.bookingSubject }}">Book this talk</a>
  </article>
{% endfor %}
</div>

## Core topics

<div class="grid">
{% for topic in collections.topics %}
  <article class="card">
    <h3><a href="{{ topic.url }}">{{ topic.data.title }}</a></h3>
    <p>{{ topic.data.cardDek }}</p>
  </article>
{% endfor %}
</div>

{% include "partials/cta.njk" %}
