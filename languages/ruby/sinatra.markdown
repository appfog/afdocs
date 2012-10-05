---
title: Sinatra
weight: 2
---

AppFog currently only offers one app server for Sinatra apps: Thin. If you're using Bundler, and nothing in your app's bundle requires Thin, VCAP cannot safely start your app using it.

To use AppFog services with Sinatra, you have to access the `VCAP_SERVICES` environment variable. You can read more about this on the [Services Overview page](/services/overview).

AppFog autodetects your Sintra app by searching for `require 'sinatra'` in the `*.rb` files. It then chooses that file as the main Sinatra app file. 

If you use Bundler to load Sinatra, AppFog may not recognize your app. In this case, you can simply manually tell AppFog that it's a Sinatra app when you push your code: 


    $ af push
    Would you like to deploy from the current directory? [Yn]:
    Application Name: sinatra-example
    Detected a Standalone Application, is this correct? [Yn]: n
    1: Rails
    2: Spring
    3: Grails
    4: Lift
    5: JavaWeb
    6: Standalone
    7: Sinatra
    8: Node
    9: PHP
    10: Erlang/OTP Rebar
    11: WSGI
    12: Django
    13: Rack
    Select Application Type: 7
    Selected Sinatra Application
    ...


<!--- You can put a comment in your app’s main file like this:


    # require 'sinatra'   # required for framework detection in AppFog...
    require 'rubygems'
    require 'bundler'
    Bundler.require
    ...
---> 

## Sample Sinatra App Using DataMapper and Bundler

### Gemfile


    source 'http://rubygems.org'

    gem 'sinatra'
    gem 'data_mapper'

    group :development do
        gem 'dm-sqlite-adapter'
    end

    group :production do
        gem 'dm-mysql-adapter'
    end

### `sinatra_dm.rb`

The name of this sinatra app will be `sinatra_dm.rb`.

<!--- Note the commented out require of sinatra, which is necessary for proper detection of the app’s main file. --->

<!---    # require 'sinatra'   # required for framework detection in AppFog. --->


    # Sample Sinatra app with DataMapper
    # Based on http://sinatra-book.gittr.com/ DataMapper example
    require 'rubygems'
    require 'bundler'
    Bundler.require
    
    if ENV['VCAP_SERVICES'].nil?
        DataMapper::setup(:default, "sqlite3://#{Dir.pwd}/blog.db")
    else
        require 'json'
        svcs = JSON.parse ENV['VCAP_SERVICES']
        mysql = svcs.detect { |k,v| k =~ /^mysql/ }.last.first
        creds = mysql['credentials']
        user, pass, host, name = %w(user password host name).map { |key| creds[key] }
        DataMapper.setup(:default, "mysql://#{user}:#{pass}@#{host}/#{name}")
    end
    
    class Post
        include DataMapper::Resource
        property :id, Serial
        property :title, String
        property :body, Text
        property :created_at, DateTime
    end
    
    DataMapper.finalize
    Post.auto_upgrade!
    
    get '/' do
        @posts = Post.all(:order => [:id.desc], :limit => 20)
        erb :index
    end
    
    get '/post/new' do
        erb :new
    end
    
    get '/post/:id' do
        @post = Post.get(params[:id])
        erb :post
    end
    
    post '/post/create' do
        post = Post.new(:title => params[:title], :body => params[:body])
        if post.save
            status 201
            redirect "/post/#{post.id}"
        else
            status 412
            redirect '/'
        end
    end

## Views

### Index


    <!-- views/index.erb -->

    <h1>All Blog Posts</h1>
    <ul>
        <% @posts.each do |post| %>
            <li><a href="/post/<%= post.id %>"><%= post.title %></a></li>
        <% end %>
    </ul>
    <br />
    <a href="/post/new">Create new post</a>

### New


    <!-- views/new.erb -->

    <h1>Create a new blog post</h1>
    <form action="/post/create" method="POST">
        <p>Title: <input type="text" name="title"></input></p>
        <p>Text: <textarea name="body" rows="10" cols="40"></textarea></p>
        <input type="submit" name="Publish" />
    </form>

### Post


    <!-- views/post.erb -->

    <h1><%= @post.title %></h1>
    <p><%= @post.body %></p>
    <a href="/">All Posts</a>

### Test Locally


    $ ruby sinatra_dm.rb
    
Then visit <http://localhost:4567/> in your browser.

### Bundle and Push


    $ bundle install; bundle package
    $ af push
