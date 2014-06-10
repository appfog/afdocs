---
title: Memcached Cloud
weight: 13
---

## Memcached Cloud

### Intro

[Memcached Cloud](http://redislabs.com/memcached-cloud) is a fully-managed service that operates your Memcached in a reliable and fail-safe manner. Your dataset is constantly replicated, so if a node fails, an automatic failover mechanism guarantees that your data is served without interruption. Memcached Cloud provides various data persistence options as well as remote backups for disaster recovery purposes. You can quickly and easily get your apps up and running with Memcached Cloud through its add-on for AppFog, just tell us how much memory you need and start using your Memcached bucket instantly.
A Memcached bucket is created in seconds and from that moment on, all operations are fully automated. The service completely frees developers from dealing with nodes, clusters, server lists, scaling and failure recovery, while guaranteeing absolutely no data loss.

### Why use Memcached Cloud

If you need to more speed to your application and reduce the calls to your database, Memcached Cloud can help.

### Install Memcached Cloud?

In the [AppFog console](https://console.appfog.com/), select the application you wish to setup.
Navigate to the “Add-ons” tab and click “Install” for the Memcached Cloud add-on.

To test your AppFog app locally, you will need to install memcached.

### Use Memcached Cloud

Once `Memcached Cloud` has been added, you will notice three new enironment variables: 
`MEMCACHEDCLOUD_SERVERS`, `MEMCACHEDCLOUD_USERNAME`, `MEMCACHEDCLOUD_PASSWORD` 
in the `Env variables` tab on your app console, containing the servers and credentials of your first `Memcached Cloud` bucket.

Memcached Cloud allows you to add multiple Memcached buckets to your plan, each running in a dedicated process and in a non-blocking manner (i.e. without interfering with your other buckets). You can create as many buckets as you need.

The Memcached Cloud AppFog add-on is in beta phase and is currently offered for free.
    
Next, setup your app to start using the Memcached Cloud add-on. In the following sections are documented the interfaces with several languages and frameworks supported by AppFog.

* [Rails](http://redislabs.com/rails-memcached)
* [Java](http://redislabs.com/memcached-java)
* [Python](http://redislabs.com/python-memcached)
* [Django](http://redislabs.com/drupal-memcached)
* [PHP](http://redislabs.com/php-memcached)
* [Drupal](http://redislabs.com/drupal-memcached)
* [WordPress](http://redislabs.com/wordpress-memcached)
* [Node.js](http://redislabs.com/node-js-memcached)


### Memcached Cloud Dashboard

You can take a look at your Memcached Cloud Dashboard by going to your app in the [AppFog console](https://console.appfog.com/) Add-ons tab, and click “Manage”.

### Included Allotment

25 MB cache size
1 dedicated database
10 concurrent connections

### Additional Resources

* [Memcached Cloud Documentation](http://redislabs.com/memcached-cloud)
* [Memcached Documentation](http://code.google.com/p/memcached/wiki/NewStart)
* [Memcached Wiki](https://code.google.com/p/memcached/wiki/NewStart)
