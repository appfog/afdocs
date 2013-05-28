---
title: Task-scheduling
weight: 3
---

There are a few ways to schedule tasks using a "standalone" app in just about any language that runs on AppFog.

### Using Background Workers on AppFog

AppFog supports background processing, which means you can run container-less, "standalone" apps on AppFog.

* [Ruby](#task-scheduling-ruby)
* [Python](#task-scheduling-python)

## Ruby {#task-scheduling-ruby}

You can use the `rufus-scheduler` [gem](https://github.com/jmettraux/rufus-scheduler) with a standalone ruby app, for example, to run cron-like jobs using an incredibly simple syntax. The examples in the GitHub repo demonstrates this:

    require 'rubygems'
    require 'rufus/scheduler'

    scheduler = Rufus::Scheduler.start_new

    scheduler.in '20m' do
      puts "order ristretto"
    end

    scheduler.at 'Thu Mar 26 07:31:43 +0900 2009' do
      puts 'order pizza'
    end

    scheduler.cron '0 22 * * 1-5' do
      # every day of the week at 22:00 (10pm)
      puts 'activate security system'
    end

    scheduler.every '5m' do
      puts 'check blood pressure'
    end

Some examples of commands you could run include: 

 * Pinging a URL in another app that induces a database backup. 
 * Clear cache.
 * Perform web-scraping within a set of domains.
 * Email a particular subset of your users. 

## Example Standalone App on AppFog

First, we’ll make a simple Ruby file (`portland.rb`) that simply outputs "Portland: life is just better here" every five seconds:

    loop {
        puts "Portland: life is just better here"
        sleep 5
    }

Next, run `af push` from the app's directory (we'll call the app "portlandrules"). When it asks you if you’re deploying a standalone app, respond "yes," and you can then specify which runtime the app is in and which start command you want to use with the app. (If it asks if you’re deploying a specific language or framework like Rails or Django, respond "no.")

In this case, the start command is `ruby portland.rb`. 

    $ af push portlandrules
    Would you like to deploy from the current directory? [Yn]:
    Detected a Standalone Application, is this correct? [Yn]:
    1: java
    2: node04
    3: node06
    4: php
    5: python2
    6: ruby18
    7: ruby192
    8: ruby193
    Select Runtime [ruby18]: 6
    Selected ruby18
    Start Command: ruby portland.rb
    1: AWS US East - Virginia
    2: AWS EU West - Ireland
    3: AWS Asia SE - Singapore
    4: HP AZ 2 - Las Vegas
    Select Infrastructure: 1
    Application Deployed URL [None]:
    Memory reservation (128M, 256M, 512M, 1G, 2G) [128M]:
    How many instances? [1]:
    Bind existing services to 'portlandrules'? [yN]:
    Create services to bind to 'portlandrules'? [yN]:
    Would you like to save this configuration? [yN]:
    Creating Application: OK
    Uploading Application:
      Checking for available resources: OK
      Packing application: OK
      Uploading (0K): OK
    Push Status: OK
    Staging Application 'portlandrules': OK
    Starting Application 'portlandrules': OK

At this point, you can test whether it's working by checking the app's logs:

    $ af logs portlandrules
    ====> /logs/staging.log <====

    # Logfile created on 2012-09-20 21:40:27 +0000 by logger.rb/25413
    Auto-reconfiguration disabled because app does not use Bundler.
    Please provide a Gemfile.lock to use auto-reconfiguration.

    ====> /logs/stdout.log <====

    Portland: life is just better here
    Portland: life is just better here
    Portland: life is just better here
    Portland: life is just better here

## Python {#task-scheduling-python}

An alternative in Python is [Advanced Python Scheduler](http://packages.python.org/APScheduler/).
