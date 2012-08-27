---
title: IronMQ
weight: 16
---

## Install IronMQ

In the "Add-ons" tab in your app console click "Install" for the IronMQ add-on. That's it!

## Authentication

You need two things to authenticate and tell IronMQ which project to attach your queues to:

    Token: IRON_MQ_TOKEN

    Project ID: IRON_WORKER_PROJECT_ID

You can find these environment variables in the "Env. Variables" tab in your app console. You can also access these variables in PHP through the `getenv()` function.

## The Basics

There are three basic actions you can perform on a message queue:

* Put a message into a queue.
* Get a message out of a queue.
* Delete the message you got out of the queue when you're done with it. (If you don't delete the message, it will go back into the queue after a timeout.) 

These three simple actions are the main actions you'll typically use. Here's some sample code using our client that shows how to use these functions.


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
