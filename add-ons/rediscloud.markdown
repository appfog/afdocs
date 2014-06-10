---
title: Redis Cloud
weight: 18
---

## Redis Cloud

### Intro

[Redis Cloud](http://redis-cloud.com) is a fully-managed service for running your Redis dataset. You can quickly and easily get your apps up and running with Redis Cloud on AppFog.

Note: Redis Cloud is currently only available on our AWS US-East infrastructure.

### Why Redis Cloud?

If you need many Redis databases with scalable memory, dedicated processes and daily backups.

### Install Redis Cloud

In the [AppFog console](https://console.appfog.com/), select the application you wish to setup.
Navigate to the “Add-ons” tab and click “Install” for the Redis Cloud add-on.

### Use Redis Cloud

Installing Redis automatically adds an environment variable to your app called `REDISCLOUD_URL` . 
This variable includes the full URI including the hostname, port, username and password or your first Redis Cloud database.

To start using the Redis Cloud add-on learn about the interface with several languages and frameworks supported by AppFog.

* [Ruby](http://redislabs.com/redis-ruby)
* [Java](http://redislabs.com/redis-java)
* [Python](http://redislabs.com/python-redis)
* [Drupal](redislabs.com/drupal-redis)
* [PHP](http://redislabs.com/php-redis)
* [Node.js](http://redislabs.com/node-js-redis)

The Redis Cloud AppFog add-on is in beta phase and is currently offered for free.

### Redis Cloud Dashboard

To access your Redis Cloud dashboard, simply click the "Manage" button of the Redis Cloud add-on in the "Add-ons" tab on your app [console](https://console.appfog.com/).

You can then find your dashboard under the `MY DATABASES` menu.

#### Adding Redis databases to your app  

To add more databases, simply access your Redis Cloud add-on by clicking the "Manage" button and then click the `New DB` button in the `MY DATABASES > Manage` page. 

Warning: The Redis Cloud console will provide you a new URL for connecting to your new Redis database.

### Included Allotment

1 database
25 MB database storage
10 conncetions

### Additional resources

* [Redis Cloud Developers Resources](http://redis-cloud.com/redis/developers)
* [Redis Documentation](http://redis.io/documentation)
