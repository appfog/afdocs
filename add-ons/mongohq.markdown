---
title: MongoHQ
weight: 15
---

## MongoHQ

### Intro

[MongoHQ](http://www.mongohq.com/) is a hosted [MongoDB](https://www.mongodb.org/) service that allows you to scale with your application.

### Why use MongoHQ?

If you require a fully managed MongoDB service with great dashboard a monitoring tools.

### Install MongoHQ

In the [AppFog console](https://console.appfog.com/), select the application you wish to setup.
Navigate to the “Add-ons” tab and click “Install” for the MongoHQ add-on.

## Using MongoHQ

Installing MongoHQ automatically adds an environment variable to your app called `MONGOHQ_URL` . This variable includes the full URI including the hostname, database path, username and password.
It looks like this: 

    mongodb://username:password@host:port/database

You can find more information on using MongoDB with your AppFog app [here](https://docs.appfog.com/services/mongodb).

### MongoHQ Admin Panel

In the "Add-ons" tab in your app [console](https://console.appfog.com/), click on the "Manage" button for the MongoHQ add-on. This will take you to your MongoHQ account where you can make configuration changes and upgrade your MongoHQ account.

### Included Allotment

512 MB max database size

### Additional Resources

* [MongoDB Documentation](http://docs.mongodb.org/)
* [AppFog MongoDB Documentation](https://docs.appfog.com/services/mongodb)
* [MongoHQ Documentation](http://docs.mongohq.com/)
