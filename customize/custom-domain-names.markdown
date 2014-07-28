---
title: Custom Domain Names
weight: 1
---

## Custom Domain Names

AppFog offers two ways to add custom domain names to your app: through the app console and with the `af` command line tool. 

* [App Console](#custom-domain-app-console)
* [AF CLI](#custom-domain-af-cli)

Once you've finished adding the domain to your app in one of those two ways, you'll need to [change your DNS settings at your DNS host](#custom-domain-dns).

## App Console {#custom-domain-app-console}

1. Head over to the [app console](https://console.appfog.com) and click on your app. 

2. Click on the "Domain Names" tab on the left. 

3. Add your custom domain name in the field and hit the "Update" button. 

That's it!

### AF CLI {#custom-domain-af-cli}

1. If you haven't already, install the [af command line tool](http://docs.appfog.com/getting-started/af-cli) and log in with your AppFog credentials. 

2. Map the domain.

    $ af map <appname> <url>

For example: 

    $ af map exampleapp www.example.com

### DNS {#custom-domain-dns}

> **Note:** If you intend to use SSL with your site, ***STOP HERE*** and go check out our [SSL for Custom Domains](http://docs.appfog.com/customize/ssl) documentation. It includes information on the different DNS configuration needed for SSL Endpoint termination.

We recommend using the `www.` subdomain as your canonical domain. Here's how to do that: 

#### Redirect Your Root Domain

At your DNS host, set up a redirect (302) from your root domain (`yourdomain.com`) to `www.yourdomain.com`.

This is a fairly standard tool that DNS services provide. If you don’t see an option for it at your domain host, contact their support services and they should be able to do that for you.

#### Create a CNAME Alias

Depending on which infrastructure your app is running on, create a CNAME alias record for `www.yourdomain.com` to:

AWS US East:

    cname01.aws.af.cm

AWS Europe West:

    cname01.eu01.aws.af.cm

AWS Asia Southeast:

    cname01.ap01.aws.af.cm

CLC UC1 (Santa Clara, CA):

    cname01.uc01.clc.af.cm

---

That's it! DNS propagation can take anywhere from a few minutes to 48 hours dep
ending on your location, but once that's finished your app should resolve at your new custom domain.
