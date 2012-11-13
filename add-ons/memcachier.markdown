---
title: MemCachier
layout: doc-page
weight: 17
---

[MemCachier](http://www.memcachier.com/) is an implementation of the [Memcache](http://memcached.org/) in-memory key/value store used for caching data. It is a key technology in modern web apps for scaling and reducing server loads. The MemCachier add-on manages and scales clusters of memcache servers so you can focus on your app. Tell us how much memory you need and get started for free instantly. Add capacity later as you need it.

The information below will quickly get you up and running with the MemCachier add-on for AppFog. For information on the benefits of MemCachier and how it works, please refer to the more extensive [User Guide](http://www.memcachier.com/documentation/memcache-user-guide/).

### Install MemCachier

In the “Add-ons” tab in your app console click “Install” for the MemCachier add-on. That’s it!

Next, set up your app to start using the cache. We have documentation for the following languages and frameworks: 

* [Ruby](#ruby)
* [Rails](#rails)
* [Django](#django)
* [PHP](#php)
* [Java](#java)
* [Local Setup](#local)
* [Upgrading and Downgrading](#upgrade)
* [Support](#support)

Your credentials may take up to three (3) minutes to be synced to our servers. You may see authentication errors if you start using the cache immediately.

# Ruby {#ruby}

Start by adding the [memcachier](https://github.com/memcachier/memcachier-gem) and [dalli](http://github.com/mperham/dalli) gems to your `Gemfile`.

    gem 'memcachier'
    gem 'dalli'

Then bundle install:

    $ bundle install

`Dalli` is a Ruby memcache client, and the `memcachier` gem modifies the environment (`ENV`) such that the environment variables set by MemCachier will work with Dalli. Once these gems are installed you can start writing code. The following is a basic example showing get and set.

    require 'dalli'
    require 'memcachier'
    cache = Dalli::Client.new
    cache.set("foo", "bar")
    puts cache.get("foo")

Without the `memcachier` gem, you’ll need to pass the proper credentials to `Dalli`:

    cache = Dalli::Client.new(ENV["MEMCACHIER_SERVERS"].split(","),
                        {:username => ENV["MEMCACHIER_USERNAME"],
                         :password => ENV["MEMCACHIER_PASSWORD"]})

# Rails {#rails}

Start by adding the [memcachier](https://github.com/memcachier/memcachier-gem) and [dalli](http://github.com/mperham/dalli) gems to your `Gemfile`.

    gem 'memcachier'
    gem 'dalli'

Then bundle install:

    $ bundle install

`Dalli` is a Ruby memcache client, and the `memcachier` gem modifies the environment (`ENV`) such that the environment variables set by MemCachier will work with `Dalli`. Once these gems are installed you’ll want to configure the Rails `cache_store` appropriately. Modify `config/environments/production.rb` with the following:

    config.cache_store = :dalli_store

From here you can use the following code examples to use the cache in your Rails app:

    Rails.cache.write("foo", "bar")
    puts Rails.cache.read("foo")

Without the `memcachier` gem, you’ll need to pass the proper credentials to `Dalli` in `config/environments/production.rb`:

    config.cache_store = :dalli_store, ENV["MEMCACHIER_SERVERS"].split(","),
                        {:username => ENV["MEMCACHIER_USERNAME"],
                         :password => ENV["MEMCACHIER_PASSWORD"]}

### Testing

To test locally you can simply use the rails console:

    rails console
    >> Rails.cache.write('memcachier', 'rocks')
    => true
    >> Rails.cache.read('memcachier')
    => "rocks"

# Django {#django}

MemCachier has been tested with the `pylibmc` memcache client, but the default client doesn’t support SASL authentication. Run the following commands on your local machine to install the necessary pips:

    $ sudo port install libmemcached
    $ LIBMEMCACHED=/opt/local pip install pylibmc
    $ pip install django-pylibmc-sasl

Be sure to update your `requirements.txt` file with these new requirements (note that your versions may differ from what’s below):

    pylibmc==1.2.2
    django-pylibmc-sasl==0.2.4

Next, configure your `settings.py` file the following way:

    os.environ['MEMCACHE_SERVERS'] = os.environ.get('MEMCACHIER_SERVERS', '')
    os.environ['MEMCACHE_USERNAME'] = os.environ.get('MEMCACHIER_USERNAME', '')
    os.environ['MEMCACHE_PASSWORD'] = os.environ.get('MEMCACHIER_PASSWORD', '')

    CACHES = {
      'default': {
        'BACKEND': 'django_pylibmc.memcached.PyLibMCCache',
        'LOCATION': os.environ.get('MEMCACHIER_SERVERS', ''),
        'TIMEOUT': 500,
        'BINARY': True,
      }
    }

From here you can start writing cache code in your Django app:

    from django.core.cache import cache
    cache.set("foo", "bar")
    print cache.get("foo")

# PHP {#php}

Start by downloading the [PHPMemcacheSASL](https://github.com/ronnywang/PHPMemcacheSASL) library. From here you can start writing cache code in your PHP app:

    include('MemcacheSASL.php');
    $server_pieces = explode(':', getenv("MEMCACHIER_SERVERS"))
    $m = new MemcacheSASL;
    $m->addServer($server_pieces[0], $server_pieces[1]);
    $m->setSaslAuthData(getenv("MEMCACHIER_USERNAME"), getenv("MEMCACHIER_PASSWORD"));

    $m->add("foo", "bar");
    echo $m->get("foo");

Or, check out [this fork of PHPMemcacheSASL](https://github.com/ceslami/PHPMemcacheSASL) modified specifically for use with AppFog, by AppFog user [ceslami](https://github.com/ceslami).

The more common PHP memcache clients, [Memcache](http://www.php.net/manual/en/book.memcache.php) and [Memcached](http://www.php.net/manual/en/book.memcached.php), don’t support SASL authentication at this time and can’t be used with MemCachier.

# Java {#java}

For Java we recommend using the [SpyMemcached](https://code.google.com/p/spymemcached/) client. We also recommend using the [Apache Maven](https://maven.apache.org/) build manager for working with Java app. If you aren’t using `maven` and are instead using [Apache Ant](https://ant.apache.org/) or your own build system, then simply add the `spymemcached` jar file as a dependency of your app.

For `maven` however, start by configuring it to have the proper `spymemcached` repository:

    <repository>
      <id>spy</id>
      <name>Spy Repository</name>
      <layout>default</layout>
      <url>http://files.couchbase.com/maven2/</url>
      <snapshots>
        <enabled>false</enabled>
      </snapshots>
    </repository>

Then add the `spymemcached` library to your dependencies:

    <dependency>
      <groupId>spy</groupId>
      <artifactId>spymemcached</artifactId>
      <version>2.8.1</version>
      <scope>provided</scope>
    </dependency>

Once your build system is configured, you can start adding caching to your Java app:

    import java.io.IOException;
    import net.spy.memcached.AddrUtil;
    import net.spy.memcached.MemcachedClient;
    import net.spy.memcached.ConnectionFactoryBuilder;
    import net.spy.memcached.auth.PlainCallbackHandler;
    import net.spy.memcached.auth.AuthDescriptor;

    public class Foo {
      public static void main(String[] args) {
        AuthDescriptor ad = new AuthDescriptor(new String[] { "PLAIN" },
            new PlainCallbackHandler(System.getenv("MEMCACHIER_USERNAME"),
                System.getenv("MEMCACHIER_PASSWORD")));

        try {
          MemcachedClient mc = new MemcachedClient(new ConnectionFactoryBuilder()
              .setProtocol(ConnectionFactoryBuilder.Protocol.BINARY)
              .setAuthDescriptor(ad).build(), AddrUtil.getAddresses(System
              .getenv("MEMCACHIER_SERVERS") + ":11211"));
          mc.set("foo", "bar");
          System.out.println(mc.get("foo"));
        } catch (IOException ioe) {
          System.err.println("Couldn't create a connection to MemCachier: \nIOException "
                  + ioe.getMessage());
        }
      }
    }

You may wish to look the `spymemcached` [JavaDocs](http://dustin.github.com/java-memcached-client/apidocs/) or some more [example code](https://code.google.com/p/spymemcached/wiki/Examples) to help in using MemCachier effectively.

# Library Support {#libsupport}

MemCachier will work with any memcached binding that supports [SASL authentication](https://en.wikipedia.org/wiki/Simple_Authentication_and_Security_Layer) and the [binary protocol](https://code.google.com/p/memcached/wiki/MemcacheBinaryProtocol). We have tested MemCachier with the following language bindings, although the chances are good that other SASL binary protocol packages will also work.

<table class="table table-bordered table-striped">
<thead>
<tr>
    <td>Language</td><td>Bindings</td>
</tr>
</thead>
<tbody>
<tr>
    <td>Ruby</td>                                <td>dalli</td>
</tr>
<tr>
    <td>Python</td>                                <td>pylibmc</td>
</tr>
<tr>
    <td>Django</td>                                <td>django-pylibmc</td>
</tr>
<tr>
    <td>PHP</td>                                <td>PHPMemcacheSASL</td>
</tr>
<tr>
    <td>Java</td>                                <td>spymemcached</td>
</tr>
</tbody>
</table>

# Local Setup {#local}

To test against your AppFog app locally, you'll need to run a local memcached process. MemCachier can only run in AppFog. But because MemCachier and memcached speak the same protocol, you shouldn’t have any issues testing locally. Installation depends on your platform.

### Ubuntu

    $ sudo apt-get install memcached

### Mac OS X (with Homebrew)

    $ brew install memcached

### Windows

Please refer to [these instructions](http://www.codeforest.net/how-to-install-memcached-on-windows-machine).

For further information and resources (such as the memcached source code) please refer to the [Memcache.org homepage](http://memcached.org/).

To run memcached simply execute the following command:

    $ memcached -v

# Upgrading and Downgrading {#upgrade}

Changing your plan, either by upgrading or downgrading, requires no code changes. Your cache won’t be lost, either. Upgrading and downgrading Just Works&trade;.

# Support {#support}

You can submit all Memcachier support and runtime issues to [support@appfog.com](mailto:support@appfog.com) and any non-support related issues or product feedback to [support@memcachier.com](mailto:support@memcachier.com).

Memcachier reports issues related to service at [Memcachier Status](http://status.memcachier.com/).
