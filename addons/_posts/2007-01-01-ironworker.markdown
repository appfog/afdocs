---
title: IronWorker
layout: doc-page
weight: 16
---

#### Install IronWorker

In the "Add-ons" tab in your app console click "Install" for the IronWorker add-on. That's it!

#### Integrate IronWorker

Just copy [IronWorker.class.php](https://github.com/iron-io/iron_worker_php/blob/master/IronWorker.class.php) and include it in your script:

{: .prettyprint .linenums}
	<?php
	require_once "IronWorker.class.php

#### Create a Worker

When you install IronWorker, the installer creates two environment variables set with the necessary credentials. Create a worker and pass in those credentials like this:

<pre class="prettyprint linenums:3 linenums">
$worker = new IronWorker(array(
'token' => getenv('IRON_WORKER_TOKEN'),
'project_id' => getenv('IRON_WORKER_PROJECT_ID')
));</pre>

Here's an example worker:

{: .prettyprint .linenums}
	<?php
	echo "Hello PHP World!\n";

We'll call this worker "HelloWorld.php".

#### Upload Your Worker

Here's how to take the example above, zip it up, and upload it to IronWorker.

{: .prettyprint .linenums}
	<?php
	# Zip single file:
	IronWorker::createZip(dirname(__FILE__), array('HelloWorld.php'), 'worker.zip', true);
	$res = $iw->postCode('HelloWorld.php', 'worker.zip', 'HelloWorld');

####  Queue Your Worker

{: .prettyprint .linenums}
	<?php
	$task_id = $iw->postTask('HelloWorld');

Your worker should start in a few seconds.

#### Schedule Your Worker

If you want to run your code more than once or run it in regular intervals, you can schedule it:

{: .prettyprint .linenums}
	<?php
	# 3 minutes from now
	$start_at = time() + 3*60;

	# Run task every 2 minutes, repeat 10 times
	$iw->postScheduleAdvanced('HelloWorld', array(), $start_at, 2*60, null, 10);

#### Check the Status of Your Worker

Use the `getTaskDetails()` method.

{: .prettyprint .linenums}
	<?php
	$task_id = $iw->postTask('HelloWorld');
	$details = $iw->getTaskDetails($task_id);

	echo $details->status; # prints 'queued', 'complete', 'error' etc.

#### And More...

You can also pass payloads to your tasks, set progress status, logs, etc. For more information, check out some of these resources:

* [IronWorker on GitHub](https://github.com/iron-io/iron_worker_php)
* [IronWorker PHP Reference Documentation](http://iron-io.github.com/iron_worker_php/)
* [IronWorker PHP Wiki](https://github.com/iron-io/iron_worker_php/wiki)
* [Full Documentation on Iron.io](http://docs.iron.io/)
