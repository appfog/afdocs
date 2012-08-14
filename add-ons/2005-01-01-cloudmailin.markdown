---
title: CloudMailin
layout: doc-page
weight: 16
---

#### Install CloudMailin

In the "Add-ons" tab in your app console click "Install" for the CloudMailin add-on. That's it!

#### Receive Email

Cloudmailin can receive email and forward them to your app by performing a POST to a specific page.

Log in to the Cloudmailin console by clicking "Manage" on the add-on in your PHP Fog app console.

Go to "Edit Target" and specify the address in your application that will receive the emails via an HTTP POST (e.g. /mail.php).

Here's the code that goes into that page:

{: .prettyprint .linenums}
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

That's it! Now any email sent to your CloudMailin email address will forward to your app. You can always check to see what your CloudMailin email address is by going to the "Env. Variables" tab in your PHP Fog app console and looking for the "`CLOUDMAILIN_FORWARD_ADDRESS`", or by logging in to CloudMailin directly. 

You can set up your custom domain emails to forward, too. You can find information on that [here](http://docs.cloudmailin.com/receiving_email/forwarding_and_custom_domains/).
