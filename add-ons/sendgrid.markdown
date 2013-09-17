---
title: SendGrid
weight: 18 
---

[SendGrid's](https://sendgrid.com) cloud-based email infrastructure relieves businesses of the cost and complexity of maintaining custom email systems. SendGrid provides reliable delivery, scalability and real-time analytics along with flexible APIs that make custom integration a breeze.

## Install SendGrid

In the "Add-ons" tab on your app console click "Install" for the SendGrid add-on. That's it!

Once SendGrid has been added, you will notice new environment variables: in the `Env variables` tab on your app console: `SENDGRID_USERNAME`, `SENDGRID_PASSWORD`, `SENDGRID_SMTP_HOST`.

Next, setup your app to start using the SendGrid add-on. In the following sections we have documented the interfaces with several languages and frameworks supported by AppFog.

* [Ruby/Rails](#sendgrid-rails)
* [Java](#sendgrid-java)
* [PHP](#sendgrid-php)
* [Node.js](#sendgrid-node)
* [Python](#sendgrid-python)

## Ruby on Rails {#sendgrid-rails}

You can quickly get started with SendGrid using Ruby on Rails ActionMailer.
You will need to edit the ActionMailer settings in `config/environment.rb` to use SendGrid credentials from environment variables:

    ActionMailer::Base.smtp_settings = {
      :address => ENV["SENDGRID_SMTP_HOST"],
      :port => '587',
      :authentication => :plain,
      :user_name => ENV["SENDGRID_USERNAME"],
      :password => ENV["SENDGRID_PASSWORD"],
      :domain => 'yourdomain.com',
      :enable_starttls_auto => true
    }

## Java {#sendgrid-java}

This Java program will build a multi-part MIME email and send it through SendGrid. Java already has built in libraries to send and receive emails. This example uses [javamail](https://java.net/projects/javamail/pages/Home).

        import javax.mail.*;
        import javax.mail.internet.*;
        import javax.mail.Authenticator;
        import javax.mail.PasswordAuthentication;
        import java.util.Properties;
        
        public class SimpleMail {
        
            private static final String SMTP_HOST_NAME = System.getenv("SENDGRID_SMTP_HOST");
            private static final String SMTP_AUTH_USER = System.getenv("SENDGRID_USERNAME");
            private static final String SMTP_AUTH_PWD  = System.getenv("SENDGRID_PASSWORD");
        
            public static void main(String[] args) throws Exception{
                new SimpleMail().test();
            }
        
            public void test() throws Exception{
                Properties props = new Properties();
                props.put('mail.transport.protocol', 'smtp');
                props.put('mail.smtp.host', SMTP_HOST_NAME);
                props.put('mail.smtp.port', 587);
                props.put('mail.smtp.auth', 'true');
        
                Authenticator auth = new SMTPAuthenticator();
                Session mailSession = Session.getDefaultInstance(props, auth);
                // uncomment for debugging infos to stdout
                // mailSession.setDebug(true);
                Transport transport = mailSession.getTransport();
        
                MimeMessage message = new MimeMessage(mailSession);
        
                Multipart multipart = new MimeMultipart('alternative');
        
                BodyPart part1 = new MimeBodyPart();
                part1.setText('This is multipart mail and u read part1');
        
                BodyPart part2 = new MimeBodyPart();
                part2.setContent('<b>This is multipart mail and u read part2</b>', 'text/html');
        
                multipart.addBodyPart(part1);
                multipart.addBodyPart(part2);
        
                message.setContent(multipart);
                message.setFrom(new InternetAddress('me@myhost.com'));
                message.setSubject('This is the subject');
                message.addRecipient(Message.RecipientType.TO,
                    new InternetAddress('someone@somewhere.com'));
        
                transport.connect();
                transport.sendMessage(message,
                message.getRecipients(Message.RecipientType.TO));
                transport.close();
            }
        
            private class SMTPAuthenticator extends javax.mail.Authenticator {
                public PasswordAuthentication getPasswordAuthentication() {
                    String username = SMTP_AUTH_USER;
                    String password = SMTP_AUTH_PWD;
                    return new PasswordAuthentication(username, password);
                }
            }
        }


## PHP {#sendgrid-php}

You can use [this](https://github.com/sendgrid/sendgrid-php) library to send emails through SendGrid using PHP.
More information about the library can be found [here](http://sendgrid.com/docs/Code_Examples/php.html).

    include 'path/to/sendgrid-php/SendGrid_loader.php';
    $sendgrid = new SendGrid($_ENV['SENDGRID_USERNAME'], $_ENV['SENDGRID_PASSWORD']);
    $mail = new SendGrid\Mail();
    $mail->
      addTo('foo@bar.com')->
      setFrom('me@bar.com')->
      setSubject('Subject goes here')->
      setText('Hello World!')->
      setHtml('<strong>Hello World!</strong>');


For sending emails using SMTP:

    $sendgrid->
    smtp->
      send($mail);


For sending emails using the Web API:

    $sendgrid->
    web->
      send($mail);


## Node.js {#sendgrid-node}

SendGrid has a Node.js package that is written and maintained by two core engineers. The code is open source and available on [Github](https://github.com/sendgrid/sendgrid-nodejs).

Add the following settings in package.json file

    {
      "name": "node-sendgrid-example",
      "version": "0.0.1",
      "dependencies": {
        "express": "3.1.x",
        "sendgrid": "0.3.0-rc.1.7"
      },
      "engines": {
        "node": ">= 0.4.7"
      }
    }

Install SendGrid locally with the following command: `npm install`

To begin using this library, initialize the sendgrid object with your SendGrid credentials:

    var sendgrid  = require('sendgrid')(
      process.env.SENDGRID_USERNAME,
      process.env.SENDGRID_PASSWORD
    );

Send the email.

    sendgrid.send({
      to: 'example@example.com',
      from: 'sender@example.com',
      subject: 'Hello World',
      text: 'Sending email with NodeJS through SendGrid!'
    }, function(err, json) {
      if (err) { return console.error(err); }
      console.log(json);
    });

Full documentation of all the features of SendGrid's Node.js package can be found on [Github](https://github.com/sendgrid/sendgrid-nodejs).

## Python {#sendgrid-python}

Before start writing the code you need to copy the [SendGrid Python library](https://github.com/sendgrid/sendgrid-python/tree/master/sendgrid) into your project by placing the files in a sendgrid sub-directory. When you import this library into your app you'll be able to create SendGrid instances and send mail with simple commands.
This library allows you to quickly and easily send emails through SendGrid using Python.

At the top of your app's .py file, import the sendgrid library:

    import sendgrid

Now, from within your app, you can send email with the following few lines:

    # make a secure connection to SendGrid
    s = sendgrid.Sendgrid(os.environ.get('SENDGRID_USERNAME'), os.environ.get('SENDGRID_PASSWORD'), secure=True)
    # make a message object
    message = sendgrid.Message("from@mydomain.com",
                               "message subject1111",
                               "plaintext message body",
                               "<strong>HTML message body</strong>")
    # add a recipient
    message.add_to("someone@example.com", "John Doe")

use the Web API to send your message

    s.web.send(message)

or use the SMTP API to send your message

    s.smtp.send(message)

## Dashboard

SendGrid offers statistics for a number of different metrics to report on what is happening with your messages.

<img src="http://static.sendgrid.com.s3.amazonaws.com/images/delivery_metrics.png" class="screenshot" />

To access your SendGrid dashboard, simply click the "Manage" button of the SendGrid add-on in the "Add-ons" tab on your app console.

## Support

One of SendGrid's best features is its responsive customer service. You can contact SendGrid 24/7 by phone, web, and live chat:

* [http://support.sendgrid.com](http://support.sendgrid.com/)
* Toll Free: +1 (877) 969-8647
* [support@sendgrid.com](mailto:support@sendgrid.com)


## Additional resources

Additional resources are available at:

* [Integrate With SendGrid](http://sendgrid.com/docs/Integrate/index.html)
* [Code Examples](http://sendgrid.com/docs/Code_Examples/index.html)
