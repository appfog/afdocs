---
Blitz
---

### Intro

[Blitz](https://www.blitz.io/) is a cloud-based load testing service that offers rapid, iterative testing, continuous monitoring and remediation throughout the application development lifecycle.

### Why Use Blitz?

Blitz can help to calculate the resources you will need for your application. The best, most reliable way to determine what level of service you'll need is to simulate load on your app. It can also be difficult to determine how much your app's performance will be affected by rapid growth. Blitz lets you test app load quickly and easily to solve these issues.much your app's performance will be affected by rapid growth. Blitz lets you test app load quickly and easily. 

### Install Blitz

In the [AppFog console](https://console.appfog.com/), select the application you wish to test.
Navigate to the “Add-ons” tab and click “Install” for the Blitz add-on.

### Use Blitz

Click the "Manage" button in your app [console](https://console.appfog.com/) under the "Add-ons" tab.

Load testing with blitz is very easy. Here's what it takes to get going:

1. <h4>Sprinting</h4>

    Simply enter the URL (with optional query parameters) of your app in the blitz bar and we'll run a simple check from one of the many regions from around the world. You can also explicitly specify a region to run using the --region option.


2. <h4>Rushing</h4>

    To go from a Sprint to a Rush, use the --pattern option before the URL. For example, if you enter --pattern 1-250:60 we'll generate a load test against your app that goes from 1 to 250 users in 60 seconds. You'll be able to see your app's performance, response times, hit rates and other metrics.


3. <h4>That's it!</h4>

    Once you get past these steps, you can learn more about how to use variables and our API clients to integrate load testing into a continuous deployment process. To learn more, take the interactive tutorial to familiarize yourself with Blitz.

### Additional Resources
* [Blitz](https://www.blitz.io/)


