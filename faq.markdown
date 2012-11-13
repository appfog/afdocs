---
title: Frequently Asked Questions
weight: 14
---

* [What's the difference between PHP Fog and AppFog?](#difference-af-pf)
* [How does billing work?](#billing)
* [How can I update my app without downtime?](#downtime)
* [What are the security group settings for connecting my app to Amazon RDS?](#security-group)
* [How much does bandwidth cost beyond the included limits for the account?](#bandwidth)
* [Does AppFog have a persistent file system?](#persistentfs)

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

    $ af update example2

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

### What are the security group settings for connecting my app to Amazon RDS? {#security-group}

This information is coming soon. For now, you'll have to connect using credential-based authorization.

### How much does bandwidth cost beyond the included limits for the account? {#bandwidth}

Additional data transfer costs $0.15 per gigabyte.

### Does AppFog have a persistent file system? {#persistentfs}

Not yet. We're working on this feature, but in the meantime, the file system is volatile. This means that any changes you make to the file system through a web interface, including any admin changes and content uploads, will be lost on the app's next start, stop, restart, deploy, or resource change. Because of this, you should make any changes to the file system on a local development environment and keep media assets and content uploads on an external storage system like Amazon's S3. 
