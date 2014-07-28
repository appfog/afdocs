---
title: Frequently Asked Questions
weight: 95
---

## FAQ

* [What's the difference between PHP Fog and AppFog?](#difference-af-pf)
* [How does billing work?](#billing)
* [How can I update my app without downtime?](#downtime)
* [How much does bandwidth cost beyond the included limits for the account?](#bandwidth)
* [Does AppFog have a persistent file system?](#persistentfs)
* [Can I move Apps and/or Data between Accounts?](#moveappsdata)
* [Why does my app return a 410 Removed error?](#blacklist)
* [Why does my app return a 429 Calm Down error?](#throttling)
* [Why does my app return a 509 Bandwidth Exceeded error?](#bandwidth)
* [Why does my app return a 510 In Progress error?](#spindown)

### What's the difference between PHP Fog and AppFog? {#difference-af-pf}

[PHP Fog](https://phpfog.com), our original product, is a Platform-as-a-Service built specifically for PHP web apps. It runs exclusively in Amazon's AWS US East datacenter and you deploy apps using git. Read more about PHP Fog [here](http://docs.phpfog.com).

[AppFog](https://appfog.com) is our more generalized Platform-as-a-Service based on [the Cloud Foundry Open Source Project](http://cloudfoundry.org/). You can choose from [a growing list of languages and frameworks](http://docs.appfog.com/roadmap#langs) and you can deploy from [a growing list of infrastructures and datacenters](http://docs.appfog.com/roadmap#infras) using our [command line tool](http://docs.appfog.com/getting-started/af-cli).

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


### Does AppFog have a persistent file system? {#persistentfs}

Not yet. We're working on this feature, but in the meantime, the file system is volatile. This means that any changes you make to the file system through a web interface, including any admin changes and content uploads, will be lost on the app's next start, stop, restart, deploy, or resource change. Because of this, you should make any changes to the file system on a local development environment and keep media assets and content uploads on an external storage system like Amazon's S3. 


### Can I move Apps and/or Data between Accounts? {#moveappsdata}

1. Send us the email address you want to associate with the “Destination” account. We will create a New account on the same plan type as your “Original” account.

2. You will need to complete the account verification steps.

3. There are two ways to download your code:
    1. Via the AppFog command-line tool (AF CLI):
        * Open up your command line and log in to the “Original” account.
        * Download all of your applications using this command (which will download a copy of the source code to your current system folder):

        $ af pull <app_name>`

    2. Via the App in the Web Console:
        * Go to the [login page](https://console.appfog.com/login) and log in.
        * Go to your App (you should be on the "Mission Control" tab) and click the "Download Source Code" button to download your application code.

4. Next, get a database dump of each database using the export services command: 

        $ af export-service <service_name>


5. Finally, list the env vars for each app using the command:

        $ af env <app_name>


6. Log out of the “Original” account and login to the “Destination” account via the CLI.

7. In the “Destination” account, upload and deploy your applications using the upload/push syntax:

        $ af push <app_name>


8. Add each apps env vars using the command:

        $ af env-add <app_name> <variable [=] value>


9. Create and import your data using the "import services" command for importing data into the new service:

        $ af import-service <service> <url>

    
10. Test the newly created applications in the “Destination” account and confirm they are functioning as expected.

11. Remove your applications on your "Original" account. <span style="color: #990000;">**IMPORTANT DISCLAIMER:  Please ONLY do this step if you are certain your applications and services are functioning as they should on the new accounts.**</span> Log out of your "Destination" account and then log back in to your "Original" account. Remove all applications and services from your "Original" account via one of two methods: 
    1. Applications and Services can be removed with the AF CLI using these commands:

        `$ af delete <app_name>` and `$ af delete-service <service-name>`
         
    2. Or from the web console by logging in and doing the following:

    * Go to "Apps": select apps > app_name > settings > delete app
    * Go to "Services": select services > select service to delete

###Why does my app return a 400 bad request when it connects to Facebook?

This occurs when an app is within an infrastructure that is currently blacklisted by Facebook.

**Why did Facebook block certain IP’s?

This was done in resolve the adverse impact of abusive apps uploaded by free account owners to our EU-AWS and AP-AWS infra’s.

**How do we get them to unblock our IP’s?

AppFog is currently working to resolve this error with the assistance of Facebook. In order to get these IP’s unblocked by Facebook, they will need to deem the IP’s as safe and non-malicious in order to put them onto their whitelist.

**To workaround this issue, please clone your app to our CenturyLink Cloud or AWS-East infrastructures.

    $ clone <src-app-name> <dest-app-name> <infra>

### Why does my app return a 410 Removed error? {#blacklist}

AppFog's administrators have determined that this app is operating outside of our terms of service and have blacklisted it from our system. If you feel that your app has wrongly been implicated, please contact our [support department](https://support.appfog.com/).


### Why does my app return a 429 Calm Down error? {#throttling}

In order to provide reliable service for all of our users, we limit the number of requests each app can receive per second. If your app is receiving this error, we recommend [upgrading your account](https://console.appfog.com/#plans) to a [plan with greater performance](https://www.appfog.com/pricing/).


### Why does my app return a 509 Bandwidth Exceeded error? {#bandwidth}

This occurs when a free app exceeds its monthly bandwidth allowance. Please [upgrade to a paid account](https://console.appfog.com/#plans) in order to keep your app operating when it reaches its bandwidth limit.


### Why does my app return a 510 In Progress error? {#spindown}

In an effort to provide the best service possible, AppFog implements a feature that we refer to as "spindown". Inactive free applications may be suspended as determined by our administrator. This lets us conserve memory so we can continue to offer great service to the apps that need it. Your app will be started back up in the background when it receives a new request, and will return a 510 error until it's fully started.

Alternatively, apps on a [paid account](https://www.appfog.com/pricing/) will not be spun down.
