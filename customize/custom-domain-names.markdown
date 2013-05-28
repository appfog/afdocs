---
title: Custom Domain Names
weight: 1
---

AppFog offers two ways to add custom domain names to your app: through the app console and with the `af` command line tool.

Note: Custom domain names are only available on paid plans.

* [App Console](#custom-domain-app-console)
* [AF CLI](#custom-domain-af-cli)

Once you've finished adding the domain to your app in one of those two ways, you'll need to [change your DNS settings at your DNS host](#custom-domain-dns).

## App Console {#custom-domain-app-console}

1. Head over to the [app console](https://console.appfog.com) and click on your app.

2. Click on the "Domain Names" tab on the left.

3. Add your custom domain name in the field and hit the "Update" button.

That's it!

## AF CLI {#custom-domain-af-cli}

1. If you haven't already, install the [af command line tool](http://docs.appfog.com/getting-started/af-cli) and log in.

2. Map the domain.

    $ af map <appname> <url>

For example:

    $ af map exampleapp www.example.com

## DNS {#custom-domain-dns}

We recommend using the `www.` subdomain as your canonical domain. Here's how to do that:

### Redirect Your Root Domain

At your DNS host, set up a redirect (302) from your root domain (`yourdomain.com`) to `www.yourdomain.com`.

This is a fairly standard tool that DNS services provide. If you don’t see an option for it at your domain host, contact their support services and they should be able to do that for you.

### Create a CNAME Alias

Depending on which infrastructure your app is running on, create a CNAME alias record for `www.yourdomain.com` to:

AWS US East:

    cname01.aws.af.cm

AWS Europe West:

    cname01.eu01.aws.af.cm

AWS Asia Southeast:

	cname01.ap01.aws.af.cm

HP Openstack AZ 2:

    cname01.hp.af.cm

### Root Domain

If you need to set your root domain (`yourdomain.com`) instead of the `www` subdomain, then create `A` records for your root domain to the following IP addresses (depending on the infratructure your app is running on):

AWS US East:

	107.21.3.47
	107.23.45.102

AWS Europe West:

	176.34.144.39
	176.34.141.96

AWS Asia Southeast:

	46.51.219.242
	46.51.223.163

HP Openstack AZ 2 (BETA -- SUBJECT TO CHANGE):

	15.185.162.179
	15.185.166.58

That's it! DNS propagation can take anywhere from a few minutes to 48 hours depending on your location, but once that's finished your app should resolve at your new custom domain.
