---
title: Searchify
weight: 19
---

## Searchify

### Intro

[Searchify](http://www.searchify.com) adds full text search to your application without having to configure or host your own search infrastructure. Fast real time search, with most queries answered in under 100 milliseconds.

### Why use Searchify

If you need the power of search within your application, without dealing with Solr or Lucene.

### Install Searchify

In the [AppFog console](https://console.appfog.com/), select the application you wish to setup.
Navigate to the “Add-ons” tab and click “Install” for the Searchify add-on.

You will need to install the appropriate language client library to use Searchify locally.

Searchify client libraries (or REST Docs):
* [PHP](http://www.searchify.com/documentation/php-client)
* [Ruby](http://www.searchify.com/documentation/ruby-client)
* [Python](http://www.searchify.com/documentation/python-client)
* [Java](http://www.searchify.com/documentation/java-client)
* Searchify's [REST API](http://www.searchify.com/documentation/api).

### Use Searchify

Installing the Searchify add-on creates an account with Searchify associated with your AppFog account. By default it creates one empty index called ‘idx’ which you can use, rename or delete. 
In addition an environment variable is automatically added to your app called `SEARCHIFY_API_URL`.
This variable includes the private API URL used to access the newly provisioned Searchify account.

Searchify offers plans based on the number of documents stored. If you outgrow the limits of your current Searchify plan, you can change to a larger plan. A list of all plans available can be found [here](http://www.searchify.com/plans).

For more information on the features available from Searchify, including faceting, geolocation, snippets, autocomplete, and custom scoring functions, please see [the documentation](http://www.searchify.com/documentation).

### Searchify Dashboard

The Searchify dashboard allows you to manage indices, allowing you to create, delete, and search indices.  Custom scoring functions can also be configured. To access your Searchify dashboard, simply click the "Manage" button of the Searchify add-on in the "Add-ons" tab on your app [console](https://console.appfog.com/).

### Included Allotment

Plan
-2 indexes
-5000 documents
-Unlimited daily queries

### Additional Resources

* [Searchify Documentation](http://www.searchify.com/documentation/)
* [Searchify Client Libraries](http://www.searchify.com/documentation/clients)
