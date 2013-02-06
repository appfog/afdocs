---
title: Rails
weight: 1
---

* [Rails 3.0](#rails30)
* [Rails 3.1](#rails31)
* [Rails Console](#rails-console)
* [rake db:seed](#rake-db-seed)
* [Auto-reconfiguration](#autoreconfig)

AppFog currently only offers one app server for Rails apps: Thin. If you're using Bundler, and nothing in your app's bundle requires Thin, VCAP cannot safely start your app using it. For Rails in such cases, it will fall back to running your app using '`rails server`', which uses WEBrick. For best performance and results, use Thin.

## Rails 3.0 {#rails30}

Ruby on Rails app deployments on AppFog automatically recognize MySQL. For other services, you'll need to access the `VCAP_SERVICES` environment variable. More on that in our [Services doc](/services).

Make sure to use the correct version of the MySQL2 gem in your Gemfile:

    # If you use a different database in development, hide it from AppFog
    group :development do
    gem 'sqlite3'
    end
    
    # Rails 3.0 requires version less than 0.3 of mysql2 gem
    group :production do
    gem 'mysql2', '< 0.3'
    end

### Bundle your app:

    $ bundle package
    $ bundle install

Deploy:

    $ af push

## Rails 3.1 {#rails31}

Rails 3.1 introduces the asset pipeline. To get the asset pipeline working on AppFog, precompile your assets in your development environment. This compiles them into `public/assets`, at which point you can tweak the production environment configuration before excuting a normal `af push`.

### Gemfile

    # If you use a different database in development, hide it from AppFog.
    group :development do
    gem 'sqlite3'
    end
    
    # Rails 3.1 can use the latest mysql2 gem.
    group :production do
    gem 'mysql2'
    end
    
### Bundle your app:

    $ bundle package
    $ bundle install

### Configs

In `config/environments/production.rb`, change

    config.server_static_assets = false

to

    config.server_static_assets = true

### Assets

Pre-compile your asset pipeline:

    $ bundle exec rake assets:precompile

### Version Control System

Commit the current configuration to your version control system. Consider including: + `Gemfile.lock` + gems packaged into `vendor/cache` + assets compiled into `public/assets`.

### Deploy

    $ af push

## Services

AppFog automatically creates and binds a new MySQL service with the Ruby on Rails jumpstart, and the app is [automatically reconfigured](#autoreconfig) to connect to the service. For more information on services and how to connect to them manually, check out our docs on [Services](/services/overview).

## Rails Console {#rails-console}

To use the Rails console with your database service, [tunnel into the service](/services/tunneling), and choose 'none' when it asks you which client to start:

	$ af tunnel ror-example-mysql
	Binding Service [ror-example-mysql]: OK
	Stopping Application 'caldecott-aws': OK
	Staging Application 'caldecott-aws': OK
	Starting Application 'caldecott-aws': OK
	Getting tunnel connection info: OK

	Service connection info:
	  username : uKaJETLlNmkrs
	  password : pYfnUUY3L5jLU
	  name     : d77261f24bbae4c889d0a231b3e70a763
	  infra    : aws

	Starting tunnel to ror-example-mysql on port 10000.
	1: none
	2: mysql
	3: mysqldump
	Which client would you like to start?: 1
	Open another shell to run command-line clients or
	use a UI tool to connect using the displayed information.
	Press Ctrl-C to exit...

Next, create another database section in your `config/database.yml` file with the service connection info in the `af tunnel` output:

	proxied-appfog: 
	adapter: mysql2 
	database : d77261f24bbae4c889d0a231b3e70a763
	username : uKaJETLlNmkrs
	password : pYfnUUY3L5jLU
	port: 10000 
	host: 127.0.0.1

Finally, in a another terminal, run `rails console`, passing in the database environment you created:

    $ RAILS_ENV=proxied-appfog rails console

That's it, you now have a Rails console proxied to your AppFog database service!

## rake db:seed {#rake-db-seed}

This assumes that you have your Rails app set up, and you have a MySQL service bound to it.

### Tunnel to your bound MySQL service

Use the [af tunnel](/services/tunneling) command to connect to the MySQL service that's bound to your Rails app. When prompted, enter '1' for no client.

    $ af tunnel 
    1: rails-mysql-example 
    Which service to tunnel to?: 1
    Getting tunnel connection info: OK

    Service connection info: 
    username : <username> 
    password : <password> 
    name : <db-name>

    Starting tunnel to rails-mysql-example on port 10000. 
    1: none 
    2: mysql 
    3: mysqldump 
    Which client would you like to start?: 1 
    Open another shell to run command-line clients or 
    use a UI tool to connect using the displayed information. 
    Press Ctrl-C to exit...

You now have a secure tunnel set up to your MySQL service through which you can run `rake db:seed`.

### Create a new section in your `config/database.yml` file

    proxied-appfog: 
    adapter: mysql2 
    database: <db-name> 
    username: <username> 
    password: <password> 
    port: 10000 
    host: 127.0.0.1

### Run `rake db:seed`

Start with a simple `seeds.rb` file that just creates one record in your database to test that it works. 

Then, leaving open the terminal window with the tunnel running in it, open a new terminal window and run:

    $ RAILS_ENV=proxied-appfog rake db:seed

If all goes well, you should have a log file in your `log/` directory called `proxied-appfog.log` that shows the SQL commands running from your `seeds.rb` file. 

    $ af files ror-example logs/
    startup.log                               8.2K
    stdout.log                                  0B
    proxied-appfog.log                          0B

## Auto-reconfiguration {#autoreconfig}

Ruby on Rails apps deployed on AppFog support auto-reconfiguration for relational database services. This means you can deploy a Rails app on AppFog without changing a single line of code. 

AppFog automatically reconfigures Rails apps by modifying the production settings in your `config/database.yml` file during staging.

While it’s fairly common to put these types of connections in a Rails Initializer File, auto-reconfiguration should work just as well if you create the connection somewhere else within your app.

When your Rails app is staged for deployment, AppFog makes two modifications:

* Adds an additional `cf-autoconfig` gem to your Bundle.
* Adds an Initializer file to `config/initializers` that ensures that all dynamic class modification is done prior to loading other Initializers (and thus before your app executes).

### Limitations

Auto-reconfiguration only works if there's exactly one service of a given service type bound to your app. For example, you can only bind only one relational database service (e.g. MySQL or Postgres) to an app. 

If your app doesn’t follow these limitations, AppFog won't auto-reconfigure your app. 

The auto-reconfiguration mechanism also expects typical Ruby apps. If your app configuration is complex, it may not work. In those cases, you can opt out of auto-reconfiguration:

### Opting out of auto-reconfiguration

AppFog offers a few ways to opt out of the auto-reconfiguration mechanism.

* Create a file in your Rails app called `config/cloudfoundry.yml`. Add the entry `autoconfig: false`.
* Include the `cf-runtime` gem in your app's `Gemfile`.

## Further Reading

For more technical details about how auto-reconfiguration works on AppFog, check out [this blog post](http://blog.cloudfoundry.com/2012/03/12/using-cloud-foundry-services-with-ruby-part-1-auto-reconfiguration/).
