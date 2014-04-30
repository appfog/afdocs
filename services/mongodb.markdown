---
title: MongoDB
weight: 3
---

## MongoDB

AppFog provides a MongoDB service that's accessible to apps that are running on any of the supported runtimes and frameworks. 

* [Ruby](#ruby)
* [Node.js](#node)
* [Node.js with MongoDB Walkthrough](#walkthrough)
* [PHP](#php)

### Ruby {#ruby}

You can use the [MongoMapper ORM](http://mongomapper.com/) to adapt your Ruby app to access the AppFog MongoDB service.

### Gemfile

First, add the MongoMapper gem, as well as BSON for serialization of JSON-like documents, which is necessary for interfacing with the MongoDB Ruby driver:

    gem 'mongo_mapper'
    gem 'bson_ext'

And install the gems:

    $ gem install "mongo_mapper"

    $ gem install "bson_ext"

### Rails

For a Rails app, modify the production section of your app's `config/mongo.yml` to set credentials, host, and port by parsing the JSON-formatted `VCAP_SERVICES` environment variable:

    production:
    host: <%= JSON.parse(ENV['VCAP_SERVICES'])['mongodb-1.8'].first['credentials']['hostname'] rescue 'localhost' %>
    port: <%= JSON.parse( ENV['VCAP_SERVICES'] )['mongodb-1.8'].first['credentials']['port'] rescue 27017 %>
    database:  <%= JSON.parse( ENV['VCAP_SERVICES'] )['mongodb-1.8'].first['credentials']['db'] rescue 'tutorial_db' %>
    username: <%= JSON.parse( ENV['VCAP_SERVICES'] )['mongodb-1.8'].first['credentials']['username'] rescue '' %>
    password: <%= JSON.parse( ENV['VCAP_SERVICES'] )['mongodb-1.8'].first['credentials']['password'] rescue '' %>

For other Ruby apps, use the `JSON.parse()` code to extract the information you need to construct a [MongoDB connection string](http://www.mongodb.org/display/DOCS/Connections) from the `VCAP_SERVICES` environment variable.

#### Bundle

    $ bundle package
    $ bundle install

#### Deploy

When `af` asks if you want to bind any services, enter `y` and choose `mongodb` from the menu. Provide a name for the service or accept the default:

    $ af push --runtime ruby193
        Would you like to deploy from the current directory? [Yn]:
        Application Name: test
        Application Deployed URL [test.aws.af.cm]:
        Detected a Sinatra Application, is this correct? [Yn]:
        Memory Reservation (64M, 128M, 256M, 512M, 1G) [256M]:
        Creating Application: OK
        Would you like to bind any services to 'test'? [yN]: y
        Would you like to use an existing provisioned service [yN]? N
        The following system services are available
        1: mongodb
        2: mysql
        3: postgresql
        Please select one you wish to provision: 1
        Specify the name of the service [mongodb-example1]:
        Creating Service: OK
        Binding Service [mongodb-example1]: OK
        Uploading Application:
            Checking for available resources: OK
            Processing resources: OK
            Packing application: OK
        Uploading (8K): OK
        Push Status: OK
        Staging Application: OK
        Starting Application: OK

### Node.js {#node}

Before you begin, make sure you have [Node.js](http://nodejs.org/) and [MongoDB](http://www.mongodb.org/) installed on your development computer.

Check out our [doc on deploying Node.js apps](/languages/node).

#### Setup

Start `mongod` in your local environment:

    $ mongod

#### Push

Push your Node.js app to AppFog and bind a new MongoDB service to it:

    $ af push
        Would you like to deploy from the current directory? [Yn]:
        Application Name: mongo-node-example
        Application Deployed URL [mongo-node-example.aws.af.cm]:
        Detected a Node.js Application, is this correct? [Yn]:
        Memory Reservation (64M, 128M, 256M, 512M, 1G) [64M]:
        Creating Application: OK
        Would you like to bind any services to 'mongo-node-example'? [yN]: y
        The following system services are available
        1: mongodb
        2: mysql
        3: postgresql
        Please select one you wish to provision: 1
        Specify the name of the service [mongodb-example1]:
        Creating Service: OK
        Binding Service [mongodb-example1]: OK
        Uploading Application:
            Checking for available resources: OK
            Packing application: OK
            Uploading (0K): OK
        Push Status: OK
        Staging Application: OK
        Starting Application: OK

#### Configure MongoDB

Next, update your app to use the MongoDB connection information and credentials, both locally and on AppFog, by adding the following code to the beginning of `app.js`:

    if(process.env.VCAP_SERVICES){
        var env = JSON.parse(process.env.VCAP_SERVICES);
        var mongo = env['mongodb-1.8'][0]['credentials'];
    }
    else{
        var mongo = {
        "hostname":"localhost",
        "port":27017,
        "username":"",
        "password":"",
        "name":"",
        "db":"db"
        }
    }

    var generate_mongo_url = function(obj){
        obj.hostname = (obj.hostname || 'localhost');
        obj.port = (obj.port || 27017);
        obj.db = (obj.db || 'test');

        if(obj.username && obj.password){
            return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
        }
        else{
            return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
        }
    }

    var mongourl = generate_mongo_url(mongo);

The if statement provides two different sets of information, depending on whether the app is running locally or on AppFog. `generate_mongo_url` creates appropriate connection information for MongoDB, which is then assigned to `mongourl`.

Your app is now configured for MongoDB.

Need a more detailed walkthrough? Keep reading.

## Node.js with MongoDB Walkthrough {#walkthrough}

Before you start, make sure:

* You have [an AppFog account](https://console.appfog.com/signup).
* The [`af` command line tool](/getting-started/af-cli) is installed on your development computer. 
* [Node.js](http://nodejs.org/) is installed on your development computer.
* [MongoDB](http://www.mongodb.org/) is installed on your development computer.

#### Setup

Start `mongod` in your local environment with the following command:

    $ mongod

Confirm that Node.js is installed correctly by starting the interactive javascript console:

    $ node

Hit `Control-C` to exit.

Confirm that Node Package Manager (NPM) is installed:

    $ npm -v
    1.0.6

Log in to AppFog:

    $ af login

#### Write a Basic Node.js App

We'll write a basic Node.js app called `mongo-node-example`.

First, create a directory and change into it:

    $ mkdir mongo-node-example
    $ cd mongo-node-example

Create a file `app.js` with the following code:

    var port = (process.env.VMC_APP_PORT || 3000);
    var host = (process.env.VCAP_APP_HOST || 'localhost');
    var http = require('http');

    http.createServer(function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hello World\n');
    }).listen(port, host);

This creates a Node.js web server using `port 3000` on `localhost` that responds to any `HTTP` request with the string “Hello World”.

Start the Node.js web server locally:

    $ node app.js

In another terminal window send a request:

    $ curl localhost:3000
    Hello World

Alternatively, browse to `http://localhost:3000` to see the response from the web server.

Hit `Control-C` in the first terminal window to stop the web server.

#### Deploy

Next, push the application to AppFog. Hit `Enter` to accept the defaults, but enter a unique name for the app and set up a `mongodb` service:

    $ af push
    Would you like to deploy from the current directory? [Yn]:
    Application Name: mongo-node-example
    Application Deployed URL [mongo-node-example.aws.af.cm]:
    Detected a Node.js Application, is this correct? [Yn]:
    Memory Reservation (64M, 128M, 256M, 512M, 1G) [64M]:
    Creating Application: OK
    Would you like to bind any services to 'mongo-node-example'? [yN]: y
    The following system services are available
    1: mongodb
    2: mysql
    3: postgresql
    4: rabbitmq
    5: redis
    Please select one you wish to provision: 1
    Specify the name of the service [mongodb-example1]:
    Creating Service: OK
    Binding Service [mongodb-example1]: OK
    Uploading Application:
        Checking for available resources: OK
        Packing application: OK
        Uploading (0K): OK
    Push Status: OK
    Staging Application: OK
    Starting Application: OK

#### Test

    $ curl mongo-node-example.aws.af.cm
    Hello World

#### Add MongoDB Configuration

Your app is now deployed and has a new `mongodb` service bound to it, but it's not using the service yet. Next, we'll configure the app to use the MongoDB connection information and credentials, both locally and on AppFog.

Add the following code to the beginning of `app.js`:

    if(process.env.VCAP_SERVICES){
        var env = JSON.parse(process.env.VCAP_SERVICES);
        var mongo = env['mongodb-1.8'][0]['credentials'];
    }
    else{
        var mongo = {
            "hostname":"localhost",
            "port":27017,
            "username":"",
            "password":"",
            "name":"",
            "db":"db"
        }
    }

    var generate_mongo_url = function(obj){
        obj.hostname = (obj.hostname || 'localhost');
        obj.port = (obj.port || 27017);
        obj.db = (obj.db || 'test');

        if(obj.username && obj.password){
            return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
        }
        else{
            return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
        }
    }

    var mongourl = generate_mongo_url(mongo);

The if statement provides two different sets of information, depending on whether the app is running locally or on AppFog. `generate_mongo_url` creates appropriate connection information for MongoDB, which is then assigned to `mongourl`.

#### Test your app locally

    $ node app.js

In another terminal:

    $ curl localhost:3000

The app should return the string “Hello World”.

#### Deploy your update

    $ af update mongo-node-example
    Uploading Application:
        Checking for available resources: OK
        Packing application: OK
        Uploading (1K): OK
    Push Status: OK
    Stopping Application: OK
    Staging Application: OK
    Starting Application: OK

#### Test your app on AppFog

    $ curl mongo-node-example.aws.af.cm
    Hello World

#### Add MongoDB Functionality

Next, install the MongoDB native drivers locally and update the app to use MongoDB.

Install MongoDB native drivers locally:

    $ npm install mongodb

This creates a new local directory called `node_modules` in the app's root.

In `app.js`, create a new function called `record_visit` that stores the server request to MongoDB:

    var record_visit = function(req, res){
        /* Connect to the DB and auth */
        require('mongodb').connect(mongourl, function(err, conn){
            conn.collection('ips', function(err, coll){
                /* Simple object to insert: ip address and date */
                object_to_insert = { 'ip': req.connection.remoteAddress, 'ts': new Date() };

                /* Insert the object then print in response */
                /* Note the _id has been created */
                coll.insert( object_to_insert, {safe:true}, function(err){
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.write(JSON.stringify(object_to_insert));
                res.end('\n');
                });
            });
        });
    }

The `.connect` method connects to MongoDB using either the local or AppFog `mongourl`. Then the `.collection('ips', ...)` method adds the request information to the data that will be committed.

Update the `http.createServer` method so that it calls the `record_visit` function when the server request is made:

    http.createServer(function (req, res) {
        record_visit(req, res);
    }).listen(port, host);

#### Test your app locally

    $ node app.js

and from another terminal:

    $ curl localhost:3000
    {"ip":"127.0.0.1","ts":"2011-12-29T23:22:38.192Z","_id":"4efcf63ecab9a5b41e000001"}

Hit `Control-C` in the first terminal to stop the web server.

#### Test your app on AppFog

    $ af update mongo-node-example
    $ curl mongo-node-example.aws.af.cm
    {"ip":"127.0.0.1","ts":"2011-12-29T23:24:25.199Z","_id":"4efcf6a927996b5f79000001"}

Create a function `print_visits` that prints the last ten visits/requests:

    var print_visits = function(req, res){
        /* Connect to the DB and auth */
        require('mongodb').connect(mongourl, function(err, conn){
            conn.collection('ips', function(err, coll){
                coll.find({}, {limit:10, sort:[['_id','desc']]}, function(err, cursor){
                    cursor.toArray(function(err, items){
                        res.writeHead(200, {'Content-Type': 'text/plain'});
                        for(i=0; i<items.length;i++){
                            res.write(JSON.stringify(items[i]) + "\n");
                        }
                        res.end();
                    });
                });
            });
        });
    }

Update the `createServer` method to call the new `print_visits` function:

    http.createServer(function (req, res) {
        params = require('url').parse(req.url);
        if(params.pathname === '/history') {
            print_visits(req, res);
        }
        else{
            record_visit(req, res);
        }
    }).listen(port, host);

Web server requests will either add the current visit to MongoDB (the default) or, if url includes “/history”, output the last ten visits.

#### Test your app locally

    $ curl localhost:3000
    {"ip":"127.0.0.1","ts":"2011-12-29T23:44:30.254Z","_id":"4efcfb5e2f9d30481f000003"}
    $ curl localhost:3000/history
    {"ip":"127.0.0.1","ts":"2011-12-29T23:44:30.254Z","_id":"4efcfb5e2f9d30481f000003"}
    {"ip":"127.0.0.1","ts":"2011-12-29T23:31:39.339Z","_id":"4efcf85b2f9d30481f000002"}
    {"ip":"127.0.0.1","ts":"2011-12-29T23:31:26.678Z","_id":"4efcf84e2f9d30481f000001"}
    {"ip":"127.0.0.1","ts":"2011-12-29T23:22:38.192Z","_id":"4efcf63ecab9a5b41e000001"}

Stop the application locally and update it on AppFog.

    $ af update mongo-node-example
    Uploading Application:
        Checking for available resources: OK
        Processing resources: OK
        Packing application: OK
    Uploading (8K): OK
    Push Status: OK
    Stopping Application: OK
    Staging Application: OK
    Starting Application: OK

#### Test your app on AppFog

    $ curl mongo-node-example.aws.af.cm/history
    {"ip":"127.0.0.1","ts":"2011-12-29T23:49:46.738Z","_id":"4efcfc9acbfffadc0b000001"}
    {"ip":"127.0.0.1","ts":"2011-12-29T23:24:25.199Z","_id":"4efcf6a927996b5f79000001"}

### PHP {#php}

Connecting your PHP app to a bound MongoDB service is simple:

    $services_json = json_decode(getenv("VCAP_SERVICES"),true);
    $mongo_config = $services_json["mongodb-1.8"][0]["credentials"];

    $username = $mongo_config["username"];
    $password = $mongo_config["password"];
    $hostname = $mongo_config["hostname"];
    $port = $mongo_config["port"];
    $db = $mongo_config["db"];
    $name = $mongo_config["name"]; 

    $connect = "mongodb://${username}:${password}@${hostname}:${port}/${db}";
    $m = new Mongo($connect);
    $db = $m->selectDB($db); 

### Links

For another complete sample app for a Node.js app with MongoDB, check out [our GitHub repo](https://github.com/appfog/af-node-sample-mongodb).

For more information, check out [Cloud Foundry's documentation on MongoDB](http://docs.cloudfoundry.com/services/mongodb/nodejs-mongodb.html).
