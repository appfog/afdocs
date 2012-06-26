---
layout: doc-page
title: Reliability
weight: 14
---

Here's a walkthrough for an HTTP request from the client all the way to the database for a better look at our reliability mechanisms:

#### DNS Lookup 

When a client makes an HTTP request to your PHP Fog app, the first step is to perform a DNS lookup for the IP address of your application. In our guide for [setting up custom domains](/customize/custom-domain-names), we recommended using a CNAME record. This is a mechanism to help with failover. While the CNAME record currently points to Amazon's Elastic Load Balancer, in the case of a failure, we can update our DNS records to reference a different service, maintaining service. This particular failover mechanism is built into a point before a request even touches any PHP Fog components. 

On the other hand, an A record references a static IP address, which is a single point of failure. This is why we recommend CNAME over A records.

#### First Load Balancer

After the DNS lookup is complete, the HTTP request is routed to the Amazon Elastic Load Balancer. Amazon's load balancer distributes the load of the requests across numerous servers and provides redundancy.

#### Caching Server 

Next, the load balancer forwards the request to one of our Varnish Cache Servers. We've set up multiple cache servers to handle requests, and, properly configured, the Caching Servers can actually load static contents from your app, even when your app server is down.

#### Second Load Balancer 

After the caching server, the requests go to the second load balancer. The load balancer directs requests to the application server best able to handle the requests. If a server is unavailable, it is routed to a new server thus improving the reliability of your application.

#### App Servers and Code Repository 

If you have a dedicated server you can run your application on multiple servers. Each of the servers is constantly monitored and if any hiccups occur, the application is migrated to a healthy application server. Note, that you must be on a dedicated plan with multiple servers to have redundancy, it is not available for the free shared hosting plans.

#### Git Server 

The core of your application is stored on a git server and it is distributed to the application servers. This means that even if your application server fails, the code is still available on the git server so it can be re-spawned on a new server. This git server is also backed up.

#### Databases 

The last step in the request path is the database. All applications get a primary and passive MySQL database. The primary database server is synchronized to a passive database slave which provides an up-to-the-minute snapshot of your MySQL databases. The database slave is used for application fail-over in case the primary server isn’t behaving properly. The secondary database is placed in a separate Availability Zone. Your Database calls will always will go to the master when everything is working properly, the slave replaces the master if something goes wrong. You do not have to do anything in your application to take advantage of this. If for whatever reason the master fails the slave will replace the master. Then we will add a new database server. The new database server will act as the new slave, and the old slave will act like the new monitor.

#### Monitoring 

In order to ensure the highest reliability, we must have great visibility. We use Pingdom and New Relic to monitor our servers from the outside-in for uptime. We also use Nagios to monitor our infrastructure for health. In addition to monitoring our own servers, we also provide monitoring for you. We have partnered with New Relic so you can monitor your application health (e.g. memory, CPU, etc) of your application on the dedicated servers. New Relic can also be used to test uptime of your application from the outside-in.

#### Improvements

We have done a lot of work so far to make PHP Fog reliable; however, we continue to push to make the service even more resilient. While we have redundancy and failover in the entire stack, we want to make each of the components available not just in different availability zones, but different regions, and even different cloud providers altogether.
