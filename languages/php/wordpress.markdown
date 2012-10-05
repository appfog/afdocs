---
title: WordPress
weight: 1
---

## Persistent Data Storage

AppFog does not yet have a persistent data storage system, though we're working on it. This means that the file system is volatile and any data that needs to be persistent should be included in the code base (by making all changes in a local development environment) or offloaded to a database or an external storage system like Amazon's S3.  

## Services

You can connect your PHP app to AppFog services by using the `VCAP_SERVICES` environment variable, which becomes available to your app when you bind a service to it. You can access the variable in PHP like this: 


    getenv('VCAP_SERVICES')

For more information on this, check out our [Services Overview](/services/overview) page.

## WordPress {#wordpress}

The following is a step-by-step guide to deploying a WordPress app to AppFog.

### Download Wordpress

[Download WordPress](http://wordpress.org/download/), unzip it to a new directory, and change into that directory.

Then create your `wp-config.php` file:


    $ cp wp-config-sample.php wp-config.php

### Services

In `wp-config.php`, replace: 


    /** The name of the database for WordPress */
    define('DB_NAME', 'database_name_here');

    /** MySQL database username */
    define('DB_USER', 'username_here');

    /** MySQL database password */
    define('DB_PASSWORD', 'password_here');

    /** MySQL hostname */
    define('DB_HOST', 'localhost');

with: 


    $services = getenv("VCAP_SERVICES");
    $services_json = json_decode($services,true);
    $mysql_config = $services_json["mysql-5.1"][0]["credentials"];

    define('DB_NAME', $mysql_config["name"]);
    define('DB_USER', $mysql_config["user"]);
    define('DB_PASSWORD', $mysql_config["password"]);
    define('DB_HOST', $mysql_config["hostname"]);
    define('DB_PORT', $mysql_config["port"]);

### Deploy to AppFog


    $ af push wordpress-example
    Would you like to deploy from the current directory? [Yn]:
    Detected a PHP Application, is this correct? [Yn]:
    Application Deployed URL [wordpress-example.aws.af.cm]:
    Memory reservation (128M, 256M, 512M, 1G, 2G) [128M]:
    How many instances? [1]:
    Bind existing services to 'wordpress-example'? [yN]:
    Create services to bind to 'wordpress-example'? [yN]: y
    1: mongodb
    2: mysql
    3: postgresql
    What kind of service?: 2
    Specify the name of the service [mysql-d197d]:
    Create another? [yN]:
    Would you like to save this configuration? [yN]:
    Creating Application: OK
    Creating Service [mysql-d197d]: OK
    Binding Service [mysql-d197d]: OK
    Uploading Application:
        Checking for available resources: OK
        Processing resources: OK
        Packing application: OK
        Uploading (5M): OK
    Push Status: OK
    Staging Application 'wordpress-example': OK
    Starting Application 'wordpress-example': OK

### Finish the WordPress Install

Point your browser to your app's install script, in this case wordpress-example.aws.af.cm/wp-admin/install.php. That should take you through the rest of the install process. 

## Further Development

AppFog does not yet have a persistent data storage system, though we're working on it. This means that the file system is volatile and any changes made to the file system by the app will be lost on an app start, stop, or deploy. 

This means you should do any development that makes changes to the file system in a local development environment and then push those changes to AppFog using an `af update`. You can sync any database changes by [tunneling](/services/tunneling).
