---
title: Modified Free Accounts FAQ
weight: 1
---

## Where's My Data?

AppFog changed the resource thresholds for free plans on February 19th: [Please read more about that here](http://blog.appfog.com/changes-to-appfog-free-plans/). As part of that change, free plan users now have a limit of two service bindings for their apps. The previous limit for service bindings was eight. If you are on a free plan and previously had more than two service bindings, please read the following to help you recover your data.

### Recovering Data

In order to recover data from a service binding, you'll need to use the `af` command line tool to create a tunnel. Keep in mind, though, each tunnel you create consumes one of your two available service bindings and one of your two application slots. This means you can only access two services at any one time, whether through a tunnel or one of your running applications.

Our recommendation is to export you data prior to restarting any of your applications via af tunnel. For more details on tunneling, [please see our documentation](https://docs.appfog.com/services/tunneling).

### Questions:

* [Can I create more than two services?](#servicelimit)
* [I had more than two services. Did I lose what I had beyond the allowed two?](#morethantwo)
* [Did you delete any services or data associated with those services which existed on my account?](#didyoudelete)
* [Can I still access all my data?](#caniaccess)
* [Can I run more than two applications at a time?](#morethantwoapps)
* [Does Caldecott count as an application?](#morethantwoapps)
* [How can I run Caldecott if I have two applications running already?](#runcald)
* [How can I run more than two applications at a time?](#upgrade)


### Can I create more than two services?{#servicelimit}

You cannot create additional services once you have reached the limit of two services.


### I had more than two services. Did I lose what I had beyond the allowed two?{#morethantwo}

If you had more than two services before the maintenance, you still do.


### Did you delete any services or data associated with those services which existed on my account?{#didyoudelete}

We did not delete any services, nor their associated data. 


### Can I still access all my data?{#caniaccess}

You can access all of the data you had prior to the maintenance.


### Can I run more than two applications at a time? Does Caldecott count as an application?{#morethantwoapps}

You cannot run more than two applications at the same time. You can run up to two applications at any given time as long as you don't exceed the ram limit of 512MB. 

You can create as many applications as you want, as long as you either stop all running applications or set the number of running applications to one. In order to create additional applications, first stop all apps (you may leave one of your applications running if you want). You should then be able to create an additional application.

Caldecott does count as an application and the ram it requires (64MB) counts toward your total ram used.


### How can I run Caldecott if I have two applications running already?{#runcald}

Our tunneling feature (Caldecott) requires its own running application, in order to communicate with a service. If you have two running applications in addition to Caldecott, you must first stop at least one of the applications, then you can start the tunneling process using Caldecott to access your data. Once the tunneling process is complete, you must stop your Caldecott application, at which point you can start up the other application.

For example - on your account you have `app1`, `app2`, and `caldecott` set up. Currently `app1` and `app2` are running but you need to tunnel to your services. So you choose to stop `app1` via this command: `$ af stop app1` and then you start the tunnel like so: `$ af tunnel service2-mysql`. Once you're done with that, then you stop the tunnel application and start the app up again like so:  `$ af start app1` And that's it!


### How can I run more than two applications at a time?{#upgrade}

If you require more than two running applications (including the application used by our tunneling feature), or more than 512M of memory, or more than two services, you will need to [upgrade to one of our paid plans](http://www.appfog.com/products/appfog/pricing/).
