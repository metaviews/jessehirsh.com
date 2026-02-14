---
layout: layouts/page.njk
title: Endorsements
dek: Feedback from organizers and institutional partners.
description: Curated speaking endorsements for Jesse Hirsh.
permalink: /speaking/endorsements/
---

{% for item in endorsements %}
## {{ item.attribution }}

"{{ item.quote }}"

{% endfor %}

{% include "partials/cta.njk" %}