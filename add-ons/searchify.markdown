---
title: Searchify
weight: 17
---

[Searchify](http://www.searchify.com) is an add-on that provides hosted full-text search.

Searchify allows developers to easily add search to their applications, without having to deal with Solr or Lucene, and without the hassle of configuring and hosting your own search infrastructure.  Searchify is fast.  Most search queries will be answered in under 100 milliseconds.  Searchify offers true real-time search, so documents added are immediately searchable.  Searchify is a drop-in replacement for existing IndexTank users.

Searchify has client libraries for [PHP](http://www.searchify.com/documentation/php-client), [Ruby](http://www.searchify.com/documentation/ruby-client), [Python](http://www.searchify.com/documentation/python-client), [Java](http://www.searchify.com/documentation/java-client), and others, all of which communicate with Searchify's [REST API](http://www.searchify.com/documentation/api).

### Install Searchify

In the "Add-ons" tab in your app console click "Install" for the Searchify add-on. That's it!

Installing the Searchify add-on creates an account with Searchify associated with your PHP Fog account. By default, it will contain one empty index called "idx" which you can use or delete and replace. 

This will also add an environment variable called `SEARCHIFY_API_URL` in the "Env. Variables" in your app console. This contains the private API URL used to access the newly provisioned Searchify service from your app. 

### Set up your local development environment

The `SEARCHIFY_API_URL` environment variable holds the private URL you'll use to access the Searchify service from within a local environment. Developers will typically create one search index for testing and one for production.

The next step is to install the appropriate language client library to develop locally with Searchify.

### Installing the client library

You can access Searchify using the IndexTank client library. 

#### Installing the IndexTank Client

Full PHP client documentation and download links are available [here](http://www.searchify.com/documentation/php-client).

Once you've installed the client library, you can use it to add documents to your index as well as to perform searches. The following code sample demonstrates basic document indexing and searching.

{: .prettyprint .linenums}
    <?php
        include_once "indextank.php";

        $API_URL = getenv('SEARCHIFY_API_URL');

        $client = new Indextank_Api($API_URL);
        $index = $client->get_index("<YOUR INDEX NAME>");
    ?>

Once you have an instance of the client all you need is the content you want to index.
The simplest way to add a document is sending that content in a single field called "text":

{: .prettyprint .linenums}
    <?php
        $text = 'this is a text';
        $doc_id = 1234;
        $index->add_document($doc_id, array('text'=>$text));
    ?>

That's it, you've indexed a document! You can now search the index for any indexed document by simply providing the search query:

{: .prettyprint .linenums}
    <?php
        $query = "<YOUR QUERY>";
        $res = $index->search($query);

        echo $res->matches . " results\n";
        foreach($res->results as $doc) {
          print_r($doc);
          echo "\n";
        }
    ?>

An index may be deleted and re-created anytime to clean it up, either from code as shown below or from Searchify's [dashboard](http://www.searchify.com/dashboard):

#### Deleting an index

{: .prettyprint .linenums}
    <?php
        include_once "indextank.php";
        $API_URL = getenv('SEARCHIFY_API_URL');

        $client = new Indextank_Api($API_URL);
        $index = $client->get_index("<YOUR INDEX NAME>");     
        $index->delete_index();
    ?>

#### Creating a new index

{: .prettyprint .linenums}
    <?php
        $client = new Indextank_Api($API_URL);

        // This parameter allows you to create indices with public search enabled.
        // Default is false. 
        $public_search_enabled = false;
        $index = $client->create_index("<YOUR INDEX NAME>", $public_search_enabled);
      
        while (!$index->has_started()) {
          sleep(1);
        }
    ?>

#### Dashboard

The Searchify dashboard allows you to manage indices, allowing you to create, delete, and search indices.  Custom scoring functions can also be configured.  The dashboard can be accessed by visiting the PhpFog app console, and selecting Searchify.

#### Plans

Searchify offers plans based on the number of documents stored. If you outgrow the limits of your current Searchify plan, you can change to a larger plan. A list of all plans available can be found [here](http://www.searchify.com/plans).

### Further Reading

For more information on the features available from Searchify, including faceting, geolocation, snippets, autocomplete, and custom scoring functions, please see the documentation at [www.searchify.com/documentation](http://www.searchify.com/documentation).
