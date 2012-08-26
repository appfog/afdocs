---
title: PostgreSQL
weight: 1
---

AppFog provides a PosgreSQL service that's accessible to apps that are running on any of the supported runtimes and frameworks. 

* [VCAP_SERVICES](#vcap)
* [PHP](#php)
* [Ruby](#ruby)

# The VCAP\_SERVICES Environment Variable {#vcap}

When you provision and bind a service to your app, AppFog creates an environment variable called `VCAP_SERVICES`. For apps that can't be automatically configured, you can find the information your app needs to connect to the database in this variable.

This variable contains a JSON document with a list of all credentials and connection information for the bound services.

Here's an example that of the environment variable for an app that has two MySQL database services bound to it:


    {"postgresql-9.1":[
        {
            "name":"postgresql-5633b",
            "label":"postgresql-9.1",
            "plan":"free",
            "tags":["postgresql","postgresql-9.1","relational"],
            "credentials":{
                "name":"d19a133d77da6470383d825e0bc56f7a7",
                "host":"10.0.48.220",
                "hostname":"10.0.48.220",
                "port":5432,
                "user":"ub3df122ceb05491899e0f227634a859f",
                "username":"ub3df122ceb05491899e0f227634a859f",
                "password":"p0d09ed1578024aebb700057d398cd24b"
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

# PHP {#php}

Connecting your PHP app to a bound PostgreSQL service is simple:


    $services_json = json_decode(getenv("VCAP_SERVICES"),true);
    $postgresql_config = $services_json["postgresql-9.1"][0]["credentials"];

    $username = $postgresql_config["username"];
    $password = $postgresql_config["password"];
    $hostname = $postgresql_config["hostname"];
    $port = $postgresql_config["port"];
    $db = $postgresql_config["name"];

    $link = pg_connect("host=$hostname port=$port dbname=$db user=$username password=$password");

# Ruby {#ruby}

Connecting your Ruby app to a bound PostgreSQL service is simple:


    require "pg"

    services = JSON.parse(ENV['VCAP_SERVICES'])
    postgresql_key = services.keys.select { |svc| svc =~ /postgresql/i }.first
    postgresql = services[postgresql_key].first['credentials']
    postgresql_conn = {:host => postgresql['hostname'], :port => postgresql['port'], :username => postgresql['user'], :password => postgresql['password'], :dbname => postgresql['name']}
    connection = PG.connect(postgresql_conn)
