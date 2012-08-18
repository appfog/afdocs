---
title: Rails
weight: 2
---

* [Rails 2.3](#rails23)
* [Rails 3.0](#rails30)
* [Rails 3.1](#rails31)
* [rake db:seed](#rake-db-seed)
* [Auto-reconfiguration](#autoreconfig)

AppFog currently only offers one app server for Rails apps: Thin. If you're using Bundler, and nothing in your app's bundle requires Thin, VCAP cannot safely start your app using it. For Rails in such cases, it will fall back to running your app using '`rails server`', which uses WEBrick. For best performance and results, use Thin.

# Rails 2.3 {#rails23}

Rails’ '`config.gem`' mechanism, which allows the user to specify a list of gems that the app needs to operate, is limited in that it cannot protect you from multi-deep dependencies (deeply layered gems using other gems). As mitigation, many Rails 2.3 apps have subsequently adopted Gem Bundler.

VCAP currently doesn't detect Rails 2.3 apps. If you need to run a Ruby 2.3 app, disguise it as a Rails 3 app by creating a `config/application.rb` file and a 'config.ru'.

### Bundler

Rails 2.3 has its own gem handling system, but we can override that and use Bundler instead.

Insert the following code in `config/boot.rb`, right above `Rails.boot!`:

{: .prettyprint .linenums}
    class Rails::Boot
        def run
            load_initializer

            Rails::Initializer.class_eval do
                def load_gems
                    @bundler_loaded ||= Bundler.require :default, Rails.env
                end
            end

            Rails::Initializer.run(:set_load_path)
        end
    end

Then create a new file called `config/preinitializer.rb` with the following:

{: .prettyprint .linenums}
    begin
        require "rubygems"
        require "bundler"
    rescue LoadError
        raise "Could not load the bundler gem. Install it with `gem install bundler`."
    end

    if Gem::Version.new(Bundler::VERSION) <= Gem::Version.new("0.9.24")
        raise RuntimeError, "Your bundler version is too old for Rails 2.3." +
            "Run `gem install bundler` to upgrade."
    end

    begin
        # Set up load paths for all bundled gems
        ENV["BUNDLE_GEMFILE"] = File.expand_path("../../Gemfile", __FILE__)
        Bundler.setup
    rescue Bundler::GemNotFound
        raise RuntimeError, "Bundler couldn't find some gems." +
            "Did you run `bundle install`?"
    end

Get all `config.gem` declarations from your app and put them into the `Gemfile`. If you have declarations in `development.rb`, for example, place them in the named group. Make sure to include Rails itself and at least one source.

{: .prettyprint .linenums}
    source 'http://rubygems.org'
    gem "rails", "~> 2.3.5"
    
    # bundler requires these gems in all environments
    # gem "nokogiri", "1.4.2"
    # gem "geokit"
    
    group :development do
		# bundler requires these gems in development
		# gem "rails-footnotes"
    end
    
    group :test do
		# bundler requires these gems while running tests
		# gem "rspec"
		# gem "faker"
    end

For more details on Bundler support for Rails 2.3, check out [this guide](http://gembundler.com/rails23.html).

Watch out for complicated and confusing bundle settings. While VCAP does its best to handle your configuration, it's possible to write Gemfiles that cannot be satisfied, for example by requesting an old version of Rails and a new version of Rack. These combinations will fail immediately; you won't need to wait to push your app to the cloud to see it break. By the same token, Gemfiles and Gems that are too vague about versions can cause problems as well.

In Bundler groups, mixing multiple techniques for specifying which groups to load where (dev/test/prod) can sometimes cause problems.

When in doubt, be more specific when calling '`Bundler.setup`'. VCAP attempts to be as consistent as possible, but it's possible to confuse the Bundler with badly behaved application bootstrap code.

The `bundle package` command will create a cache directory in your app and store local copies of the required gems, allowing you to run `bundle install` with the `--local` flag for faster load time. This will not work in our case as Bundler currently cannot package gems that need to be fetched from a git repository, and it doesn't attempt to package gems that you have manually specified a path to using the `:path` Gemfile option. The best way to avoid this confusion is to stick to published gems.

Along with published gems, Gemfiles can refer to git repos by url, branch name, etc. and Bundler will build them using a specialized mechanism. VCAP currently has no support for these at all, and apps that need them will fail.

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

# rake db:seed {#rake-db-seed}

This assumes that you have your Rails app set up, and you have a MySQL service bound to it.

### Tunnel to your bound MySQL service

Use the [af tunnel](/services/tunneling) command to connect to the MySQL service that's bound to your Rails app. When prompted, enter '1' for no client.

{: .prettyprint}
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

{: .prettyprint}
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

{: .prettyprint}
    $ RAILS_ENV=proxied-appfog rake db:seed

If all goes well, you should have a log file in your `log/` directory called `proxied-appfog.log` that shows the SQL commands running from your `seeds.rb` file. 

{: .prettyprint}
    $ af files ror-example logs/
    startup.log                               8.2K
    stdout.log                                  0B
    proxied-appfog.log                          0B

# Auto-reconfiguration {#autoreconfig}

Ruby on Rails apps deployed on AppFog support auto-reconfiguration for relational database services. This means you can deploy a Rails app on AppFog without changing a single line of code. 

Note: Auto-reconfiguration is currently disabled by default. To enable, add a `config/cloudfoundry.yml` file containing the following:

{: .prettyprint}
    ---
    autoconfig: true

AppFog automatically reconfigures Rails apps by modifying the production settings in your `config/database.yml` file during staging.

While it’s fairly common to put these types of connections in a Rails Initializer File, auto-reconfiguration should work just as well if you create the connection somewhere else within your app.

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

For more technical details about how auto-reconfiguration works on AppFog, check out [this blog post](http://blog.cloudfoundry.com/2012/03/12/using-cloud-foundry-services-with-ruby-part-1-auto-reconfiguration/).
