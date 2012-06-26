---
title: Custom Domain Names
layout: doc-page
weight: 5
description: Brand your app. 
---

With PHP Fog you can host custom domain names (e.g. my-web-app.com) or PHP Fog domain names (e.g. my-web-app.phpfogapp.com). If you use a phpfogapp.com domain name, then PHP Fog manages the DNS records for you, so you don't have to do anything. If you want to use a custom domain name, read on.

### 1. DNS Settings

We recommend using the `www.` subdomain as your canonical domain. Here's how to do that:

#### a. Redirect your root domain.

At your DNS host, set up a redirect (302) from your root domain (`yourdomain.com`) to `www.yourdomain.com`. 

This is a fairly standard tool that DNS services provide. If you don't see an option for it at your domain host, contact their support services and they should be able to do that for you.

#### b. Create a CNAME alias.

Create a CNAME alias record for `www.yourdomain.com` to: 

    cname01.phpfog.com

That's the simplest and most reliable method. For more details on why this is is more reliable, check out our [reliability doc](/reliability).

If you need to make your root domain (`yourdomain.com`) canonical instead of the www subdomain, [check the bottom of this page](#rootdomain).

### 2. Change the domain name setting in the PHP Fog app console.

Go to your app console at PHP Fog and click on the "Domain Name" tab on the left. Enter your custom domain name in the field. Use the root domain name (`yourdomain.com`) whether you're using `www`. or the root domain.

<img class="screenshot" src="/img/screenshots/domain.png" alt="Custom Domain"/>

Note: With WordPress apps, you *must* change your domain name in the WordPress administration panel before changing it in the PHP Fog app console.

Using a custom domain on our Shared Cloud will cost you $5/month, but it's free on our Dedicated Clouds. 

### 3. Wait for your DNS settings to propagate.

This can take anywhere from a few minutes to 48 hours, depending on your location. That's it!

## Recommended DNS Providers

* Amazon's Route 53
<!-- add more TKTK -->

## Handling Subdomains with Wildcards

Your PHP Fog app can handle routing for multiple subdomains for $5 per month. To enable this feature, go to the "Domain Name" tab in your app console and click on the "Enable Wildcard Domains" check-box. 

Then, at your DNS host, simply set a CNAME record for each subdomain to "`cname01.phpfog.com`".

Here's an example of how to handle this in your app's code:

{: .prettyprint .linenums} 
    $url_parts = explode('.', str_replace('.yourdomain.com', '', $_SERVER['HTTP_HOST']));
    $subdomain = $url_parts[0];
    if ($subdomain == 'www' || $subdomain == '') {
        // show home page
    } else if ($subdomain == 'help') {
        // show help page
    }

## Sharing sessions between subdomains

Thanks to [albeik](http://community.phpfog.com/discussion/85/sharing-sessions-between-subdomains) for this tip on our [community forums](http://community.phpfog.com)!

If you've enabled wildcard domains and want to share your session data between subdomains, add the following code snippet to your "entry point" PHP file (e.g. index.php):

    ("session.cookie_domain", ".domain.com");

## <a id="rootdomain"></a> Root Domain

If you need to make your root domain (e.g. `yourdomain.com`) canonical, here's how:

#### 1. Redirect your "www." subdomain.

Set up a redirect from `www.yourdomain.com` to `yourdomain.com`, either at your domain host or in your .htaccess configuration. 

#### 2. Create "A" records.

Create three "A" records to: 

    50.19.115.173
    184.72.222.30
    107.22.161.126

Note: make sure to use all three IP addresses for maximum reliability!
