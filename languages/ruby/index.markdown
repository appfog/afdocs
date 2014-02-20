---
title: Ruby
weight: 6
---

## Ruby

* [Supported Ruby Versions](#rubyversions)
* [Bundler](#bundler)
* [Gems and Gemfiles](#gems)
* [Standalone Apps](#standalone-ruby)

### Supported Ruby Versions {#rubyversions}

For a list of runtimes that AppFog supports run:


    $ af runtimes

Ruby 1.8.7 is the default Ruby runtime.

To use Ruby 1.9.3, for example, add the `af  --runtime ruby193` option when you push your code:


    $ af push <appname> --runtime ruby193

    
### Bundler {#bundler}

[Bundler](http://gembundler.com/) is required for any ruby app with gem dependencies. Run `bundle install` each time you modify your Gemfile and before you make an `af push` or `af update` command. A populated vendor/cache directory will be used if included in your application. If missing, gems will be compiled/added to your app whenever you update. Apps with a large number of gem dependencies may try to `bundle package` to speed up the staging process. 

[Isolate](https://github.com/jbarnette/isolate) is not well-supported on AppFog.


### Gems and Gemfiles {#gems}

AppFog requires a valid `Gemfile` **and** `Gemfile.lock` in your app's root directory to successfully match your dependencies. 

The following Gemfile feature aren't supported yet: 

* platform-conditional gems (some binary packages are supported)
* private git repositories (use vendor/cache instead)

AppFog currently only offers one app server for Sinatra and Rails apps: Thin. If you're using Bundler, and nothing in your app's bundle requires Thin, VCAP cannot safely start your app using it. For Rails in such cases, it will fall back to running your app using '`rails server`', which uses WEBrick. For best performance and results, use Thin. 


### Standalone apps {#standalone-ruby}

Standalone apps requiring provisioned services are not autoconfigured at this time. Explicit connection management is required and we recommend including the `cf-runtime` gem in your Gemfile and wiring the connections up yourself. 

    client = CFRuntime::CloudApp.running_in_cloud? ? CFRuntime::RedisClient.create : Redis.new


For a complete working reference, see our sample [resque app](https://github.com/appfog/af-ruby-resque).
