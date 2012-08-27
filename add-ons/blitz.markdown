---
title: Blitz
weight: 16
---

## Why Use Blitz?

There's no surefire forumla for calculating the resources you'll need for a given application. The best, most reliable way to determine what level of service you'll need is to simulate load on your app. It can also be difficult to determine how much your app's performance will be affected by rapid growth. Blitz lets you test app load quickly and easily. 

## Install Blitz

In the "Add-ons" tab in your app console click "Install" for the Blitz add-on. That's it!

## Use Blitz

Click the "Manage" button in your app console under the "Add-ons" tab.

Load testing with blitz is very easy. Here's what it takes to get going:

1. <h3>Sprinting</h3>

    Simply enter the URL (with optional query parameters) of your app in the blitz bar and we'll run a simple check from one of the many regions from around the world. You can also explicitly specify a region to run using the --region option.

2. <h3>Rushing</h3>
    To go from a Sprint to a Rush, use the --pattern option before the URL. For example, if you enter --pattern 1-250:60 we'll generate a load test against your app that goes from 1 to 250 users in 60 seconds. You'll be able to see your app's performance, response times, hit rates and other metrics.

3. <h3>That's it!</h3>
    Once you get past these steps, you can learn more about how to use variables and our API clients to integrate load testing into a continuous deployment process. To learn more, take the interactive tutorial to familiarize yourself with Blitz.
