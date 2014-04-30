---
title: Redis
weight: 5
---

## Redis

With AppFog's free Redis service, you get 10 MB of RAM and 6 concurrent connections per instance. 

* [The VCAP\_SERVICES Environment Variable](#redis-vcap)
* [Ruby](#redis-ruby)
* [Redis with Sinatra Tutorial](#redis-sinatra-tutorial)

### The VCAP\_SERVICES Environment Variable {#redis-vcap}

When you provision and bind a service to your app, AppFog creates an environment variable called `VCAP_SERVICES`. For apps that can't be automatically configured, you can find the information your app needs to connect to the database in this variable.

This variable contains a `JSON` document with a list of all credentials and connection information for the bound services.

Here's an example that of the environment variable for an app that has a Redis service bound to it:

    {"redis-2.2":[
        {
            "name":"redis-example",
            "label":"redis-2.2",
            "plan":"free",
            "tags":["redis","redis-2.2","key-value","nosql"],
            "credentials":{
                "hostname":"10.7.66.164",
                "host":"10.7.66.164",
                "port":5004,
                "password":"191dc43f-69a3-4d31-ac5e-4b66155b2e8e",
                "name":"9e3f3a9c-82ba-4c2e-bc83-b498e5447251"
            }
        }
    ]}

You can use your app's language-specific facility to call the environment variable.

In Java:

    java.lang.System.getenv("VCAP_SERVICES")

In Ruby:

    ENV['VCAP_SERVICES']

In Javascript:

    process.env.VCAP_SERVICES

In Python:

    os.getenv("VCAP_SERVICES")

In PHP:

    getenv("VCAP_SERVICES")

### Ruby {#redis-ruby}

Connecting your Ruby app to a bound Redis service is simple:

    require "redis"

    configure do
        services = JSON.parse(ENV['VCAP_SERVICES'])
        redis_key = services.keys.select { |svc| svc =~ /redis/i }.first
        redis = services[redis_key].first['credentials']
        redis_conf = {:host => redis['hostname'], :port => redis['port'], :password => redis['password']}
        @@redis = Redis.new redis_conf
    end

The last line creates a class variable `@@redis`, available to all subclasses in your application, that will be used at runtime to add keys/values to Redis.

In your application use [Redis commands](http://redis.io/commands) to edit and add key/values to the data store.

### Redis with Sinatra Tutorial {#redis-sinatra-tutorial}

In this tutorial, we'll build a simple, `CRUD`-style note-taking app with Sinatra and we'll use Redis as the data store for the project.

You can find the completed code for the project on [GitHub](https://github.com/lucperkins/af-redis-example), and a functioning instance of the app is currently deployed [on AppFog](http://redis-example.hp.af.cm/).

#### Setting up the Redis connection

First, we'll create a `Gemfile`:

    source 'http://rubygems.org'

    gem 'redis'
    gem 'haml'
    gem 'sinatra'

At the top of the `app.rb` file, we'll specify the dependencies:

    require 'rubygems'
    require 'sinatra'
    require 'redis'
    require 'haml'
    require 'json'

Next, we'll connect to the Redis service:

    configure do
        services = JSON.parse(ENV['VCAP_SERVICES'])
        redis_key = services.keys.select { |svc| svc =~ /redis/i }.first
        redis = services[redis_key].first['credentials']
        redis_conf = {:host => redis['hostname'], :port => redis['port'], :password => redis['password']}
        @@redis = Redis.new redis_conf
    end

Interacting with the database involves simply running methods on this object. 

#### Getting started with routes and templates

Now that we have a database connection established we can start. This will be a single-page app, so we'll keep our routes simple. Let's start with the basic get `'/'` route:

    get '/' do
      @title = "Sinatra + Redis + AppFog = WIN"
      @notes = @@redis.LRANGE("notes", 0, -1)
      haml :index
    end

Here, we've specified the page title and created a `@notes` object that will store the notes we create. In order to do that, we need to query Redis. The `LRANGE` command in Redis gives back all of the values of the list (the `L` in `LRANGE` refers to "list") if you go from element `0` (the first element) to element `-1` (the last element). The list in question, `notes`, doesn’t exist yet. Querying Redis for it simply returns nothing, and our `@notes` variable will be empty at first. The `haml :index` command will specify which view needs to be rendered (index) and which templating engine we’ll be using (Haml).

Now, we'll start building our actual `views/index.haml` page. First, some boilerplate. [Here](http://haml.info/) are Haml's docs, for reference.

    !!!
    %html
      %head
        %title= @title
        %link{ :rel => "stylesheet", :type => "text/css", :href => "style.css" }
      %body
        %h1 Welcome to Redis on AppFog!

So now we have a basic stub of a site. With that in place, we'll set up a container for our notes and a generator for producing `DOM` elements for specific notes:

    #notes-container
      %h3 Notes:
      %ul
        - @notes.each do |note|
          %li
            %span #{note.to_s}
            %br

Under the "Notes" header, we've set up an unordered list (`%ul`) and below that we embed actual Ruby code into the view (with the hyphen). Remember that the `@notes` list is what houses the notes that we’ve entered into our Redis database. Here, I've created a simple Ruby block, whereby I take each member of the `@notes` list and create a list item (`%li`). Within each list item, there will be a `%span` that houses each specific note, followed by a line break (`%br`).

#### The `@notes` list is sad and empty. Let's fix that.

Right now, if we go to our main index page, we’ll see a couple headers and no notes. Next, we'll enable users to actually input notes of their own and store them in Redis. In our view, above the `#notes-container`, let's set up a form for inputting data:

    #mainForm
      %form{ :id => "newNote", :action => "/newNote", :method => "post" }
        %fieldset
          %label{ :for => "newNote" } Leave me a brief note!
          %br
          %input{ :type => "text", :name => "newNote" }
          %br
          %input{ :type => "submit", :value => "Submit" }

This form will provide a text field for entering text and a "Submit" button. Upon submission, it will `POST` the `/newNote` action. Let's set up our server to handle this request, below our initial get `'/'` route:

    post '/newNote' do
      if params[:newNote].length >= 1
        @newNote = params[:newNote]
        @@redis.LPUSH("notes", @newNote)
      end

      redirect ‘/’
    end

First, note that the `params[:newNote]` variable stores the text that has been submitted in the form. In order to push that information into our Redis store, we need to make sure that text has been entered, hence the `if params[:newNote].length >= 1` condition. If text has been entered, then we'll store that in the `@newNote` variable.

Now comes the exciting part: making our first list push to Redis. We simply run the `LPUSH` command on the redis variable we created at the top, and push our `@newNote` to the notes list. Once that has been done, the server will reload the page, except that this time it will do so with a `@notes` list that has actual content.

#### Spicing it up with list lengths, deletion, and timestamps

Let's go a little further by allowing users to delete all of the notes that they've made thus far. We'll insert a "Delete all" button into our view:

    %form{ :id => "deleteNotes", :action => "/", :method => "post" }
      %input{ :type => "submit", :value => "Delete all" }

Now, let’s set up our server to handle this method in the `app.rb` file:

    post '/deleteNotes' do
      @@redis.FLUSHALL

      redirect '/'
    end

The `FLUSHALL` command empties out the entire Redis store. This is a command that we'll use sparingly, of course, but in this case it works for our purposes.

Next, we'll add a timestamp to each note so we can remember when it was posted and to keep tabs on how many notes have been created.

In order to do that, we'll create a `before` block in the Sinatra server. This code will be called every time an `HTTP` request is made, no matter what that request is. We'll set up two new variables, `@length` for the length of the notes list, and `@time` for the current time:

    before do
      @length = @@redis.LLEN("notes")
      @time = Time.now.to_s
    end

To get the length of our notes list, we'll ping Redis and use the `LLEN` (list length) command on our list. For the timestamp, there's no reason to use Redis over simply calling on the `Time.now` variable from the Ruby standard library, so we'll just use that and convert it to a string.

Now, let's change our `index.haml` file to actually present this information in the view. We'll create a sidebar on the right side of the page that keeps a tally of how many notes are in my list:

    #right-sidebar
      %h4 Total number of notes: #{@length}
