---
CloudAMQP
---

### Intro

[CloudAMQP](http://www.cloudamqp.com) is a hosted [RabbitMQ](http://www.rabbitmq.com) service.  Managed, high performance message queue server, CloudAMQP provides RabbitMQ clusters on EC2, with high availability and global distribution, aiming for the lowest latency on message throughput.

### Why use CloudAMPQ

If you need robust messaging with little setup for your app, RabbitMQ/CloudAMQP is an elegant solution.

### Install CloudAMQP

In the AppFog console and select the app you wish to add CloudAMQP to.
Navigate to the “Add-ons” tab and click “Install”for the CloudAMQP add-on.

Additionally if you may need to install RabbitMQ for local development see the link in Additional Resources for instructions.

### Connect to CloudAMQP/RabbitMQ

Installing the CloudAMQP add-on automatically sets an environment variable for your app called "`CLOUDAMQP_URL`". Then follow any of the language guides on [CloudAMQP Docs](http://www.cloudamqp.com/docs.html).

### CloudAMQP Console

To access your CloudAMQP dashboard, simply click the "Manage" button under CloudAMQP from the "Add-ons" tab on your app console. This will also direct you to the RabbitMQ management console.

### Additional Resources
* [CloudAMPQ Documentation](http://www.cloudamqp.com/docs/index.html)
* [RabbitMQ Installation](http://www.rabbitmq.com/download.html)
* [RabbitMQ Documentation](http://www.rabbitmq.com/documentation.html)
