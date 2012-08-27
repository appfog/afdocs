---
title: Ruby
weight: 1
---

* [Supported Ruby Versions](#rubyversions)
* [Gems and Gemfiles](#gems)
* [Bundler](#bundler)

## Supported Ruby Versions {#rubyversions}

For a list of runtimes that AppFog supports run:


    $ af runtimes

Ruby 1.8.7 is the default Ruby runtime.

To use Ruby 1.9.3, for example, add the `af  --runtime ruby193` option when you push your code:


    $ af push <appname> --runtime ruby193

## Gems and Gemfiles {#gems}

AppFog requires a `Gemfile` in your app's root directory. This should list the gems your app needs to run. 

The following Gemfile feature aren't supported yet: 

* gem dependencies on git `URL`s or branches
* gem :path => "some/path"
* platform-conditional gems

AppFog currently only offers one app server for Sinatra and Rails apps: Thin. If you're using Bundler, and nothing in your app's bundle requires Thin, VCAP cannot safely start your app using it. For Rails in such cases, it will fall back to running your app using '`rails server`', which uses WEBrick. For best performance and results, use Thin.

## Bundler {#bundler}

You should use [Bundler](http://gembundler.com/) to package your apps. Run `bundle package; bundle install` each time you modify your Gemfile and before you make an `af push` or `af update` command.

## Gems with known issues:

* rmagick (requires http://www.imagemagick.org/script/index.php native library to be installed)
* libv8 (system-wide installation required)
* therubyracer (depency on libv8)

[Isolate](https://github.com/jbarnette/isolate) is not well-supported on AppFog.
