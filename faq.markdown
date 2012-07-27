---
layout: doc-page
title: Frequently Asked Questions
weight: 14
---

* [How does billing work?](#billing)
* [How can I update my app without downtime?](#downtime)
* [What are the security group settings for connecting my app to Amazon RDS?](#security-group)
* [How much does bandwidth cost beyond the included limits for the account?](#bandwidth)

### How does billing work? {#billing}

Check out [our billing doc](/billing).

### How can I update my app without downtime? {#downtime}

You can update your app with zero downtime by deploying two versions of your app.

For example, here are the apps "example" and "example2".

{: .prettyprint}
    | example         | 1  | RUNNING | example.com, www.example.com  |
    | example2        | 1  | RUNNING | example.aws.af.cm             |

Develop on the second app, example2, deploying new code until you're ready to push to example.com. This way you can live test the app without fear of affecting real users. 

{: .prettyprint}
    $ af update example2

When you're ready to push to production, first map example2 to example.com and www.example.com. Then map example to example.aws.af.cm.

{: .prettyprint}
    $ af map example2 example.com 
    $ af map example2 www.example.com 
    $ af map example example.aws.af.cm 

Now you have two apps running at the same URL and they're load-balanced. You can test example2 in full production at this point.

{: .prettyprint}
    | example         | 1  | RUNNING | example.com, www.example.com                     |
    | example2        | 1  | RUNNING | example.aws.af.cm, example.com, www.example.com  |

Now, unmap example from example.com and www.example.com.

{: .prettyprint}
    $ af map example example.aws.af.cm 
    $ af unmap example2 example.aws.af.cm 

    $ af unmap example example.com 
    $ af unmap example www.example.com 

If you run into any issues with example2, rollback is trivial. Simply map the original app, example, back to example.com and www.example.com. 

{: .prettyprint}
    | example         | 1  | RUNNING | example.aws.af.cm             |
    | example2        | 1  | RUNNING | example.com, www.example.com  |

 Now you can develop against example (instead of example2) and when you're ready to deploy to production, you can reproduce the same steps as above.

{: .prettyprint}
    $ af update example

### What are the security group settings for connecting my app to Amazon RDS? {#security-group}

This information is coming soon. For now, you'll have to connect using credential-based authorization.

### How much does bandwidth cost beyond the included limits for the account? {#bandwidth}

Additional data transfer costs $0.15 per gigabyte.
