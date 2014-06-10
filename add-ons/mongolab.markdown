---
title: MongoLab
weight: 16
---

## MongoLab

### Intro

[MongoLab](https://mongolab.com/) is a cloud [MongoDB](https://www.mongodb.org/)-as-a-Service

### Why use MongoLab

If you require an efficient, scalable MongoDB service in the cloud for your app with a management console, backups, and high availability.

### Install MongoLab

In the [AppFog console](https://console.appfog.com/), select the application you wish to setup.
Navigate to the “Add-ons” tab and click “Install” for the MongoLab add-on.

### Use MongoLab

Installing MongoLab automatically adds an environment variable to your app called `MONGOLAB_URL` . This variable includes the full URI including the hostname, database path, username and password.
It looks like this: 

    mongodb://username:password@host:port/database

You can find more information on using MongoDB with your AppFog app [here](https://docs.appfog.com/services/mongodb).

With MongoLab you are allotted a 512MB sandbox database to play with while evaluating the service.

### MongoLab Admin Panel

In the "Add-ons" tab in your app [console](https://console.appfog.com/), click on the "Manage" button for the MongoLab add-on. This will take you to your MongoLab account where you can make configuration changes and upgrade your MongoLab account.

### Included Allotment

RAM cache: Variable
Storage: 0.5 GB

### Additional Resources

* [MongoDB Documentation](http://docs.mongodb.org/)
* [AppFog MongoDB Documentation](https://docs.appfog.com/services/mongodb)
* [MongoLab Documentation](http://docs.mongolab.com/)
