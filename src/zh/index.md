---
lang: zh-CN
layout: layouts/home.njk
title: Jesse Hirsh
dek: 研究人员、演讲者和战略家，致力于人工智能、媒体与治理的交叉领域工作。
description: Jesse Hirsh 通过演讲、研究和战略咨询，帮助领导者和组织理解人工智能、虚假信息及系统颠覆。
permalink: /zh/
heroImage: /assets/img/PXL_20230904_124710967.jpg
heroAlt: Jesse Hirsh speaking on stage in front of a projected city skyline and his name.
---
## 我专注的领域

AI 应用与治理、媒体素养、虚假信息、机构信任，以及重塑我们领导、决策和沟通方式的各种系统压力。我将这些内容带入会议舞台、高管简报、播客及公开评论中——并通过 [The Future Herd](https://thefutureherd.ca) 面向农业领域，这是一个位于技术、政策与农业交汇处的播客与领导力论坛。

## 媒体主持人与嘉宾

三十多年来，媒体一直是我工作的组成部分：主持、采访、作为嘉宾参与、主持讨论，并在实时对话中把复杂议题讲清楚。我可参与播客、广播、电视、纪录片访谈、常设评论和主持式对话，重点是清晰，而不是噪音。

<div class="grid">
  <article class="card">
    <span class="card-label">近期露面</span>
    <h3><a href="https://chatterthatmatters.libsyn.com/there-is-only-one-jesse-hirsh">There is only one Jesse Hirsh</a></h3>
    <p>Chatter That Matters，2026 年 4 月 16 日。一场广泛对话，涵盖权威、平台、教育、农业，以及塑造公共生活的媒体、技术和文化系统。</p>
  </article>
  <article class="card">
    <span class="card-label">面向制片人与主持人</span>
    <h3><a href="/zh/media/">预订 Jesse 参与媒体</a></h3>
    <p>可担任直播嘉宾、长篇播客嘉宾、主持人、论坛主持、常设评论员和纪录片访谈对象，主题包括 AI、治理、媒体权力、公共信任、农业和系统变革。</p>
  </article>
</div>

## 向 Jesse 简报

请告诉我您的活动详情。我将为您定制演讲——包括标题、核心观点、开场钩子以及一份针对您需求的预订邮件草稿。

[向 Jesse 简报 →](/brief/)

## 当前重点

<div class="grid">
{% for item in currentFocus %}
  <article class="card">
    <span class="card-label">当前重点</span>
    <h3>{{ item.title }}</h3>
    <p>{{ item.hook }}</p>
  </article>
{% endfor %}
  <article class="card">
    <span class="card-label">播客与召集</span>
    <h3><a href="/future-herd/">The Future Herd</a></h3>
    <p>汇聚农民、政策制定者和科技专家，清晰思考农业的未来。由 Jesse 主持，位于技术、政策与实践的交汇点。</p>
  </article>
</div>

## 主题

<div class="grid">
{% for topic in collections.zhTopics %}
  <article class="card">
    <h3><a href="{{ topic.url }}">{{ topic.data.title }}</a></h3>
    <p>{{ topic.data.cardDek }}</p>
  </article>
{% endfor %}
</div>

## 业界评价

{% for item in endorsements %}
- "{{ item.quote }}" — {{ item.attribution }}
{% endfor %}

## 精选活动

{% for item in engagements %}
- {% if item.year %}{{ item.year }}: {% endif %}{{ item.name }}{% if item.type %} ({{ item.type }}){% endif %}
{% endfor %}

{% include "partials/cta.njk" %}
