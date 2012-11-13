---
title: Migrating from PHP Fog
weight: 18
---

This document is to help you migrate your app from PHP Fog to AppFog and answers some of the most commonly asked questions about the migration path.

* [Should I migrate my app to AppFog?](#should-i-migrate)
* [But I don’t want to migrate to AppFog!](#dont-want-to-migrate)
* [But AppFog doesn't have Git hosting!](#git-hosting)
* [If I don’t want to migrate to AppFog, is there some way for me to get my app off of PHP Fog so that I can move it to a hosted environment or to a local server?](#backup-my-app)
* [When is PHP Fog going to be discontinued?](#when-discontinued)
* [Are there changes I will need to make in my code to migrate my app?](#code-changes)
* [Are there configuration changes I need to make to migrate?](#configuration-changes)
* [What features of PHP Fog are currently not available in AppFog?](#phpfog-features)
* [My PHP Fog app requires a persistent file system. How do I migrate to AppFog?](#persistent-fs)
* [What PHP frameworks are supported in AppFog?](#php-frameworks)
* [The framework used by my app isn’t supported in AppFog, what do I do?](#unsupported-framework)
* [I need to migrate my database to AppFog, how do I do this?](#migrate-db)
* [My database is larger than 100MB, what do I do?](#large-db)
* [I have a dedicated database on PHP Fog - do you offer this on AppFog?](#dedicated-db)
* [How do I get my uploaded content from PHP Fog?](#uploaded-content)
* [I am seeing errors on my PHP app. Where can I find the error logs to debug?](#php-errors)
* [Can I pay you to migrate things for me?](#migration-service)
* [Are there any guides to move my CMS/Framework?](#guides)

## Should I migrate my app to AppFog? {#should-i-migrate}

Yes! There are many reasons to migrate to AppFog, here are three important ones:

First, AppFog is essentially PHP Fog version 2 and has an expanded feature list beyond what PHP Fog can support, including:

* Support for multiple languages, e.g. Ruby, Java, Node.js, and Python, in addition to PHP.
* You can tunnel to your database service directly (no need for phpMyAdmin).
* AppFog offers native PostgreSQL, MongoDB, Redis, and RabbitMQ services as well as MySQL, for free.
* You can provision multiple services to a single app.

Second, AppFog provides more flexibility and redundancy than PHP Fog by allowing you to deploy to infrastructure providers other than just AWS. AppFog currently supports Rackspace, AWS US East, AWS Ireland, AWS Singapore, and HP Cloud.

Third, PHP Fog is deprecated and the service will soon be discontinued.

## But I don’t want to migrate to AppFog! {#dont-want-to-migrate}

We are incredibly sorry for the inconvenience, but as a small business we do not have the resources to provide world-class service on both PHP Fog and AppFog. If there were some way for us to keep PHP Fog running indefinitely, we would do so. Unfortunately, however, there isn't. It's time to move on to AppFog.

## But AppFog doesn't have Git hosting! {#git-hosting}

That's correct, on AppFog we use a command line tool called "af" to push code changes. It looks like this:

    $ af update <appname>

One of the reasons for this is that not everyone uses Git. This gives developers more flexibility as to which version control system to use. In order to install this tool on UNIX systems including Mac OS X, you can simply run this:

    $ gem install af

After you've installed the gem, you can continue to use Git by following [these instructions](http://blog.appfog.com/553/). 

## If I don’t want to migrate to AppFog, is there some way for me to get my app off of PHP Fog so that I can move it to a hosted environment or to a local server? {#backup-my-app}

There are a number of ways to recover your apps' data. If you're having trouble recovering your data please [open a support ticket](http://support.appfog.com) and we'll help get your data for you.

## When is PHP Fog going to be discontinued? {#when-discontinued}

All Free apps hosted on PHP Fog will be discontinued on December 21, 2012.

All Paid apps hosted on PHP Fog will be discontinued on January 25, 2013.

## Are there changes I will need to make in my code to migrate my app? {#code-changes}

Yes, but they should be minimal.

Database: The way you connect to the database changes slightly. The environment variable that contains the MySQL connection information is slightly different: the `VCAP_SERVICES` environment variable holds all of the connection data. Check out the [full documentation](http://docs.appfog.com/services/mysql): 

Here's a code sample of how to use the `VCAP_SERVICES` environment variable to access your MySQL service:

    $services_json = json_decode(getenv("VCAP_SERVICES"),true);
    $mysql_config = $services_json["mysql-5.1"][0]["credentials"];
    $username = $mysql_config["username"];
    $password = $mysql_config["password"];
    $hostname = $mysql_config["hostname"];
    $port = $mysql_config["port"];
    $db = $mysql_config["name"];
    $link = mysql_connect("$hostname:$port", $username, $password);
    $db_selected = mysql_select_db($db, $link);

## Are there configuration changes I need to make to migrate? {#configuration-changes}

Yes but the amount of work necessary depends on your app. Most will only need a simple database configuration change, but some app migrations may be more involved.

## What features of PHP Fog are currently not available in AppFog? {#phpfog-features}

* AppFog does not support a persistent file system at this time. All uploaded content in AppFog is considered ephemeral, which means it'll be lost after updating or restarting an app (a persistent file system feature is in the works as a top priority for AppFog).
* Setting your app's base directory in console.appfog.com (you can use '.htaccess' instead).
* Dedicated Databases (on the roadmap).
* New Relic Monitoring (on the roadmap).
* AppFog no longer uses Git to deploy apps. The `af` CLI tool replaces Git as the deployment mechanism.

## My PHP Fog app requires a persistent file system. How do I migrate to AppFog? {#persistent-fs}

Note: A persistent file system solution for AppFog is in the works and will be available in the short-term. We are working hard to roll this out to users before we shut down PHP Fog.

For now there are a few steps you can take to work around not having a persistent file system. If your app needs to write configuration files for setup we recommend that you do this on your local machine or other staging environment and push the final code up to AppFog. If you're running a blog, CMS or other web app that accepts live edits or installation of theme packages and plugins you must do this locally as well before uploading or pushing your code.

For apps that accept uploads and for static media we strongly recommend that you store this content on an object storage platform such as Amazon S3 using CloudFront for distribution or Rackspace Cloud Files. This is best practice for a number of reasons including data persistence and performance for your end-users.

## What PHP frameworks are supported in AppFog? {#php-frameworks}

AppFog supports the following PHP frameworks:  

* CakePHP
* Slim Framework
* FuelPHP
* Elefant
* CodeIgniter
* Laravel
* Yii
* and many more

This by no means an exhaustive list and there are many more that will work with AppFog.

## The framework used by my app isn’t supported in AppFog, what do I do? {#unsupported-framework}

If your framework is not supported or you're having difficulty moving your app, [contact support](http://support.appfog.com).

## I need to migrate my database to AppFog, how do I do this? {#migrate-db}

You can migrate your database in a few easy steps.

### 1. Export your existing database from PHP Fog using phpMyAdmin from your app console. 

### 2. Download and install the af gem and caldecott:

    $ gem install af
    $ gem install caldecott

### 3. Create a MySQL service to connect to:

    $ af login 
    $ af create-service

### 4. Connect to your database service:

    $ af import-service <service> <url>
    
* `<service>` is the name of the service you want to import to.
* `<url>` is the url where your db lives.

## My database is larger than 100MB, what do I do? {#large-db}

AppFog’s database services are currently limited to 100MB, however we are working diligently to increase these limits. In the meantime we have add-on partners who can accommodate databases larger than 100MB including ClearDB, MongoHQ, and MongoLab.

## I have a dedicated database on PHP Fog - do you offer this on AppFog? {#dedicated-db}

AppFog does not currently offer dedicated databases.

## How do I get my uploaded content from PHP Fog? {#uploaded-content}

There are many tools to collect your uploaded content. If you need help collecing your uploaded content, please [contact support](http://support.appfog.com).

## I am seeing errors on my PHP app. Where can I find the error logs to debug? {#php-errors}

The `af` CLI tool has built-in functionality to output log files:

    $ af logs <appname>

## Can I pay you to migrate things for me? {#migration-service}

We are not offering migration services at this time.

## Are there any guides to move my CMS/Framework? {#guides}

Absolutely! The general documentation page for PHP is located [here](/languages/php/overview). For specific frameworks Please see the below links:

* [WordPress](/languages/php/wordpress)
* [Drupal](/languages/php/drupal)
* [Custom PHP Apps](/languages/php/overview#custom)
