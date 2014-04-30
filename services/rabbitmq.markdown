---
title: RabbitMQ
weight: 6
---

## RabbitMQ

[RabbitMQ](http://www.rabbitmq.com/) is a message broker that provides robust messaging services for your apps. With AppFog's RabbitMQ service, you get 10 MB of RAM and 6 concurrent connections per instance. 

* [VCAP\_SERVICES Environment Variable](#rabbitmq-vcap)
* [RabbitMQ with Node Tutorial](#rabbitmq-node-tutorial)

### The VCAP\_SERVICES Environment Variable {#rabbitmq-vcap}

When you provision and bind a service to your app, AppFog creates an environment variable called `VCAP_SERVICES`. For apps that can't be automatically configured, you can find the information your app needs to connect to the database in this variable.

This variable contains a JSON document with a list of all credentials and connection information for the bound services.

Here's an example that of the environment variable for an app that has a RabbitMQ service bound to it:

    {"rabbitmq-2.4":[
        {
            "name":"rabbitmq-example",
            "label":"rabbitmq-2.4",
            "plan":"free",
            "tags":["rabbitmq","rabbitmq-2.4","message-queue","amqp"],
            "credentials":{
                "name":"f5666391-510e-44ba-96cf-12e2d691854f",
                "hostname":"10.7.67.64",
                "host":"10.7.67.64",
                "port":10004,
                "vhost":"v32dc3278e8294672be14eb00083c2a44",
                "username":"u2rOaKWovmj44",
                "user":"u2rOaKWovmj44",
                "password":"pMxGDaMxfvQx4",
                "pass":"pMxGDaMxfvQx4",
                "url":"amqp://u2rOaK:pMxGDaM@10.7.67.64:10004/v32dc327"
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

### RabbitMQ with Node Tutorial {#rabbitmq-node-tutorial}

Let's quickly run through creating a Node.js app that uses RabbitMQ.

#### Create Application Files

Create an app directory and change into it:

    $ mkdir rabbitmq-node
    $ cd rabbitmq-node
    
Create the file `package.json` with the following contents:

    {
        "name":"node-amqp-demo",
        "version":"0.0.1",
        "dependencies": {
            "amqp":">= 0.1.0",
            "sanitizer": "*"
        }
    }

This `package.json` specifies two dependent libraries: `amqp` for message processing and sanitizer to escape `HTML` messages.

Install the dependencies, using `npm`:

    $ npm install

Create `app.js` with the following code:

    var http = require('http');
    var amqp = require('amqp');
    var URL = require('url');
    var htmlEscape = require('sanitizer/sanitizer').escape;

    function rabbitUrl() {
      if (process.env.VCAP_SERVICES) {
        conf = JSON.parse(process.env.VCAP_SERVICES);
        return conf['rabbitmq-2.4'][0].credentials.url;
      }
      else {
        return "amqp://localhost";
      }
    }

    var port = process.env.VCAP_APP_PORT || 3000;

    var messages = [];

    function setup() {

      var exchange = conn.exchange('cf-demo', {'type': 'fanout', durable: false}, function() {

        var queue = conn.queue('', {durable: false, exclusive: true},
        function() {
          queue.subscribe(function(msg) {
            messages.push(htmlEscape(msg.body));
            if (messages.length > 10) {
              messages.shift();
            }
          });
          queue.bind(exchange.name, '');
        });
        queue.on('queueBindOk', function() { httpServer(exchange); });
      });
    }

    function httpServer(exchange) {
      var serv = http.createServer(function(req, res) {
        var url = URL.parse(req.url);
        if (req.method == 'GET' && url.pathname == '/env') {
          printEnv(res);
        }
        else if (req.method == 'GET' && url.pathname == '/') {
          res.statusCode = 200;
          openHtml(res);
          writeForm(res);
          writeMessages(res);
          closeHtml(res);
        }
        else if (req.method == 'POST' && url.pathname == '/') {
          chunks = '';
          req.on('data', function(chunk) { chunks += chunk; });
          req.on('end', function() {
            msg = unescapeFormData(chunks.split('=')[1]);
            exchange.publish('', {body: msg});
            res.statusCode = 303;
            res.setHeader('Location', '/');
            res.end();
          });
        }
        else {
          res.statusCode = 404;
          res.end("This is not the page you were looking for.");
        }
      });
      serv.listen(port);
    }

    console.log("Starting ... AMQP URL: " + rabbitUrl());
    var conn = amqp.createConnection({url: rabbitUrl()});
    conn.on('ready', setup);

    // ---- helpers

    function openHtml(res) {
      res.write("<html><head><title>Node.js / RabbitMQ demo</title></head><body>");
    }

    function closeHtml(res) {
      res.end("</body></html>");
    }

    function writeMessages(res) {
      res.write('<h2>Messages</h2>');
      res.write('<ol>');
      for (i in messages) {
        res.write('<li>' + messages[i] + '</li>');
      }
      res.write('</ol>');
    }

    function writeForm(res) {
      res.write('<form method="post">');
      res.write('<input name="data"/><input type="submit"/>');
      res.write('</form>');
    }

    function printEnv(res) {
      res.statusCode = 200;
      openHtml(res);
      for (entry in process.env) {
        res.write(entry + "=" + process.env[entry] + "<br/>");
      }
      closeHtml(res);
    }

    function unescapeFormData(msg) {
      return unescape(msg.replace('+', ' '));
    }

Push the app to AppFog. For most prompts you can press `Enter` to accept the default value. At the Application Name prompt, enter a unique app name. Also, be sure to create and bind a rabbitmq service, as shown here:

    $ af push
        Would you like to deploy from the current directory? [Yn]:
        Application Name: rabbitmq-node
        Application Deployed URL [rabbitmq-node.aws.af.cm]:
        Detected a Node.js Application, is this correct? [Yn]:
        Memory Reservation (64M, 128M, 256M, 512M) [64M]:
        Creating Application: OK
        Would you like to bind any services to 'rabbitmq-node'? [yN]: y
        Would you like to use an existing provisioned service? [yN]: n
        The following system services are available
        1: mongodb
        2: mysql
        3: postgresql
        4: rabbitmq
        5: redis
        Please select one you wish to provision: 4
        Specify the name of the service [rabbitmq-6c981]:
        Creating Service: OK
        Binding Service [rabbitmq-6c981]: OK
        Uploading Application:
          Checking for available resources: OK
          Processing resources: OK
          Packing application: OK
          Uploading (1K): OK
        Push Status: OK
        Staging Application: OK
        Starting Application: OK

Access the app at the specified URL using your browser. Enter messages in the form and you'll see them echoed in the browser.
