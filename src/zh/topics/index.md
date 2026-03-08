---
lang: zh-CN
layout: layouts/page.njk
title: 主题
dek: 专为做出高风险决策的领导者打造的结果导向型会议。
description: Jesse Hirsh 提供的演讲主题——当前及核心。
permalink: /zh/topics/
---
请选择最符合您受众需求的主题领域。

## 我目前演讲的主题

<div class="grid">
{% for item in currentFocus %}
  <article class="card">
    <span class="card-label">当前演讲</span>
    <h3>{{ item.title }}</h3>
    <p>{{ item.hook }}</p>
    <a class="cta" href="mailto:speaking@jessehirsh.com?subject={{ item.bookingSubject }}">预约此演讲</a>
  </article>
{% endfor %}
</div>

## 核心主题

<div class="grid">
{% for topic in collections.zhTopics %}
  <article class="card">
    <h3><a href="{{ topic.url }}">{{ topic.data.title }}</a></h3>
    <p>{{ topic.data.cardDek }}</p>
  </article>
{% endfor %}
</div>

{% include "partials/cta.njk" %}