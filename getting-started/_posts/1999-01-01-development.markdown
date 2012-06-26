---
title: Development
layout: doc-page
weight: 4
description: "How to prepare your local development environment."
---

Now that you can push code to and from your app, you'll want to set up a local development environment before doing anything serious. Setting up a local environment allows you to shorten the feedback loop on your development process. It also keeps all of your code in git, which makes it easy to roll back changes and makes your app easily scalable. 

### 1. Set up your local environment.

#### Mac OS X

Download and install <a href="http://www.mamp.info/en/index.html">MAMP</a>.

#### Linux

Install <a href="/faqs#version">these versions</a> of Apache, MySQL, and PHP.

#### Windows

Download and install <a href="http://www.wampserver.com/en/">WAMP</a>.

### 2. Configure your local environment variables.

After you have your local environment set up, you'll want to be able to deploy the same code in both your local environment and your live PHP Fog Cloud. PHP Fog makes this easy by [setting environment variables with your database credentials](/getting-started/env-vars).

To take advantage of this, set those environment variables in your local environment. 

You'll also want to make sure your code references relative URLs.

### WordPress Walkthrough

Smashing Magazine has [a great walkthrough](http://wp.smashingmagazine.com/2011/09/28/developing-wordpress-locally-with-mamp/) on setting up a local development environment for WordPress.

<!-- by editing the file `/Applications/MAMP/Library/bin/envvars`. -->
