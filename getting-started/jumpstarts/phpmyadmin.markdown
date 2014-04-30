---
title: phpMyAdmin
weight: 1
---

## Getting started with phpMyAdmin

[phpMyAdmin](http://www.phpmyadmin.net/home_page/index.php) is a free and popular software tool written in PHP that provides a web interface for administration of MySQL databases. 

AppFog's phpMyAdmin jumpstart is slightly modified to work better in AppFog's environment. Check out the GitHub repository [here](https://github.com/appfog/af-php-myadmin). 

## Install phpMyAdmin

### 1. Create the app. 

Go to [the console](https://console.appfog.com/) and click on "Create App" at the top of the screen. Choose the phpMyAdmin jumpstart and pick an infrastructure (make sure to pick the same infrastructure as the database service you want to connect it to). Give the phpMyAdmin app a name and hit the "Create App" button. 

### 2. Bind the database service.

Next you'll need to bind your new phpMyAdmin app to the database service you want to manage. On the app's management page, hit the "Services" tab, find the service you want, and hit the "Bind" button. 

### 3. Secure the app. 

You'll also need to add a password to your phpMyAdmin app. Click on the "Env Variables" tab on the left. Create an environment variable called: 

    PMA_PASSWORD

You can set the value to whatever you want as your password. Your default phpMyAdmin username is the email address your AppFog account is under, but you can optionally override that to something of your choice by creating another environment variable called `PMA_USERNAME`.

That's it! Your phpMyAdmin app is ready to go. 

One addition you may want to make to the app is to force SSL. You can do this very easily by adding an `.htaccess` file to the root of the app with a forced redirect from `http` to `https`.
