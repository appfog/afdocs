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

You can use the `whenever` gem with a standalone ruby app, for example, to run cron-like jobs using an incredibly simple syntax. One of the examples given in the GitHub repo demonstrates this:

    every 3.hours do
        runner “MyModel.someProcess”
        rake “my:rake:task”
        command “/usr/bin/my_great_command”
    end

Or you can designate specific times to run tasks:

    every 1.day, :at => '4:30 am' do
        runner "MyModel.my_incredibly_robust_and_sophisticated_task"
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
    1: erlangR14B02
    2: java
    3: node04
    4: node06
    5: php
    6: python2
    7: ruby18
    8: ruby192
    9: ruby193
    Select Runtime [ruby18]: 7
    Selected ruby18
    Start Command: ruby portland.rb
    1: AWS US East - Virginia
    2: AWS EU West - Ireland
    3: AWS Asia SE - Singapore
    4: Rackspace AZ 1 - Dallas
    5: HP AZ 2 - Las Vegas
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
