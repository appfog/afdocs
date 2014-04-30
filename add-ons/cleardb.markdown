---
ClearDB
---

### Intro
[ClearDB](https://www.cleardb.com) is a hosted [MySQL](http://www.mysql.com/) service that allows you to create as large of a database as necessary for your application while having peace of mind that your data is safe, and fault tolerant.

### Why use ClearDB
ClearDB can make sure you have enough room for growth with your application. If your database is expected to be larger than your AppFog account allotments or you, just want assurance that your data will be persistent, ClearDB can help to mediate these concerns.

### Install ClearDB

In the AppFog console, select the application you wish to setup.
Navigate to the “Add-ons” tab and click “Install” for the ClearDB add-on.

### Using ClearDB

Installing the ClearDB add-on automatically sets an environment variable for your app called "`CLEARDB_DATABASE_URL`". This variable includes the full URI including the hostname, database path, username and password. 

The following code demonstrates how to parse the environment variable:

	<?php
		$url=parse_url(getenv("CLEARDB_DATABASE_URL"));

		mysql_connect(
		$server = $url["host"],
		$username = $url["user"],
		$password = $url["pass"]);
		$db=substr($url["path"],1);
		mysql_select_db($db);
	?>

### ClearDB DashBoard
To access your CloudDB dashboard, simply click the "Manage" button under CloudDB from the "Add-ons" tab on your app console.

### Additional Resources
[ClearDB Documentation](http://www.cleardb.com/developers)
[MySQL AppFog Documentation](https://docs.appfog.com/services/mysql)
[MySQL Documentation](http://dev.mysql.com/doc/)
