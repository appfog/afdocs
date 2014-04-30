---
IronMQ
---

### Intro

[IronMQ](http://www.iron.io/mq) is a cloud messaging service, allowing you to queue messages and scale with your applications needs.

### Why use IronMQ?

If you need high availability messaging and queuing with little setup for your app, IronMQ is an great solution with many features.

### Install IronMQ

In the AppFog console, select the application you wish to setup.
Navigate to the “Add-ons” tab and click “Install” for the IronMQ add-on.

### Use IronMQ

Installing the IronMQ add-on automatically sets environment variables for your app called `IRON_MQ_TOKEN` and `IRON_WORKER_PROJECT_ID` you can use these in your application to tell IronMQ which project to attach queues to.

There are three basic actions you can perform on a message queue:

* Put a message into a queue.
* Get a message out of a queue.
* Delete the message you got out of the queue when you're done with it. (If you don't delete the message, it will go back into the queue after a timeout.) 

Client libraries are avalible for a variety of languanges. Here are examples in PHP:

    // Get package here: https://github.com/iron-io/iron_mq_php
    require_once "IronMQ.class.php"

    $ironmq = new IronMQ(array(
    'token' =>getenv('IRON_MQ_TOKEN'),
    'project_id' => getenv('IRON_WORKER_PROJECT_ID')
    ));

    // Put a message on the queue
    $ironmq->postMessage("my_queue", "Hello world");

    // Get a message
    $msg = $ironmq->getMessage("my_queue");

    // Delete the message
    $ironmq->deleteMessage("my_queue", $message_id);

### IronMQ Console

You can take a look at your IronMQ management console by going to your app in the AppFog console Add-ons tab, and click “Manage”.

### Additional Resources

* [IronMQ Documentation](http://dev.iron.io/mq/)
* [IronMQ Client Libraries](http://dev.iron.io/mq/libraries/)
