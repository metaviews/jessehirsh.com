---
lang: zh-CN
layout: layouts/home.njk
title: Jesse Hirsh
dek: 研究人员、演讲者和战略家，致力于 AI、媒体与治理的交叉领域。
description: Jesse Hirsh 帮助领导者和组织通过演讲、研究和战略咨询，理解 AI、虚假信息及系统颠覆。
permalink: /zh/
heroImage: /assets/img/PXL_20230904_124710967.jpg
heroAlt: Jesse Hirsh speaking on stage in front of a projected city skyline and his name.
---
## 近期活动

**与 AI 共创：社区研讨会** — 2026 年 3 月 21 日，上午 9:30–11:00，John Levi Community Centre，Lanark County。一场关于 AI 素养、大语言模型及负责任使用的免费实操课程。[立即注册](https://metaviews.ca/LINK/event/)

## 专注领域

AI 采用与治理、媒体素养、虚假信息、机构信任，以及正在重塑我们领导、决策和沟通方式的各种系统压力。我将这些内容带到会议舞台、高管简报、播客和公开评论中——并通过 [The Future Herd](https://thefutureherd.ca) 面向农业领域，这是一个在技术、政策与农业交汇处的播客和领导力论坛。

## 向 Jesse 简述

请告诉我关于您的活动。我将为您打造演讲——包括标题、核心观点、开场钩子以及一封针对您需求的预订邮件草稿。

[向 Jesse 简述 →](/brief/)

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
    <p>汇聚农民、政策制定者和技术专家，清晰思考农业的未来。由 Jesse 主持，位于技术、政策与实践的交汇点。</p>
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

## 各界评价

{% for item in endorsements %}
- "{{ item.quote }}" — {{ item.attribution }}
{% endfor %}

## 精选活动

{% for item in engagements %}
- {% if item.year %}{{ item.year }}: {% endif %}{{ item.name }}{% if item.type %} ({{ item.type }}){% endif %}
{% endfor %}

{% include "partials/cta.njk" %}