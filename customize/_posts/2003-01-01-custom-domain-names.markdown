---
layout: doc-page
title: Custom Domain Names
weight: 1
---

Note: AppFog does not support root domain names (e.g. "example.com") yet. Root domain support is coming soon.

AppFog offers two ways to add custom domain names to your app: through the app console and with the `af` command line tool. 

* [App Console](#custom-domain-app-console)
* [AF CLI](#custom-domain-af-cli)

# App Console {#custom-domain-app-console}

1. Head over to the [app console](https://console.appfog.com) and click on your app. 

2. Click on the "Domain Names" tab on the left. 

3. Add your custom domain name in the field and hit the "Update" button. 

That's it!

# AF CLI {#custom-domain-af-cli}

1. If you haven't already, install the [af command line tool](http://docs.appfog.com/getting-started/af-cli) and log in. 

2. Map the domain.

    $ af map <appname> <url>

For example: 

    $ af map exampleapp www.example.com

That's it!
