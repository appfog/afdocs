---
layout: doc-page
title: Ruby on Rails
weight: 1
---

* [Supported Ruby Versions](#rubyversions)
* [Gems and Gemfiles](#gems)
* [Bundler](#bundler)
* [Rails 3.0](#rails30)
* [Rails 3.1](#rails31)
* [Auto-reconfiguration](#autoreconfig)

### Supported Ruby Versions {#rubyversions}

For a list of runtimes that AppFog supports run:

{: .prettyprint}
    $ af runtimes

Ruby 1.8.7 is the default Ruby runtime.

To use Ruby 1.9.3, for example, add the `af  --runtime ruby193` option when you push your code:

{: .prettyprint}
    $ af push <appname> --runtime ruby193

# Gems and Gemfiles {#gems}

AppFog requires a `Gemfile` in your app's root directory. This should list the gems your app needs to run. 

The following Gemfile feature aren't supported yet: 

* gem dependencies on git `URL`s or branches
* gem :path => "some/path"
* platform-conditional gems

AppFog currently only offers one app server for Sinatra and Rails apps: Thin. If you're using Bundler, and nothing in your app's bundle requires Thin, VCAP cannot safely start your app using it. In such cases, it will fall back to running your app using '`rails server`', which uses WEBrick. For best performance and results, use Thin.

# Bundler {#bundler}

You should use [Bundler](http://gembundler.com/) to package your apps. Run `bundle package; bundle install` each time you modify your Gemfile and before you make an `af push` or `af update` command.

### Gems with known issues:

* rmagick (requires http://www.imagemagick.org/script/index.php native library to be installed)

[Isolate](https://github.com/jbarnette/isolate) is not well-supported on AppFog.

# Rails 3.0 {#rails30}

Ruby on Rails app deployments on AppFog automatically recognize MySQL. For other services, you'll need to access the `VCAP_SERVICES` environment variable. More on that in our [Services doc](/services).

Make sure to use the correct version of the MySQL2 gem in your Gemfile:

{: .prettyprint .linenums}
    # If you use a different database in development, hide it from AppFog
    group :development do
    gem 'sqlite3'
    end
    
    # Rails 3.0 requires version less than 0.3 of mysql2 gem
    group :production do
    gem 'mysql2', '< 0.3'
    end

### Bundle your app:

{: .prettyprint}
    $ bundle package
	$ bundle install

Deploy:

{: .prettyprint}
    $ af push

# Rails 3.1 {#rails31}

Rails 3.1 introduces the asset pipeline. To get the asset pipeline working on AppFog, precompile your assets in your development environment. This compiles them into `public/assets`, at which point you can tweak the production environment configuration before excuting a normal `af push`.

### Gemfile

#### Ruby 1.8

{: .prettyprint .linenums}
    # If you use a different database in development, hide it from AppFog.
    group :development do
    gem 'sqlite3'
    end
    
    # Rails 3.1 can use the latest mysql2 gem.
    group :production do
    gem 'mysql2'
    end

#### Ruby 1.9

{: .prettyprint .linenums}
    # If you use a different database in development, hide it from AppFog.
    group :development do
    gem 'sqlite3'
    end
    
    # Rails 3.1 can use the latest mysql2 gem.
    group :production do
    gem 'mysql2'
    end
    
    # For Ruby 1.9 AppFog requires a tweak to the jquery-rails gem.
    # gem 'jquery-rails'
    gem 'cloudfoundry-jquery-rails'
    
    # For Ruby 1.9 AppFog requires a tweak to devise.
    # Uncomment next line if you plan to use devise.
    # gem 'cloudfoundry-devise', :require => 'devise'

### Bundle your app:

{: .prettyprint}
    $ bundle package
	$ bundle install

### Configs

In `config/environments/production.rb`, change

{: .prettyprint}
    config.server_static_assets = false

to

{: .prettyprint}
    config.server_static_assets = true

### Assets

Pre-compile your asset pipeline:

{: .prettyprint}
    $ bundle exec rake assets:precompile

### Version Control System

Commit the current configuration to your version control system. Consider including: + `Gemfile.lock` + gems packaged into `vendor/cache` + assets compiled into `public/assets`.

### Deploy

{: .prettyprint}
    $ af push

# Services

AppFog automatically creates and binds a new MySQL service with the Ruby on Rails jumpstart, and the app is [automatically reconfigured](#autoreconfig) to connect to the service. For more information on services and how to connect to them manually, check out our docs on [Services](/services/overview).

# Auto-reconfiguration {#autoreconfig}

Ruby on Rails apps deployed on AppFog support auto-reconfiguration for relational database services. This means you can deploy a Rails app on AppFog without changing a single line of code. 

Note: Auto-reconfiguration is currently disabled by default. To enable, add a `config/cloudfoundry.yml` file containing the following:

{: .prettyprint}
    ---
	autoconfig: true

AppFog automatically reconfigures Rails apps by modifying the production settings in your `config/database.yml` file during staging.

While it’s fairly common to put these types of connections in a Rails Initializer File, auto-reconfiguration should work just as well if you create the connection somewhere else within your application.

When your Rails app is staged for deployment, AppFog makes two modifications:

* Adds an additional `cf-autoconfig` gem to your Bundle.
* Adds an Initializer file to `config/initializers` that ensures that all dynamic class modification is done prior to loading other Initializers (and thus before your app executes).

### Limitations

Auto-reconfiguration only works if there's exactly one service of a given service type bound to your app. For example, you can only bind only one relational database service (e.g. MySQL or Postgres) to an app. 

If your app doesn’t follow these limitations, AppFog won't auto-reconfigure your app. 

The auto-reconfiguration mechanism also expects typical Ruby apps. If your app configuration is complex, it may not work. In those cases, you can opt out of auto-reconfiguration:

<!---

### Opting out of auto-reconfiguration

AppFog offers a few ways to opt out of the auto-reconfiguration mechanism.

* Create a file in your Rails app called `config/cloudfoundry.yml`. Add the entry `autoconfig: false`.
* Include the `cf-runtime` gem in your app's `Gemfile`. --->

### Further Reading

For more technical details about how auto-reconfiguration works on Cloud Foundry, check out [this blog post](http://blog.cloudfoundry.com/2012/03/12/using-cloud-foundry-services-with-ruby-part-1-auto-reconfiguration/).
