---
title: Troubleshooting
layout: doc-page
weight: 16
---

Here are some of the most common issues and how to deal with them. 

Don't see your issue here? Try our [community](http://community.phpfog.com/) or [email our support desk](mailto:support@appfog.com).

* [SSH, Git, and PF Command Line Tool](#ssh)
* [HTTP 500, 502, 503, and 504 Errors](#500)
* [SSL](#ssl)
* [Forcing HTTPS](#https)

### SSH, Git, and PF Command Line Tool {#ssh}

#### "Permission denied (publickey)"

1. Follow our [guide to generating your SSH key](/getting-started/ssh).
2. Make sure you're copying your *public* key into the PHP Fog app console, not your private key. 
3. Flush your ssh-agent cache:

    $ ssh-add -D
	All identities removed.

#### "Unauthorized access for user"

This error occurs when you try to use the same SSH key for multiple accounts. You'll have to generate a new key for each account. Check out [our guide on using SSH keys with multiple account](/getting-started/ssh#multiple).

If you continue to see this error, flush your ssh-agent cache:

    $ ssh-add -D
	All identities removed.

### HTTP 500, 502, 503, and 504 Errors {#500}

#### 500: Internal Server Error

HTTP 500 is a generic "catch-all" that indicates that the web server was unable to fulfill the HTTP/S request. This is usually caused by syntax errors, script run times, or deployment issues. 

You can usually diagnose this issue by turning on PHP error reporting. Just go to your PHP Fog app console, click on the "Settings" tab, and click the "Display Errors" button. Then go back to your app and you should get a stack trace of where your app is hitting an error. 

If you still don't get anything besides an HTTP 500, it's probably an issue with your `.htaccess` file. Check that file for syntax errors. 

#### 502: Bad Gateway

HTTP 502 errors are extremely rare and generally due to an infrastructure failure. If you receive this error, wait a few minutes and try again. If you experience this issue for longer than a few minutes, [email us](mailto:support@appfog.com) and we'll work to resolve the issue as fast as possible.

#### 503: Service Unavailable

HTTP 503 errors are specified by your app.

#### 504: Gateway Timeout

HTTP 504 errors mean your app is unable to service requests. The load balancers that sit between your app and its HTTP clients are configured to timeout requests after 60 seconds. So after the load balancer receives the initial request and forwards it to your app server, if the load balancer doesn't receive anything for 60 seconds, it returns a 504 error to the client.

Timeouts can be caused by a a variety of reasons, but the two most common are: 1. CPU over-utilization, and 2. blocking sync calls to other services. 

#### CPU

If your app is on a Shared or Silver Cloud, the CPU utilization is throttled in "Bursts". These plans provide a small amount of consistent CPU resources and allow your application to burst CPU capacity when additional cycles are available. They are well suited for lower throughput applications and web sites that consume significant compute cycles periodically. If the processing takes longer than a burst, the processing gets heavily throttled. This means something that can take just a few seconds on your desktop might take much longer on these plans and therefore cause the HTTP request to timeout.

Processes that can cause this include: 

* Rendering an image or PDF
* XML parsing of a large file
* Heavy calculations (e.g. Fourier transform of an MP3)

#### Blocking calls to other services

If your application makes calls to third-party services these calls may be blocking. That is, when your applications make a call to a method like file_get_contents() it won't finish until the full HTTP transaction is complete. Making too many calls like this may cause the time to complete all the transactions longer than the timeout period.

Calls that can cause this include:

* Sending email
* Calling remote APIs (e.g. Twitter, Facebook, etc)
* Web-scraping

#### Solutions

* Take full advantage of [caching](/best-practices/caching).

* Upgrade your Cloud. 

    Gold and Platinum Clouds provide consistent processing power. This is a simple answer, but it's not necessarily the right one for every case. If your app's processes consistently take too long, this might not help. 

* Use asynchronous calls instead of synchronous calls. 

    This only makes sense when your application doesn't need the returned value. Check out [this StackOverflow question on asynchronous PHP calls](http://stackoverflow.com/questions/124462/asynchronous-php-calls) for more information.

* Off-load heavy processing to an external service. 

    Try our [IronWorker](http://phpfog.com/addons) add-on to take some of the asynchronous processing load from your app server. Or, you can create a new Amazon EC2 server dedicated to the heavy processing (the "worker"), and use [Amazon's Simple Queue Service](http://aws.amazon.com/sqs/) to queue jobs. This allows your app to add jobs to the queue and then the worker can pull and process them as it becomes available. 

### SSL {#ssl}

#### "Doman name mismatch"

A domain name mismatch means that the domain name on your certificate doesn't match your app's actual URL. For example, your certificate might say "`foo.com`" while your app's domain is actually "`www.foo.com`".

Solution: Change your app's domain name to match the certificate. Alternatively, you can have a new certificate issued to match your app's domain name (this includes wildcard certificates, e.g. "`\*.foo.com`").

#### "Cannot verify"

The most common reason your browser cannot verify your app is an expired certificate. 

Solution: Have your Certificate Authority update your certificate.

#### Certificate Authority says I need a CSR.

Solution: To generate a CSR on your local machine for PHP Fog check out [this document](http://www.globalsign.com/support/csr/serversign_apache.php).

#### "Not a valid RSA key"

PHP Fog takes certifications in RSA and DSA formats.

If you're getting this error, you can run your key through a converter:

{: .prettyprint}
    $ openssl rsa -in domain.key -out domain_new.key

After running this command, your new file format should look like this: 

    -----BEGIN RSA PRIVATE KEY----- 
    encrypted text 
    -----END RSA PRIVATE KEY-----

### Forcing HTTPS {#https}

Using `.htaccess` rules to force HTTPS is complicated by the presence of the load balancers. If you're running into a redirect loop, try forwarding by protocol instead of by port:

{: .prettyprint}
    RewriteCond %{HTTP:X-Forwarded-Proto} https
