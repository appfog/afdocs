---
MemCachier
---

### Intro

[MemCachier](http://www.memcachier.com/) is an implementation of the [Memcache](http://memcached.org/) in-memory key/value store used for caching data. This provides scalable memcache to speed up and stabilize your app.
It is a key technology in modern web apps for scaling and reducing server loads.

### Why user MemCachier

* Less failure impact: your cache is spread across many servers. When one of those servers goes down, you’ll only lose a small percentage of your cache and hence only see a small increase in cache misses.
* Easier growth: our architecture allows us to increase your cache size without impacting your hit rate.
* Low latency: we have the same low latency you'd expect from any memcache provider.
* Great support: support is a top priority for us -- we're always available to answer questions promptly.

### Install MemCachier

In the [AppFog console](https://console.appfog.com/), select the application you wish to setup.
Navigate to the “Add-ons” tab and click “Install” for the Memcachier add-on.

To test your AppFog app locally, you will need to install memcached.
* [Local Setup](https://www.memcachier.com/documentation/memcache-user-guide/#local)

### Use MemCachier

Once Memcached Cloud has been added, three new enironment variables are created: `MEMCACHIER_SERVERS` , `MEMCACHIER_USERNAME` , `MEMCACHIER_PASSWORD` . In the Env variables tab on your app console, contain the servers and credentials of your first Memcachier account.

To set up your app to start using the cache, check the documentation for the following languages and frameworks: 

* [Ruby](https://www.memcachier.com/documentation/memcache-user-guide/#ruby)
* [Rails](https://www.memcachier.com/documentation/memcache-user-guide/#rails3)
* [Django](https://www.memcachier.com/documentation/memcache-user-guide/#django)
* [PHP](https://www.memcachier.com/documentation/memcache-user-guide/#php)
* [Java](https://www.memcachier.com/documentation/memcache-user-guide/#java)
* [Node.js](https://www.memcachier.com/documentation/memcache-user-guide/#node.js)

### MemCachier Console

From the Add-ons page in the [AppFog console](https://console.appfog.com/), under MemCachier, click “Manage”, this will direct you to the MemCachier management console.

### Additional Resources

* [Memcached Documentation](http://code.google.com/p/memcached/wiki/NewStart)
* [MemCachier Documentation](https://www.memcachier.com/documentation)
* [User Guide](http://www.memcachier.com/documentation/memcache-user-guide/).

