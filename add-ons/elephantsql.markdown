---
title: ElephantSQL
weight: 8
---

## ElephantSQL

### Intro

[ElephantSQL](http://www.elephantsql.com) is a hosted [PostgreSQL](http://www.postgresql.org) service. PostgreSQL is an advanced, fast, reliable and open source SQL server. ElephantSQL hosts PostgreSQL servers in EC2, close to where you're app is run, for lowest possible latency. 

### Why use ElephantSQL?

ElephantSQL can make sure you a have as large of a database as your application needs. With persistent storage backup and disaster recovery automatically enabled, never fret about your database’s safety.

### Install ElephantSQL

In the [AppFog console](https://console.appfog.com/), select the application you wish to setup.
Navigate to the “Add-ons” tab and click “Install” for the ElephantSQL add-on.

If you need to install PostgreSQL for local development see Additional Resources below.

### Use ElephantSQL

Installing the ElephantSQL add-on automatically sets an environment variable for your app call `ELEPHANTSQL_URL` . This variable includes the full URI including the hostname, database path, username, and password. 

### ElephantSQL management interface

You can take a look at your ElephantSQL management console by going to your app in the [AppFog console](https://console.appfog.com/) Add-ons tab, and click “Manage”.

### Included Allotment

20 MB max database size
4 concurrent connections

### Additional Resources

* [PostgreSQL Download](http://www.postgresql.org/download/)
* [ElephantSQL Documentation](http://www.elephantsql.com/docs/index.html)
* [AppFog PostgreSQL Documentation](https://docs.appfog.com/services/postgresql)
