---
title: Grails
weight: 2
---

## Java Grails Apps

[Grails](http://grails.org/) is a framework for rapidly developing web apps that can be deployed to any Java servlet container, such as Tomcat. Based on the dynamic language [Groovy](http://groovy.codehaus.org/) and the [Spring](http://www.springframework.org/) framework, it brings the paradigm of Convention over Configuration to the Java platform with the expressiveness of a Java-like dynamic language.

This guide assumes that you already have Java and [Grails](http://grails.org/Installation) installed and know how to build a simple Grails app. That’s all you need to start working with AppFog.

* [Services](#grails-services)
* [Deployment](#deployment)
* [Further Reading](#further-reading)

### Services {#grails-services}

AppFog provides a rich set of services, all of which can be used by Grails apps: MySQL, PostgreSQL, MongoDB, Redis, and RabbitMQ. Each of these services has a corresponding Grails plug-in. When these plug-ins are installed, you don’t have to configure any connection settings for the associated AppFog service - it’s done all automatically when your app is deployed. And when you first deploy your app with cf-push, Grails will ask you whether you want to create and bind the relevant services based on which plug-ins you have installed.

#### SQL services

Currently, you can either use MySQL or Postgres on AppFog if you want a relational database for your app. All you need to access them is the [Hibernate plug-in](http://grails.org/plugin/hibernate), which is included by default in all new Grails apps. You also need to make sure that the relevant driver is available to your app, for example by declaring it in `BuildConfig.groovy`:

    grails.project.dependency.resolution = {
        ...
        dependencies {
            runtime "mysql:mysql-connector-java:5.1.18"
            ...
        }
    }

and that the JDBC driver class is set in `DataSource.groovy`:

    environments {
        production {
            dataSource {
                driverClassName = "com.mysql.jdbc.Driver"
                ...
            }
        }
    }

In this case, we’re going to deploy the app for the standard production environment, but you could easily set up a ‘cloud’ or similar environment. Also, you can easily configure the JDBC URL, username and password for the production environment to point to a local MySQL database because those settings are overridden when the app is deployed to AppFog.

To use the key-value store [Redis](http://redis.io/), you need to either install the [Redis plug-in](http://grails.org/plugin/redis) or [Redis for GORM](http://grails.org/plugin/redis-gorm). As with the SQL stores, when you deploy your app to AppFog it will automatically use whichever Redis service has been bound to it.

The former plug-in provides low-level access to Redis via a `redis` bean, while the latter allows you to map GORM domain classes to Redis. See the [plug-in documentation](http://grails.github.com/inconsequential/redis/manual/index.html) for more information.

#### MongoDB

To use the document store [MongoDB](http://www.mongodb.org/), just install the [MongoDB](http://grails.org/plugin/mongodb) plug-in.

The MongoDB plug-in for Grails allows you to map GORM entities to MongoDB Collections. It also provides a low-level API for accessing the MongoDB driver for Java directly. Refer to the [plug-in documentation](http://grails.github.com/inconsequential/mongo/manual/index.html) for more information.

### Deployment {#deployment}

Deploying your Grails app to AppFog is simple. Just generate your `.war` file, then push:

    $ grails prod war
    | Done creating WAR target/af-java-grails-example-0.1.war
    $ cd target
    $ af push
    Would you like to deploy from the current directory? [Yn]:
    Application Name: grails-example
    Detected a Java SpringSource Grails Application, is this correct? [Yn]:
    1: AWS US East - Virginia
    2: AWS EU West - Ireland
    3: AWS Asia SE - Singapore
    Select Infrastructure: 1
    Application Deployed URL [grails-example.aws.af.cm]:
    Memory reservation (128M, 256M, 512M, 1G, 2G) [512M]:
    How many instances? [1]:
    Bind existing services to 'grails-example'? [yN]:
    Create services to bind to 'grails-example'? [yN]: y
    1: mongodb
    2: mysql
    3: postgresql
    What kind of service?: 2
    Specify the name of the service [mysql-6dc25]:
    Create another? [yN]:
    Would you like to save this configuration? [yN]:
    Creating Application: OK
    Creating Service [mysql-6dc25]: OK
    Binding Service [mysql-6dc25]: OK
    Uploading Application:
      Checking for available resources: OK
      Processing resources: OK
      Packing application: OK
      Uploading (11K): OK
    Push Status: OK
    Staging Application 'grails-example': OK
    Starting Application 'grails-example': OK

### Further Reading {#further-reading}

For more information, check out [Cloud Foundry's documentation on Grails](http://docs.cloudfoundry.com/frameworks/java/spring/grails.html).
