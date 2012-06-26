---
layout: default
title: Best Practices
---

{% for current in site.categories.best-practices %}
<h3><a href="{{ current.url }}">{{ forloop.index }}. {{ current.title }}</a></h3>
<p>{{ current.description }}</p>
{% endfor %}
