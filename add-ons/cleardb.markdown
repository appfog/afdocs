---
title: ClearDB
weight: 9
---

## ClearDB

### Install ClearDB

In the "Add-ons" tab in your app console click "Install" for the ClearDB add-on. That's it!

Installing the ClearDB add-on automatically sets an environment variable for your app called "`CLEARDB_DATABASE_URL`". You can access this in your code with `getenv("CLEARDB_DATABASE_URL")`. This variable includes the full URI including the hostname, database path, username and password. The following code demonstrates how to parse the environment variable:


    <?php
        $url=parse_url(getenv("CLEARDB_DATABASE_URL"));

        mysql_connect(
        $server = $url["host"],
        $username = $url["user"],
        $password = $url["pass"]);
        $db=substr($url["path"],1);
        mysql_select_db($db);
    ?>
