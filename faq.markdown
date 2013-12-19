---
title: Frequently Asked Questions
weight: 14
---
## FAQ

* [How can I update my app without downtime?](#downtime)
* [How much does bandwidth cost beyond the included limits for the account?](#bandwidth)
* [Does AppFog have a persistent file system?](#persistentfs)
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
