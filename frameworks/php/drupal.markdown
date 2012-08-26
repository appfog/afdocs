---
title: Drupal
weight: 2
---

### Persistent Data Storage

AppFog does not yet have a persistent data storage system, though we're working on it. This means that the file system is volatile and any data that needs to be persistent should be included in the code base (by making all changes in a local development environment) or offloaded to a database or an external storage system like Amazon's S3.  

### Services

You can connect your PHP app to AppFog services by using the `VCAP_SERVICES` environment variable, which becomes available to your app when you bind a service to it. You can access the variable in PHP like this: 


    getenv('VCAP_SERVICES')

For more information on this, check out our [Services Overview](/services/overview) page.

# Drupal {#drupal}

The following is a step-by-step guide to deploying a Drupal app to AppFog.

### Download Drupal

[Download Drupal](http://drupal.org/project/download/), unzip it to a new directory, and change into that directory.

Then create your `settings.php` file:


    $ cp ./sites/default/default.settings.php ./sites/default/settings.php

### Services

In `settings.php`, replace `$databases = array();` with:


    $services = getenv('VCAP_SERVICES'); 
    $services_json = json_decode($services,true); 
    $mysql_config = $services_json["mysql-5.1"][0]["credentials"]; 
    $databases['default']['default'] = array( 
        'driver' => 'mysql',
        'database' => $mysql_config["name"],
        'username' => $mysql_config["user"],
        'password' => $mysql_config["password"],
        'host' => $mysql_config["hostname"],
        'port' => $mysql_config["port"],
    );

### Deploy to AppFog

Push your code, making sure to create and bind a new MySQL service to the app:

    $ af push

### Finish the Drupal Install

Point your browser to your app's install script, in this case drupal-example.aws.af.cm/install.php. That should take you through the rest of the install process. 

### Further Developement

AppFog does not yet have a persistent data storage system, though we're working on it. This means that the file system is volatile and any changes made to the file system by the app will be lost on an app start, stop, or deploy. 

This means you should do any development that makes changes to the file system in a local development environment and then push those changes to AppFog using an `af update`. You can sync any database changes by [tunneling](/services/tunneling).
