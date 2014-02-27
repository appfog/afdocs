---
title: Redis Cloud
weight: 20
---

## Redis Cloud

[Redis Cloud](http://redislabs.com/redis-cloud) is a fully-managed service for running your Redis dataset. You can quickly and easily get your apps up and running with Redis Cloud through its add-on for AppFog.
You can then add as many Redis databases as you need (each running in a dedicated process, in a non-blocking manner) and increase or decrease the memory size of your plan without affecting your existing data. You can easily import an existing dataset to any of your Redis Cloud databases, from your AWS S3 account or from any other Redis server. Daily backups are performed automatically and in addition, you can backup your dataset manually at any given time.


## Install Redis Cloud

In the Add-ons tab on your app console click Install for the Redis Cloud add-on. Thatâ€™s it!

Once Redis Cloud has been added, you will notice a new enironment variable: `REDISCLOUD_URL` in the `Env variables` tab on your app console, containing the username, password, hostname and port of your first Redis Cloud database.

<p class="note"> Note: as database provisioning is carried out asynchronously, please wait until the creation and initialization of the database is complete. This process shouldn't take more than 60 seconds. You are ready to go when the "hostname" value in the `REDISCLOUD_URL` environment variable is different than your "localhost".</p>

Next, setup your app to start using the Redis Cloud add-on. In the following sections we have documented the interfaces with several languages and frameworks supported by AppFog.

* [Ruby](#ruby)
* [Rails](#rails)
* [Sinatra](#sinatra)
* [Java](#java)
* [Python](#python)
* [Django](#django)
* [PHP](#php)
* [Node.js](#node)


## <a id="ruby"></a>Using Redis from Ruby
The [redis-rb](https://github.com/redis/redis-rb) is a very stable and mature redis client and the easiest way to access Redis from Ruby. 

Install redis-rb:
	
	:::term
	sudo gem install redis

### <a id="rails"></a>Configuring Redis from Rails

For Rails 2.3.3 up to Rails 3.0, update the `config/environment.rb` to include the redis gem:
	
	:::ruby
	config.gem 'redis' 

For Rails 3.0 and above, update the Gemfile:
	
	:::ruby
	gem 'redis'  
	
And then install the gem via Bundler:

	:::term
	bundle install

Lastly, create a new `redis.rb` initializer in `config/initializers/` and add the following code snippet: 
	
	:::ruby
	uri = URI.parse(ENV["REDISCLOUD_URL"])
    $redis = Redis.new(:host => uri.host, :port => uri.port, :password => uri.password)

### <a id="sinatra"></a>Configuring Redis on Sinatra

Add this code snippet to your configure block:

	:::ruby
	configure do
        . . .
		require 'redis'
		uri = URI.parse(ENV["REDISCLOUD_URL"])
		REDIS = Redis.new(:host => uri.host, :port => uri.port, :password => uri.password)
        . . .
	end

### <a id="java"></a>Using Redis on Unicorn

No special setup is required when using Redis Cloud with a Unicorn server.
Users running Rails apps on Unicorn should follow the instructions in the [Configuring Redis from Rails](#rails) section and users running Sinatra apps on Unicorn should follow the instructions in the [Configuring Redis on Sinatra](#sinatra) section.

### Testing (Ruby)
	
	:::ruby
	redis.set("foo", "bar")
	# => "OK"
	redis.get("foo")
	# => "bar"
	
## Using Redis from Java

[Jedis](https://github.com/xetorthio/jedis) is a blazingly small, sane and easy to use Redis java client. You can download the latest build from [github](http://github.com/xetorthio/jedis/downloads)
or use it as a maven dependency:

	:::java
	<dependency>
		<groupId>redis.clients</groupId>
		<artifactId>jedis</artifactId>
		<version>2.0.0</version>
		<type>jar</type>
		<scope>compile</scope>
	</dependency>

Configure connection to your Redis Cloud service using `REDISCLOUD_URL` environment variable and the following code snippet:

	:::java
	try { 
			URI redisUri = new URI(System.getenv("REDISCLOUD_URL"));
			JedisPool pool = new JedisPool(new JedisPoolConfig(),
		    		redisUri.getHost(),
		    		redisUri.getPort(),
		    		Protocol.DEFAULT_TIMEOUT,
		    		redisUri.getUserInfo().split(":",2)[1]);
	} catch (URISyntaxException e) {
	   	    // URI couldn't be parsed.		   
	} 
	
### Testing (Java)

	:::java
	Jedis jedis = pool.getResource();
	jedis.set("foo", "bar");
	String value = jedis.get("foo");
	// return the instance to the pool when you're done
	pool.returnResource(jedis);

(example taken from Jedis docs).

## <a id="python"></a>Using Redis from Python

[redis-py](https://github.com/andymccurdy/redis-py) is the most common client to access Redis from Python.
 
Use pip to install it:
 
	:::term
	sudo pip install redis

Configure connection to your Redis-Cloud service using `REDISCLOUD_URL` environment variable and the following code snippet:
	
	:::python
	import os
	import urlparse
	import redis
	url = urlparse.urlparse(os.environ.get('REDISCLOUD_URL'))
	r = redis.Redis(host=url.hostname, port=url.port, password=url.password)
	
	
### Testing (Python):
	
	:::python
	>>> r.set('foo', 'bar')
	True
	>>> r.get('foo')
	'bar'

### <a id="django"></a>[Django-redis-cache](https://github.com/sebleier/django-redis-cache) 

Redis can be used as the back-end cache for Django.

To do so, install django-redis-cache:
 
	:::term
	pip install django-redis-cache

Next, configure your `CACHES` in the `settings.py` file:

	:::python
	import os
	import urlparse
	redis_url = urlparse.urlparse(os.environ.get('REDISCLOUD_URL'))
	CACHES = {
		'default': {
		'BACKEND': 'redis_cache.RedisCache',
		'LOCATION': '%s:%s' % (redis_url.hostname, redis_url.port),
		'OPTIONS': {
            'PASSWORD': redis_url.password,
			'DB': 0,
        }
	  }
	}

### Testing (Django)

	:::python
	from django.core.cache import cache
	cache.set("foo", "bar")
	print cache.get("foo")
	
## <a id="php"></a>Using Redis from PHP

[Predis](https://github.com/nrk/predis) is a flexible and feature-complete PHP client library for Redis.

Instructions for installing the [Predis](https://github.com/nrk/predis) library can be found [here](https://github.com/nrk/predis#how-to-use-predis).

Loading the library to your project should be straightforward:

	:::javascript
	<?php
	// prepend a base path if Predis is not present in your "include_path".
	require 'Predis/Autoloader.php';
	Predis\Autoloader::register();
	
Configure connection to your Redis Cloud service using `REDISCLOUD_URL` environment variable and the following code snippet:
	
	:::javascript
	$redis = new Predis\Client(array(
		'host' => parse_url($_ENV['REDISCLOUD_URL'], PHP_URL_HOST), 
		'port' => parse_url($_ENV['REDISCLOUD_URL'], PHP_URL_PORT),
		'password' => parse_url($_ENV['REDISCLOUD_URL'], PHP_URL_PASS), 
	));
	
### Testing (PHP)

	:::javascript
	$redis->set('foo', 'bar');
	$value = $redis->get('foo');
	
## <a id="node"></a>Using Redis from Node.js

[node_redis](https://github.com/mranney/node_redis) is a complete Redis client for node.js. 

You can install it with:

	:::term
	npm install redis

Configure connection to your Redis-Cloud service using `REDISCLOUD_URL` environment variable and the following code snippet:

	:::javascript
	var redis = require('redis');
	var url = require('url');
	var redisURL = url.parse(process.env.REDISCLOUD_URL);
	var client = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true});
	client.auth(redisURL.auth.split(":")[1]);

	
###Testing (Node.js)

	:::javascript
	client.set('foo', 'bar');
	client.get('foo', function (err, reply) {
        console.log(reply.toString()); // Will print `bar`
    });
	
## Dashboard

Our dashboard presents all performance and usage metrics of your Redis Cloud service on a single screen, as shown below:

![Dashboard](https://s3.amazonaws.com/paas-docs/redis-cloud/appFog+-+redis.png)

To access your Redis Cloud dashboard, simply click the â€œManageâ€ button of the RedisCloud add-on in the â€œAdd-onsâ€ tab on your app console.

You can then find your dashboard under the `MY DATABASES` menu.

## Adding Redis databases to your app  

Redis Cloud allows you to add multiple Redis databases, each running in a dedicated process, in a non-blocking manner (i.e. without interfering with your other databases). You can create as many databases as you need.

Your first Redis database is created automatically upon launching the Redis Cloud add-on and its URL and credentials are maintained in `REDISCLOUD_URL` environment variable. 

To add more databases, simply access your Redis Cloud add-on by clicking the "Manage" button and then click the `New DB` button in the `MY DATABASES > Manage` page. 

<p class="warning" markdown="1">
The Redis Cloud console will provide you a new URL for connecting to your new Redis database.
</p>

## Pricing
The Redis Cloud AppFog add-on is in beta phase and is currently offered for free.
## Support

All Redis Cloud support and runtime issues should be submitted to support@appfog.com.
Any non-support related issues or product feedback is welcome via email at service@redislabs.com.

## Additional resources

* [Developers Resources](http://redislabs.com/php-redis)
* [Redis Documentation](http://redis.io/documentation)
