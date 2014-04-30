---
title: MySQL
weight: 2
---

## MySQL

* [VCAP_SERVICES](#vcap)
* [PHP](#php)
* [Migration](#migration)
* [phpMyAdmin](#phpmyadmin)

AppFog provides a MySQL service that's accessible to apps that are running on any of the supported runtimes and frameworks. 

The AppFog app deployment process can automatically configure your app to use the bound MySQL service. Check the doc page for your app's framework to learn more about auto-reconfiguration. 

Note: AppFog apps should always close database connections and should not use persistent MySQL connections.

### The VCAP\_SERVICES Environment Variable {#vcap}

When you provision and bind a service to your app, AppFog creates an environment variable called `VCAP_SERVICES`. For apps that can't be automatically configured, you can find the information your app needs to connect to the database in this variable.

This variable contains a JSON document with a list of all credentials and connection information for the bound services.

Here's an example that of the environment variable for an app that has two MySQL database services bound to it:

    {"mysql-5.1":[
        {
            "name":"mysql-4f700",
            "label":"mysql-5.1",
            "plan":"free",
            "tags":["mysql","mysql-5.1","relational"],
            "credentials":{
                "name":"d6d665aa69817406d8901cd145e05e3c6",
                "hostname":"mysql-node01.us-east-1.aws.af.cm",
                "host":"mysql-node01.us-east-1.aws.af.cm",
                "port":3306,
                "user":"uB7CoL4Hxv9Ny",
                "username":"uB7CoL4Hxv9Ny",
                "password":"pzAx0iaOp2yKB"
            }
        },
        {
            "name":"mysql-f1a13",
            "label":"mysql-5.1",
            "plan":"free",
            "tags":["mysql","mysql-5.1","relational"],
            "credentials":{
                "name":"db777ab9da32047d99dd6cdae3aafebda",
                "hostname":"mysql-node01.us-east-1.aws.af.cm",
                "host":"mysql-node01.us-east-1.aws.af.cm",
                "port":3306,
                "user":"uJHApvZF6JBqT",
                "username":"uJHApvZF6JBqT",
                "password":"p146KmfkqGYmi"
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

You can distinguish between multiple MySQL instances using the  value of the `name` key.

The `credentials` object contains all of the data you need to connect to MySQL through a driver or library.

* `hostname` and `host` have the same value, which is the host where the MySQL server is running.
* `port` is the port where MySQL server accepts connections on the host.
* `user` and `username` are the name of the MySQL database user.
* `password` is the MySQL password.
* `name` is the name of the MySQL database.

### PHP {#php}

Here's a bit more on how to use the `VCAP_SERVICES` variable to access your MySQL service: 

    $services_json = json_decode(getenv("VCAP_SERVICES"),true);
    $mysql_config = $services_json["mysql-5.1"][0]["credentials"];

    $username = $mysql_config["username"];
    $password = $mysql_config["password"];
    $hostname = $mysql_config["hostname"];
    $port = $mysql_config["port"];
    $db = $mysql_config["name"];

    $link = mysql_connect("$hostname:$port", $username, $password);
    $db_selected = mysql_select_db($db, $link);

### Migration {#migration}

Here's a quick guide on migrating an existing database to an AppFog app. 

#### Prepare your data

First, export your MySQL data into a `.sql` file. If you're using phpMyAdmin, you can just use the export tool. If you're using command line tools like `mysqldump`, use the following:

    $ mysqldump -h <hostname> -u <username> -p<Password> <database> > /tmp/mydata.sql

#### Log in and establish your tunnel

    $ af login
    Attempting login to [https://api.appfog.com]
    Email: example@appfog.com
    Password: **************
    Successfully logged into [https://api.appfog.com]

    $ af tunnel
    1: exampleapp1-mysql
    Which service to tunnel to?: 1
    Password: ********
    Getting tunnel connection info: OK

    Service connection info:
    username : uaLDy9EhhvMLq
    password : p5Odjf6E5O7uW
    name : dc1aaa897343f4eb1aed047ec7c86f19f

    Starting tunnel to exampleapp1-mysql on port 10000.
    1: none
    2: mysql
    Which client would you like to start?: 1

Check out our [doc on tunneling](/services/tunneling) for more info.

#### Import

At this point, you can access your AppFog MySQL server as if it's a local MySQL instance.

    mysql --protocol=TCP --host=localhost --port=10000 --user=uaLDy9EhhvMLq --password=p5Odjf6E5O7uW dc1aaa897343f4eb1aed047ec7c86f19f

Import the data by running this command:

    mysql --protocol=TCP --host=localhost --port=10000 --user=uaLDy9EhhvMLq --password=p5Odjf6E5O7uW dc1aaa897343f4eb1aed047ec7c86f19f < /tmp/mydata.sql

### phpMyAdmin {#phpmyadmin}

You can easily create a [phpMyAdmin](http://www.phpmyadmin.net/home_page/index.php) instance to interface with your MySQL services. 

#### Create the App on AppFog

Head over to the [AppFog Console](http://console.appfog.com) and create a new PHP app on the same infrastructure as your MySQL service. 

Then bind the service you want to access to this new PHP app. 

    $ af bind-service mysql-example myadmin-example

#### Download phpMyAdmin

Then grab the phpMyAdmin source from our GitHub repo: 

    $ git clone git://github.com/appfog/af-php-myadmin.git

Change into the directory:

    $ cd af-php-myadmin

Add a username and password to the `.htpasswd' file: 

{: .prettyprint }
    $ htpasswd ./.htpasswd <username>

(You'll be prompted for a password).

Next, update the plain PHP app:

    $ af update myadmin-example
    Uploading Application:
        Checking for available resources: OK
        Processing resources: OK
        Packing application: OK
        Uploading (3M): OK
    Push Status: OK
    Stopping Application 'myadmin-example': OK
    Staging Application 'myadmin-example': OK
    Starting Application 'myadmin-example': OK

That's it! You can now visit your new phpMyAdmin app in your browser.
