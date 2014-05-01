---
title IronWorker
weight: 10
---

## IronWorker

### Intro

[IronWorker](https://www.iron.io/worker) is a scalable task queue, allowing you to offload front-end tasks and run processes and jobs for your applications needs.

### Why use IronWorker?

Whether you are limited by a specific api from performing a task or just want to manage your applications activity, IronWorker can help scheduling these to ensure your app runs smoothly and efficiently.

### Install IronWorker

In the [AppFog console](https://console.appfog.com/), select the application you wish to setup.
Navigate to the “Add-ons” tab and click “Install” for the IronMQ add-on.

### Use IronWorker

Installing the IronWorker add-on automatically sets environment variables for your app called `IRON_WORKER_TOKEN` and `IRON_WORKER_PROJECT_ID` you can use these in your application to tell IronWorker which project to attach queues to.

Here is a quick getting started with the PHP client library:

Create a worker and pass the token and project id:

    $worker = new IronWorker(array(
    'token' => getenv('IRON_WORKER_TOKEN'),
    'project_id' => getenv('IRON_WORKER_PROJECT_ID')
    ));

Hello World worker:

    <?php
      echo “Hello World worker!\n”;
    
Upload worker:

    <?php
    # Zip single file:
    IronWorker::createZip(dirname(__FILE__), array('HelloWorld.php'), 'worker.zip', true);
    $res = $iw->postCode('HelloWorld.php', 'worker.zip', 'HelloWorld');

Queue worker:

    <?php
    $task_id = $iw->postTask('HelloWorld');

Schedule worker:

    <?php
    # 3 minutes from now
    $start_at = time() + 3*60;
    # Run task every 2 minutes, repeat 10 times
    $iw->postScheduleAdvanced('HelloWorld', array(), $start_at, 2*60, null, 10);

Check worker status ( getTaskDetails() method ):

    <?php
    $task_id = $iw->postTask('HelloWorld');
    $details = $iw->getTaskDetails($task_id);
    echo $details->status; # prints 'queued', 'complete', 'error' etc.

### IronWorker Console

You can take a look at your IronWorker management console by going to your app in the [AppFog console](https://console.appfog.com/) Add-ons tab, and click “Manage”.

### Additional Resources

* [IronWorker Doumentation](http://dev.iron.io/worker/)
* [IronWorker Client Libraries](http://dev.iron.io/worker/libraries/)



