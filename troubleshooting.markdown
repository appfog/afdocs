---
title: Troubleshooting
weight: 9
---

Here are some of the most common issues and how to deal with them. 

Don't see your issue here? Try our [mailing list](https://groups.google.com/forum/#!forum/appfog-users) or [email our support desk](mailto:support@appfog.com).

* [af cli login issues](#af-cli-login)
* [Error (JSON 502) on `af update`](#502-on-update)
* [Error 402: App packaging failed: 'Failed synchronizing resource pool' on `af update`](#402-on-update)

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
