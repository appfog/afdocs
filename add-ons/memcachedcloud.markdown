---
title: Memcached Cloud
weight: 9
---
[Memcached Cloud](http://garantiadata.com/memcached) is a fully-managed service that operates your Memcached in a reliable and fail-safe manner. Your dataset is constantly replicated, so if a node fails, an automatic failover mechanism guarantees that your data is served without interruption. Memcached Cloud provides various data persistence options as well as remote backups for disaster recovery purposes. You can quickly and easily get your apps up and running with Memcached Cloud through its add-on for AppFog, just tell us how much memory you need and start using your Memcached bucket instantly.
 
A Memcached bucket is created in seconds and from that moment on, all operations are fully automated. The service completely frees developers from dealing with nodes, clusters, server lists, scaling and failure recovery, while guaranteeing absolutely no data loss.

## Getting Started
In the "Add-ons" tab on your app console click "Install" for the `Memcached Cloud` add-on. That’s it!

Once `Memcached Cloud` has been added, you will notice three new enironment variables: 
`MEMCACHEDCLOUD_SERVERS`, `MEMCACHEDCLOUD_USERNAME`, `MEMCACHEDCLOUD_PASSWORD` 
in the `Env variables` tab on your app console, containing the servers and credentials of your first `Memcached Cloud` bucket.
    
Next, setup your app to start using the Memcached Cloud add-on. In the following sections we have documented the interfaces with several languages and frameworks supported by AppFog.

* [Ruby](#ruby)
* [Rails](#rails)
* [Sinatra](#sinatra)
* [Unicorn](#unicorn)
* [Java](#java)
* [Python](#python)
* [Django](#django)
* [PHP](#php)

## <a id="ruby"></a>Using Memcached with Ruby
[Dalli](https://github.com/mperham/dalli) is a high performance, pure Ruby client for accessing Memcached servers that uses  binary protocol.

### <a id="rails"></a>Configuring Memcached on Rails
To use Dalli with Rails 3.x, update your gems with:
    
  	:::ruby
	gem 'dalli'  
	
And then install the gem via Bundler:
	
	:::ruby
	bundle install

Lastly, add the following line in your `config/environments/production.rb`:
	
		:::ruby	
    	config.cache_store = :dalli_store, ENV[MEMCACHEDCLOUD_SERVERS].split(','), { :username => ENV[MEMCACHEDCLOUD_USERNAME], :password => ENV[MEMCACHEDCLOUD_PASSWORD] }

### <a id="sinatra"></a>Configuring Memcached on Sinatra
Add this code snippet to your configure block:
	
	:::ruby
	configure do
        . . .
		require 'dalli'
		
    	$cache = Dalli::Client.new(ENV[MEMCACHEDCLOUD_SERVERS].split(','), :username => ENV[MEMCACHEDCLOUD_USERNAME], :password => ENV[MEMCACHEDCLOUD_PASSWORD])
        . . .
	end

### <a id="unicorn"></a>Using Memcached on Unicorn
No special setup is required when using Memcached Cloud with a Unicorn server.
Users running Rails apps on Unicorn should follow the instructions in the [Configuring Memcached from Rails](#rails) section and users running Sinatra apps on Unicorn should follow the instructions in the [Configuring Memcached on Sinatra](#sinatra) section.

### Testing from Ruby

	:::ruby
	$cache.set("foo", "bar")
	# => true
	$cache.get("foo")
	# => "bar"
	
## Using Memcached with Java
[spymemcached](https://code.google.com/p/spymemcached/) is a simple, asynchronous, single-threaded Memcached client written in Java. You can download the latest build from: https://code.google.com/p/spymemcached/downloads/list.
If you are using `Maven`, start by adding the following repository:
	
	:::java
	<repositories>
	    <repository>
	      <id>spy</id>
	      <name>Spy Repository</name>
	      <layout>default</layout>
	      <url>http://files.couchbase.com/maven2/</url>
	      <snapshots>
	        <enabled>false</enabled>
	      </snapshots>
	    </repository>
	</repositories>

Next, specify the actual artifact as follows: 
	
	:::java
	<dependency>
	  <groupId>spy</groupId>
	  <artifactId>spymemcached</artifactId>
	  <version>2.8.9</version>
	  <scope>provided</scope>
	</dependency>

Configure the connection to your Memcached Cloud service by using the `MEMCACHEDCLOUD` `Env variables` as shown in the following code snippet:
	
	:::java
	try {			
		AuthDescriptor ad = new AuthDescriptor(new String[] { "PLAIN" },
			new PlainCallbackHandler(System.getenv("MEMCACHEDCLOUD_USERNAME"), System.getenv("MEMCACHEDCLOUD_PASSWORD")));
						
		MemcachedClient mc = new MemcachedClient(
		          new ConnectionFactoryBuilder()
			          .setProtocol(ConnectionFactoryBuilder.Protocol.BINARY)
			          .setAuthDescriptor(ad).build(),
			  AddrUtil.getAddresses(System.getenv("MEMCACHEDCLOUD_SERVERS")));
			
	} catch (IOException ex) {
		// the Memcached client could not be initialized. 
	} 
	
### Testing from Java
	
	:::java
	mc.set("foo", 0, "bar");
	Object value = mc.get("foo");

## <a id="python"></a>Using Memcached with Python
[bmemcached](https://github.com/jaysonsantos/python-binary-memcached) is a pure, thread safe, python module to access memcached via binary protocol.
 
Use `pip` to install it:
 	
 	:::term
	pip install python-binary-memcached

Configure the connection to your Memcached Cloud service using the `MEMCACHEDCLOUD``Env variables` and the following code snippet:
	
	:::python
	import os
	import urlparse
	import bmemcached
	import json
	
	mc = bmemcached.Client(os.environ.get('MEMCACHEDCLOUD_URL').split(','), os.environ.get('MEMCACHEDCLOUD_USERNAME'), os.environ.get('MEMCACHEDCLOUD_PASSWORD'))
	
### Testing from Python
	
	:::python
	mc.set('foo', 'bar')
	print client.get('foo')

### <a id="django"></a>Using Memcached with Django
Memcached Cloud can be used as a Django cache backend with [django-bmemcached](https://github.com/jaysonsantos/django-bmemcached). 

To do so, install django-bmemcached:
 	
 	:::term
	pip install django-bmemcached

Next, configure your `CACHES` in the `settings.py` file:
	
	:::python
	import os
	import urlparse
	import json
	
	CACHES = {
		'default': {
			'BACKEND': 'django_bmemcached.memcached.BMemcached',
			'LOCATION': os.environ.get('MEMCACHEDCLOUD_URL').split(','),
			'OPTIONS': {
            			'username': os.environ.get('MEMCACHEDCLOUD_USERNAME'),
            			'password': os.environ.get('MEMCACHEDCLOUD_PASSWORD')
		        }
	  	}
	}

### Testing from Django
	
	:::python
	from django.core.cache import cache
	cache.set("foo", "bar")
	print cache.get("foo")
	
## <a id="php"></a>Using Memcached with PHP
[PHPMemcacheSASL](https://github.com/ronnywang/PHPMemcacheSASL) is a simple PHP class with SASL support.

Include the class in your project and configure a connection to your Memcached Cloud service using the `MEMCACHEDCLOUD``Env variables` and the following code snippet:
	
	<?php
	include('MemcacheSASL.php');
	
	$mc = new MemcacheSASL;
	list($host, $port) = explode(':', $_ENV['MEMCACHEDCLOUD_SERVERS']);
	$mc->addServer($host, $port);
	$mc->setSaslAuthData($_ENV['MEMCACHEDCLOUD_USERNAME'], $_ENV['MEMCACHEDCLOUD_PASSWORD']);
	
### Testing from PHP

	$mc->add("foo", "bar");
	echo $mc->get("foo");

## Memcached Cloud Dashboard
Our dashboard displays all of the performance and usage metrics for your Memcached Cloud service on a single screen, as shown in the following screenshot:

![Dashboard](https://s3.amazonaws.com/memcached-cloud-docs/appfog+Memcached+Logo.JPG)

To access your Memcached Cloud dashboard, simply click the "Manage" button of your Memcached Cloud add-on in the "Add-ons" tab on your app console.

You can then find your dashboard under the `MY BUCKETS` menu.

## Pricing
The Memcached Cloud AppFog add-on is in beta phase and is currently offered for free.

## Adding Memcached Buckets to Your Plan  
Memcached Cloud allows you to add multiple Memcached buckets to your plan, each running in a dedicated process and in a non-blocking manner (i.e. without interfering with your other buckets). You can create as many buckets as you need.

Your first Memcached bucket is provisioned automatically upon launching the Memcached Cloud add-on. Its servers and credentials are maintained with the `MEMCACHEDCLOUD` env. vars. To add more buckets, simply access your Memcached Cloud console and click the `Add Bucket` button in the `MY BUCKETS > Manage` page. 

Your new Memcached bucket's server and credentials will be displayed in the Memcached Cloud console.

## Support
All Memcached Cloud support and runtime issues should be submitted to [support@appfog.com](support@appfog.com). 
Any non-support related issues or product feedback is welcome via email at [support@garantiadata.com](support@garantiadata.com).

## Additional Resources

* [Developers Resources](http://garantiadata.com/memcached/developers)
* [Memcached Wiki](https://code.google.com/p/memcached/wiki/NewStart)