---
title: Teams
weight: 4
---

*Note: the Teams feature is currently in beta and only available to users on paid plans.*

AppFog's Teams feature gives you the ability to invite other AppFog users to collaborate on app management. To add a user to an account, you simply email her an invitation. Once she accepts, she'll have the ability to sign into the account and manage the same set of apps and services from the '`af`' command line tool.

### Invite a user

To invite a user, head over to [the console](https://console.appfog.com/) and click on the "Teams" tab.

![Teams](http://blog.appfog.com/wp-content/uploads/2013/01/teams1.jpg)

Under the Teams tab, you can see a list of team members, pending invitations, excluded users, etc. You can also invite new users by adding their email addresses.

### Team Membership

Once you've accepted an invitation to a Team, you can interact with the apps on the Team account from the command line tool. Simply use the "`-u`" flag:

    $ af -u team@appfog.com update example-app

This command simply does an "`af update`", but acts on the "team@appfog.com" account. 

You can also stop, start, and restart apps, add services, modify environment variables, etc. The only command Team members don't have access to is `af passwd`. To see the full list of commands, check out the [af cli doc](https://docs.appfog.com/getting-started/af-cli).
