---
title: Troubleshooting
weight: 9
---

Here are some of the most common issues and how to deal with them. 

Don't see your issue here? Try our [mailing list](https://groups.google.com/forum/#!forum/appfog-users) or contact support at [support.appfog.com](https://support.appfog.com).

* [Crashing app (502/503/404)](#crashing)
* [af cli login issues](#af-cli-login)
* [Error (JSON 502) on `af update`](#502-on-update)
* [Error 402: App packaging failed: 'Failed synchronizing resource pool' on `af update`](#402-on-update)
* [App stops by itself.](#app-stops)
* [Missing logs](#af-logs-restart)
* [MySQL server has gone away](#mysql-gone)
* [WordPress issues](#wordpress-issues)

## Crashing app (502/503/404) {#crashing}

If your app is at less than 100% "Running" status or you're seeing the AppFog error page, it means one or more instances of your app have crashed. You can check this status with the following command:

    $ af crashes <appname>

You can get your app's crashlogs with the following:

    $ af crashlogs <appname>

(Or if your app has multiple instances:)

    $ af crashlogs --all <appname>

## af cli login issues {#af-cli-login}

If you can log into the web console, but you're running into issues with the `af login` command, try this: 

    $ rm ~/.af_token
    $ af login

## Error (JSON 502) {#502-on-update}

The most common reason for this is your app running out of available RAM. When that happens, AppFog kills the app and attempts to re-spawn it. While it's down, you see 404. To fix this, simply add more RAM to your app: 

    $ af mem <appname> <memory>

## Error 402 {#402-on-update}

Resource pool issues can usually be resolved by bypassing the cache with the `--no-resources` flag: 

    $ af update <appname> --no-resources

Sometimes symbolic links in your code base can cause this error, especially with Node apps. This command will list all of the symbolic links in your directory:

    $ find . -type s | xargs -l

If it's a node app, it's likely you have a `node_modules/.bin` directory, and that may be the problem. Usually, you can just delete the entire `.bin` directory if you aren't using it. 

You can also add the following to your `.afignore` file:

    node_modules/.bin/

## App stops by itself. {#app-stops}

An app stopping by itself generally indicates that it has crashed. When your app crashes, AppFog automatically attempts to re-spawn it, but only a limited number of times. If it continues to crash repeatedly, it will remain stopped. You can check your crashes with `af crashes`:
    
    $ af crashes <appname>

And you can check the crash logs:
    
    $ af crashlogs <appname>

If your app has more than once instance:

    $ af crashlogs <appname> --all

The most common reason for an app to crash is running out of memory. You should find a log message indicating as much in your error logs

    $ af files <appname> --all /logs/stderr.log

    FATAL -- : Memory limit of 256M exceeded.
    FATAL -- : Actual usage was 300M, process terminated.


## Missing logs {#af-logs-restart}

Apps that have crashed or failed to deploy are wiped (with their logs) after an hour. In the event that `af logs` returns no data, you should check `af crashes` and `af crashlogs`. Failing that, restart and check logs again. 


## MySQL Server has gone away {#mysql-gone}

    Mysql::Error: MySQL server has gone away

This occurs when an app attempts to use persistent MySQL connections without closing them. AppFog apps should always close database connections and should not use persistent MySQL connections.

## WordPress Issues {#wordpress-issues}

Most common WordPress issues on AppFog stem from the fact that AppFog does not yet have a persistent file system. This means that any changes you make to the file system through a web interface, including any admin changes and content uploads, will be lost on the app's next start, stop, restart, deploy, or resource change. Because of this, you should make any changes to the file system on a local development environment and keep media assets and content uploads on an external storage system like Amazon's S3.

Here are some of the issues this can cause:

* White screen
* Reversion back to default WordPress
* Theme/plugin errors
