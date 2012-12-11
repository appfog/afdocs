---
layout: doc-page
title: Node
weight: 1
---

* [Supported Versions](#node-supported-versions)
* [Deployment](#node-deployment)
* [Dependency Management](#node-dep-mgmt)
* [CoffeeScript](#node-coffee-script)
* ["Hello World" Walkthrough](#node-walkthrough)

### Supported Versions {#node-supported-versions}

For the most reliable development experience, make sure you have the same version of Node.js installed on your local development environment as your target AppFog instance. You can check the available runtimes by running:

    $ af runtimes
    
    +--------------+-----------------+-----------+
    | Name         | Description     | Version   |
    +--------------+-----------------+-----------+
    | java         | Java 7          | 1.7.0     |
    | php          | PHP 5           | 5.3       |
    | ruby18       | Ruby 1.8.7      | 1.8.7     |
    | ruby192      | Ruby 1.9.2      | 1.9.2p180 |
    | ruby193      | Ruby 1.9.3 p125 | 1.9.3     |
    | python2      | Python 2.7.3    | 2.7.3     |
    | node04       | Node.js 0.4.12  | 0.4.12    |
    | node06       | Node.js 0.6.17  | 0.6.17    |
    | erlangR14B02 | Erlang R14B02   | R14B02    |
    +--------------+-----------------+-----------+

You can download and install the [specific version of Node.js](https://github.com/joyent/node/tags).

Target a specific runtime when you deploy by using the runtime flag. For example, to use Node 0.6.17:

    $ af push --runtime=node06

## Deployment {#node-deployment}

When you deploy a Node.js app to AppFog, the stager runs the first of the following files it finds:

* server.js 
* app.js 
* index.js 
* main.js 
* application.js

Alternatively, you can specify the startup file in your `package.json` file, by specifying the `start` command under the `scripts` key:

    {
        "name": "test-app",
        "version": "0.0.1",
        "scripts": {
            "start": "node server.js"
        }
        ....
    }
 
## Dependency Management {#node-dep-mgmt}

AppFog supports [npm](https://npmjs.org/) (Node Package Manager). 

You can install your dependencies to your local machine in one of two ways: directly or by using a `package.json` file that names all of your dependencies. 

Direct installation of `express`, for example, would look like this: 

    $ npm install express

Or you can have a `package.json` file that names the dependency: 

    {
        "name":"hello-node",
        "version":"0.0.1",
        "dependencies":{
            "express":""
        }
    }

Once you have the `package.json` file ready, you can simply run:

    $ npm install

This will install all of the packages named in `package.json`.

Both of these installation methods will create a directory called `node_modules` which will include the entire contents of all of your dependencies. When you deploy your code with an `af push`, AppFog simply uploads your app, including the entire `node_modules` directory.

### npm shrinkwrap

AppFog also supports [npm shrinkwrap](https://npmjs.org/doc/shrinkwrap.html). This means that you can instruct AppFog to rebuild the modules, which you'll want to do if your app has any native dependencies, for example.

To make use of this feature, simply run:

    $ npm shrinkwrap

This command looks at your `node_modules` directory and generates an `npm-shrinkwrap.json` file, which reflects the whole tree of dependencies with fixed versions. This functions as a snapshot of your app's dependencies in much the same way that `Gemfile.lock` does for Ruby apps. This file guarantees that AppFog provides the exact node module versions to avoid compatibility issues.

If you deploy your app with those conditions in place, AppFog will install the node modules to the app during the staging process. If the require node module doesn't work with the node engine that the app is running on, however, AppFog will not install the module.

## CoffeeScript {#node-coffee-script}

You can deploy a [CoffeeScript]() Node app to AppFog by using a shim file to load the CoffeeScripts.

Assuming you have two files, `app.coffee` and `app.js`, `app.js` can simply look like this: 

    require('coffee-script');
    require('./app')

The `app.coffee` file is what you would normally run with `coffee app.coffee`. Make sure `coffee-script` is also in your `node-modules` directory. Requiring the `coffee-script` module will enhance node's `require` functionality and compile the coffee files at require time.

## "Hello World" Walkthrough {#node-walkthrough}

The following is a step-by-step guide to writing and deploying a “hello world” Node.js web server app with the [Express](http://expressjs.com/) web module:

### Create the App

Create a directory for the app and change into it:

    $ mkdir hello-node
    $ cd hello-node

Create a `package.json` file with the following contents:

    {
        "name":"hello-node",
        "version":"0.0.1",
        "dependencies":{
            "express":""
        }
    }

Use `npm` (Node Package Manager) to install the dependencies named in `package.json`:

    $ npm install

Create a file called `app.js` with the following code:

    var app = require('express').createServer();
    app.get('/', function(req, res) {
        res.send('Hello from AppFog');
    });
    app.listen(process.env.VCAP_APP_PORT || 3000);

Notice that AppFog passes the listen port for your app in an environment variable, accessed by `process.env.VCAP_APP_PORT`.

### Deploy the App

    $ af login

Push the app. You can hit `Enter` to accept the defaults at most of the prompts, but be sure to enter a unique `URL` for the app. Here's an example push:

    $ af push
    Would you like to deploy from the current directory? [Yn]:
    Application Name: hello-node
    Detected a Node.js Application, is this correct? [Yn]:
    Application Deployed URL [hello-node.aws.af.cm]:
    Memory reservation (128M, 256M, 512M, 1G, 2G) [64M]:
    How many instances? [1]:
    Bind existing services to 'hello-node'? [yN]:
    Create services to bind to 'hello-node'? [yN]:
    Would you like to save this configuration? [yN]:
    Creating Application: OK
    Uploading Application:
        Checking for available resources: OK
        Processing resources: OK
        Packing application: OK
        Uploading (255K): OK
    Push Status: OK
    Staging Application 'hello-node': OK
    Starting Application 'hello-node': OK

Hit the app in your browser, `http://hello-node.aws.af.cm`, in this example.

## Environments in Express {#express}

Express supports arbitrary environments, like `production` and `development`. You can use the `configure()` method to set different configurations under the different environments. Here, we'll bind a `mongodb` service to the app to demonstrate.

### Bind Service

Use the `af create-service <service> <name> <app>` command to create the `mongodb` service and bind it in one step:

    $ af create-service mongodb mongo-example hello-node
    Creating Service: OK
    Binding Service [mongo-example]: OK
    Stopping Application 'hello-node': OK
    Staging Application 'hello-node': OK
    Starting Application 'hello-node': OK

### Add MongoDB Configuration

Your app now has a new `mongodb` service bound to it, but it's not using the service yet. Next, we’ll configure the app to use the MongoDB connection information and credentials, both locally and on AppFog.

Add the following code to the beginning of `app.js`, right after the line `var app = require('express').createServer();`:

    var app = require('express').createServer();
    var mongo;
    app.configure('development', function(){
        mongo = {
            "hostname":"localhost",
            "port":27017,
            "username":"",
            "password":"",
            "name":"",
            "db":"db"
        }
    });
    app.configure('production', function(){
        var env = JSON.parse(process.env.VCAP_SERVICES);
        mongo = env['mongodb-1.8'][0]['credentials'];
    });

    var generate_mongo_url = function(obj){
        obj.hostname = (obj.hostname || 'localhost');
        obj.port = (obj.port || 27017);
        obj.db = (obj.db || 'test');

        if(obj.username && obj.password){
            return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
        }else{
            return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
        }
    }

    var mongourl = generate_mongo_url(mongo);

Now the app is set to connect to the local `mongodb` server when it's in `development` mode. In production mode, it's set to connect to the AppFog service that's bound to the app, by parsing `VCAP_SERVICES` variable.


### Add MongoDB Functionality

Next, install the MongoDB native drivers locally and update the app to use MongoDB.

Install MongoDB native drivers locally:

    $ npm install mongodb

This adds a new local directory called `mongodb` in the `node_modules` directory.

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

Update the `app.get` method so that it calls the `record_visit` function when the server request is made:

    app.get('/', function(req, res) {
        record_visit(req, res);
    });
    app.listen(process.env.VCAP_APP_PORT || 3000);

### Test Your App Locally

    $ mongod

and from another terminal:

    $ node app.js

and from a third terminal:

    $ curl localhost:3000
    {"ip":"127.0.0.1","ts":"2011-12-29T23:22:38.192Z","_id":"4efcf63ecab9a5b41e000001"}

Hit `Control-C` in the first terminal to stop the web server.

### Production Environment Variable

Next, add the `NODE_ENV` environment variable to the app deployment and set it to `production` so that Express knows to run the app in `production` mode:

    $ af env-add hello-node NODE_ENV=production
    Adding Environment Variable [NODE_ENV=production]: OK
    Stopping Application 'hello-node': aOK
    Staging Application 'hello-node': OK
    Starting Application 'hello-node': OK

### Test Your App on AppFog

    $ af update hello-node
    Uploading Application:
        Checking for available resources: OK
        Processing resources: OK
        Packing application: OK
        Uploading (1M): OK
    Push Status: OK
    Stopping Application 'hello-node': OK
    Staging Application 'hello-node': OK
    Starting Application 'hello-node': OK

    $ curl hello-node.aws.af.cm
    {"ip":"127.0.0.1","ts":"2011-12-29T23:24:25.199Z","_id":"4efcf6a927996b5f79000001"}
