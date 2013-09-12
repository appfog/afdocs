
---
title: CloudAMQP
weight: 2
---

[CloudAMQP](http://www.cloudamqp.com) is a hosted [RabbitMQ](http://www.rabbitmq.com) service. RabbitMQ is a fast, reliable and standard compliant message queue server. CloudAMQP hosts RabbitMQ clusters, with high availability in EC2, close to where you're app is run, for lowest possible latency and message throughput.

## Install CloudAMQP

In the "Add-ons" tab in your app console click "Install" for the CloudAMQP add-on.

On your local machine install with ```brew install rabbitmq```.

## Connect to CloudAMQP/RabbitMQ

Installing the CloudAMQP add-on automatically sets an environment variable for your app called "`CLOUDAMQP_URL`". Then follow any of the language guides on [CloudAMQP Docs](http://www.cloudamqp.com/docs.html).

## CloudAMQP management interface

In the "Add-ons" tab in your app console, click on the "Manage" button for the CloudAMQP add-on. This will take you to your RabbitMQ management interface page for your CloudAMQP account.
