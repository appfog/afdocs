---
title: Frequently Asked Questions
weight: 95
---
## FAQ

* [How can I update my app without downtime?](#downtime)
* [How much does bandwidth cost beyond the included limits for the account?](#bandwidth)
* [Does AppFog have a persistent file system?](#persistentfs)
* [How Can I Move My Apps and/or Data Between Accounts?](#appdatamove)
* [Why does my app return a 410 Removed error?](#blacklist)
* [Why does my app return a 429 Calm Down error?](#throttling)
* [Why does my app return a 509 Bandwidth Exceeded error?](#bandwidth)
* [Why does my app return a 510 In Progress error?](#spindown)

### How does billing work? {#billing}

Check out [our billing doc](/billing).

### How can I update my app without downtime? {#downtime}

You can update your app with zero downtime by deploying two versions of your app.

For example, here are the apps "example" and "example2".

    | example         | 1  | RUNNING | example.com, www.example.com  |
    | example2        | 1  | RUNNING | example.aws.af.cm             |

Develop on the second app, example2, deploying new code until you're ready to push to example.com. This way you can live test the app without fear of affecting real users. 

    $ af update example2 --path {full path to app}

For example:

    $ af update example2 --path /home/example2

When you're ready to push to production, first map example2 to example.com and www.example.com. Then map example to example.aws.af.cm.

    $ af map example2 example.com 
    $ af map example2 www.example.com 
    $ af map example example.aws.af.cm 

Now you have two apps running at the same URL and they're load-balanced. You can test example2 in full production at this point.

    | example         | 1  | RUNNING | example.com, www.example.com                     |
    | example2        | 1  | RUNNING | example.aws.af.cm, example.com, www.example.com  |

Now, unmap example from example.com and www.example.com.

    $ af map example example.aws.af.cm 
    $ af unmap example2 example.aws.af.cm 

    $ af unmap example example.com 
    $ af unmap example www.example.com 

If you run into any issues with example2, rollback is trivial. Simply map the original app, example, back to example.com and www.example.com. 

    | example         | 1  | RUNNING | example.aws.af.cm             |
    | example2        | 1  | RUNNING | example.com, www.example.com  |

 Now you can develop against example (instead of example2) and when you're ready to deploy to production, you can reproduce the same steps as above.

    $ af update example

### How much does bandwidth cost beyond the included limits for the account? {#bandwidth}

Additional data transfer costs $0.15 per gigabyte.

### How Can I Move My Apps and/or Data Between Accounts? {#appdatamove}

To move your apps and/or data between accounts, please do the following:

1. Send us the email address you want to associate with the “Destination” account.  We will create a New account on the same plan type as your “Original” account.

2. You will need to complete the account verification steps on the new account.

3. Via the AppFog command-line tool (AF CLI), login to the “Original” account and download all of your applications. The command to do this is: :
> `$ af pull <app_name>`
> *(Note: This will download a copy of each app's source code to your current system folder).*
> *You may also pull the code by downloading logging in to the web console, going to that app and pulling the source code from there. *

4. Next, get a database dump of each database using the export services command:

`$ af export-service <service_name>`

5. Finally, list the env vars for each app using the command:

`$ af env <app_name>`

6. Logout of the “Original” account and login to the “Destination” account via the CLI.

7. In the “Destination” account, upload and deploy your applications using the upload/push syntax:

`$ af push <app_name>`

8. Add each apps env vars using the command:

`$ af env-add <app_name> <variable [=] value>`

9. Create and import your data using the "import services" command for importing data into the new service:

`$ af import-service <service> <url>`
    
10. Test the newly created applications in the “Destination” account and confirm they are functioning as expected.

 11. Remove your applications on your "Original" account: **IMPORTANT DISCLAIMER:  Please ONLY do this if you are certain your applications and services are functioning as they should on the new account.**
    a.  Log out of your "Destination" account and then log back in to your "Original" account
    b.  Remove all applications and services from your "Original" account:
        i. Applications and Services can be removed with the cli:

        `$ af delete <app_name>`
        `$ af delete-service <service-name>`
         
        ii. Or via the web console:
            a) login to your account here: [https://console.appfog.com/login](https://console.appfog.com/login)
            b) For Apps: select apps > app_name > settings > delete app
            c) For Services: select services > select service to delete

### Does AppFog have a persistent file system? {#persistentfs}

Not yet. We're working on this feature, but in the meantime, the file system is volatile. This means that any changes you make to the file system through a web interface, including any admin changes and content uploads, will be lost on the app's next start, stop, restart, deploy, or resource change. Because of this, you should make any changes to the file system on a local development environment and keep media assets and content uploads on an external storage system like Amazon's S3. 

### Why does my app return a 410 Removed error? {#blacklist}

AppFog's administrators have determined that this app is operating outside of our terms of service and have blacklisted it from our system. If you feel that your app has wrongly been implicated, please contact our [support department](https://support.appfog.com/).

### Why does my app return a 429 Calm Down error? {#throttling}

In order to provide reliable service for all of our users, we limit the number of requests each app can receive per second. If your app is receiving this error, we recommend [upgrading your account](https://console.appfog.com/#plans) to a [plan with greater performance](https://www.appfog.com/pricing/).

### Why does my app return a 509 Bandwidth Exceeded error? {#bandwidth}

This occurs when a free app exceeds its monthly bandwidth allowance. Please [upgrade to a paid account](https://console.appfog.com/#plans) in order to keep your app operating when it reaches its bandwidth limit.

### Why does my app return a 510 In Progress error? {#spindown}

In an effort to provide the best service possible, AppFog implements a feature that we refer to as "spindown". Inactive free applications may be suspended as determined by our administrator. This lets us conserve memory so we can continue to offer great service to the apps that need it. Your app will be started back up in the background when it receives a new request, and will return a 510 error until it's fully started.

Alternatively, apps on a [paid account](https://www.appfog.com/pricing/) will not be spun down.
