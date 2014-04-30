---
CloudMailin
---

### Intro

[CloudMailin](http://www.cloudmailin.com/) adds incoming mail functionality to your AppFog application. You are provided with an email address that will forward an incoming request as an HTTP POST. Also provided are, a dashboard to track the delivery status of messages and bounce messages, and custom domain settings.

### Why use CloudMailin?

If you need incoming mail to your app, but don't want to deal with redirection or scheduled jobs, and track mails statuses.

### Install CloudMailin

In the AppFog console, select the application you wish to setup.
Navigate to the “Add-ons” tab and click “Install” for the CloudMailin add-on.

### Use CloudMailin

Installing CloudMailin automatically creates an environment variable for your app called ‘CLOUDMAILIN_FORWARD_ADDRESS’ .

In the CloudMailin console you can click “Edit Target” to specify the address in your application that will receive the emails via an HTTP POST (e.g. /mail.php)
The following example code shows how to forward an email into your app via an HTTP POST using PHP.

    <?php
        $from = $_POST['from'];
        $to = $_POST['to'];
        $plain_text = $_POST['plain'];

        header("Content-type: text/plain");

        if ($to == getenv("CLOUDMAILIN_FORWARD_ADDRESS")) {
            header("HTTP/1.0 200 OK");
            echo('success');
            }else{
            header("HTTP/1.0 403 OK");
            echo('user not allowed here');
        }

        exit;
    ?>

### CloudMailin Console

You can take a look at your CloudMailin account from your app console Add-ons page, and click “Manage”.

### Additional Resources

* [CloudMailin Documentation](http://docs.cloudmailin.com/)



