---
title: Python
weight: 3
---

The following is a step-by-step guide to writing and deploying a "hello world" Python Flask app:

### Create the App

Create a directory for the app and change into it: 


    $ mkdir flask-example
    $ cd flask-example

### Prepare Your Environment

<!---Create a `virtualenv` environment:


    $ virtualenv venv
    New python executable in venv/bin/python
    Installing setuptools............done.
    Installing pip...............done.

--->

Note: There is currently an issue with using `virtualenv` in an app directory, so we'll use a workaround. 


    $ mkdir ../flask-example-venv
    $ virtualenv ../flask-example-venv
    New python executable in ../flask-example-venv/bin/python
    Installing setuptools............done.
    Installing pip...............done.

Activate the environment:


    $ . ../flask-example-venv/bin/activate
    (flask-example-venv) $

Use `pip` to install Flask:


    (flask-example-venv) $ pip install Flask
    Downloading/unpacking Flask
    Downloading Flask-0.9.tar.gz (481Kb): 481Kb downloaded
    Running setup.py egg_info for package Flask
    Downloading/unpacking Werkzeug>=0.7 (from Flask)
    Downloading Werkzeug-0.8.3.tar.gz (1.1Mb): 1.1Mb downloaded
    Running setup.py egg_info for package Werkzeug
    Downloading/unpacking Jinja2>=2.4 (from Flask)
    Downloading Jinja2-2.6.tar.gz (389Kb): 389Kb downloaded
    Running setup.py egg_info for package Jinja2
    Installing collected packages: Flask, Werkzeug, Jinja2
    Running setup.py install for Flask
    Running setup.py install for Werkzeug
    Running setup.py install for Jinja2
    Successfully installed Flask Werkzeug Jinja2
    Cleaning up...

Create a file called `wsgi.py` with the following code: 


    from flask import Flask, Request, Response
    application = app = Flask(__name__)

    @app.route('/')
    def hello_world():
        return 'Hello World!'

    if __name__ == '__main__':
        app.run()

### Test Your App Locally


    (flask-example-venv) $ python wsgi.py
     * Running on http://127.0.0.1:5000/

In another terminal:


    $ curl 127.0.0.1:5000
    Hello World!% 

### Prepare Your App for Deployment on AppFog

Create a `requirements.txt` file with the following:


    flask==0.8

### Deploy to Appfog


    af push flask-example
    Would you like to deploy from the current directory? [Yn]:

    Detected a Python WSGI Application, is this correct? [Yn]:
    Application Deployed URL [flask-example.aws.af.cm]:
    Memory reservation (128M, 256M, 512M, 1G, 2G) [64M]:
    How many instances? [1]:
    Bind existing services to 'flask-example'? [yN]:
    Create services to bind to 'flask-example'? [yN]:
    Would you like to save this configuration? [yN]:

    Creating Application: OK
    Uploading Application:
        Checking for available resources: OK
        Processing resources: OK
        Packing application: OK
        Uploading (10M): OK
    Push Status: OK
    Staging Application 'flask-example': OK
    Starting Application 'flask-example': OK

### Test Your App on AppFog:


    $ curl flask-example.aws.af.cm
    Hello World!% 

### Connect Your App to Services

Now we'll connect Flask to a MongoDB service provided by AppFog.

### Bind Service

Use the `af create-service <service> <name> <app>` command to create the `mongodb` service and bind it in one step:


    $ af create-service mongodb mongo-example flask-example
    Creating Service: OK
    Binding Service [mongo-example]: OK
    Stopping Application 'flask-example': OK
    Staging Application 'flask-example': OK
    Starting Application 'flask-example': OK

### Add MongoDB Configuration

Your app now has a new `mongodb` service bound to it, but it's not using the service yet. Next, we’ll configure the app to use the MongoDB connection information and credentials, both locally and on AppFog.

First, add this to `requirements.txt`:


    pymongo==2.1.1

Then add the following to the beginning of `wsgi.py`:


    import time
    import sys
    import os
    import json

And add the following to the end, right before `if __name__ == '__main__':`


    @app.route('/mongo')
    def mongotest():
        from pymongo import Connection
        uri = mongodb_uri()
        conn = Connection(uri)
        coll = conn.db['ts']
        coll.insert(dict(now=int(time.time())))
        last_few = [str(x['now']) for x in coll.find(sort=[("_id", -1)], limit=10)]
        body = "\n".join(last_few)
        return Response(body, content_type="text/plain;charset=UTF-8")

    def mongodb_uri():
        services = json.loads(os.getenv("VCAP_SERVICES", "{}"))
        if services:
            creds = services['mongodb-1.8'][0]['credentials']
            uri = "mongodb://%s:%s@%s:%d/%s" % (
                creds['username'],
                creds['password'],
                creds['hostname'],
                creds['port'],
                creds['db'])
            print >> sys.stderr, uri
            return uri
        else:
            uri = "mongodb://localhost:27017"

We also need to install `pymongo` for our local test:


    $ pip install pymongo
    Downloading/unpacking pymongo
    Downloading pymongo-2.2.1.tar.gz (230Kb): 230Kb downloaded
    Running setup.py egg_info for package pymongo

    Installing collected packages: pymongo
    Running setup.py install for pymongo
    ...
    Successfully installed pymongo
    Cleaning up...

### Test Your App Locally


    (flask-example-venv) $ python wsgi.py
     * Running on http://127.0.0.1:5000/

In another terminal:


    $ curl 127.0.0.1:5000/mongo
    1342592886% 

### Deploy to AppFog


    $ af update flask-example
    Uploading Application:
        Checking for available resources: OK
        Processing resources: OK
        Packing application: OK
        Uploading (10M): OK
    Push Status: OK
    Stopping Application 'flask-example': OK
    Staging Application 'flask-example': OK
    Starting Application 'flask-example': OK

### Test Your App on AppFog


    $ curl flask-example.aws.af.cm/mongo
    1342483543%
