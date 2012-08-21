---
title: Troubleshooting
weight: 8
---

Here are some of the most common issues and how to deal with them. 

Don't see your issue here? Try our [mailing list](https://groups.google.com/forum/#!forum/appfog-users) or [email our support desk](mailto:support@appfog.com).

* [af cli login issues](#af-cli-login)
* [Error (JSON 502) on `af update`](#502-on-update)

### af cli login issues {#af-cli-login}

If you can log into the web console, but you're running into issues with the `af login` command, try this: 

    $ rm ~/.af_token
    $ af login

### Error (JSON 502) 

The most common reason for this is your app running out of available RAM. When that happens, AppFog kills the app and attempts to re-spawn it. While it's down, you see 404. To fix this, simply add more RAM to your app: 

    $ af mem <appname> <memory>
