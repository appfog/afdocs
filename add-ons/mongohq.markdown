---
title: MongoHQ
weight: 3
---

## MongoHQ

### Install MongoHQ

In the "Add-ons" tab in your app console click "Install" for the MongoHQ add-on. That's it!

Installing the MongoHQ add-on automatically sets an environment variable for your app called "`MONGOHQ_URL`". You can access this in your code with `getenv(["MONGOHQ_URL")`. This variable includes the full URI including the hostname, database path, username and password. It looks like this: 


    mongodb://username:password@host:port/database

Using MongoDB from a PHP app is very easy. The required extensions are already installed on all servers, so you can use the Mongo objects from your app immediately. Here is a little sample app you can use to test out your newly created MongoDB:


    <?php
        // connect
        $m = new Mongo(getenv("MONGOHQ_URL"));
        
        // select a database
        $db = $m->comedy;
        
        // select a collection (analogous to a relational database's table)
        $collection = $db->cartoons;
        
        // add a record
        $obj = array( "title" => "Calvin and Hobbes", "author" => "Bill Watterson" );
        $collection->insert($obj);
        
        // add another record, with a different "shape"
        $obj = array( "title" => "XKCD", "online" => true );
        $collection->insert($obj);
        
        // find everything in the collection
        $cursor = $collection->find();
        
        // iterate through the results
        foreach ($cursor as $obj) {
            echo $obj["title"] . "\n";
        }
    ?>

You can find more information on using a MongoDB from a PHP app [here](http://php.net/manual/en/class.mongodb.php).

### MongoHQ Admin Panel

In the "Add-ons" tab in your app console, click on the "Manage" button for the MongoHQ add-on. This will take you to your MongoHQ account where you can make configuration changes and upgrade your MongoHQ account.
