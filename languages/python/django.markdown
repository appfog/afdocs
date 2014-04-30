---
title: Django
weight: 3
---

## Django

AppFog supports Django versions 1.3 and 1.4. To ensure your applicaiton is deployed using version 1.4 you will want to specify it within your requirements.txt file. If not specified it will default to version 1.3.

When you run the `af update` command on a Django app, AppFog automatically runs the `syncdb` command against the bound database for you as part of the staging process.


More coming soon. Meanwhile, check out [the GitHub repo for our Python Django Jumpstart](https://github.com/appfog/af-python-django).
