---
title: SSL for Custom Domains
weight: 2
---

## SSL for Custom Domains

SSL is automatically enabled on all apps with default domain names, i.e. domain names that end in the following: 

* \*.aws.af.cm
* \*.ap01.aws.af.cm
* \*.eu01.aws.af.cm
* \*.rs.af.cm
* \*.hp.af.cm

#### **SSL for custom domain names is currently restricted in the following ways:**

* Apps on Amazon AWS infrastructures 
* **ONLY for paid accounts ($50/mo or more):**

	* $ 50/month: 1 SSL Endpoint
	* $100/month: 2 SSL Endpoints
	* $380/month: 4 SSL Endpoints
	* $720/month: 6 SSL Endpoints

Adding SSL to your custom domain is simple. First, make sure you have the following: 

* Your RSA private key
* Your SSL certificate

### Get an SSL Certificate

If you already have a certificate, skip down to [the next section on installation](#install).

To get an SSL certificate from a Certificate Authority, you'll first need to generate an RSA private key and a Certificate Signing Request (CSR). 

#### Generate a private key

You can use the `openssl` toolkit to generate an RSA private key and a CSR:

    $ openssl genrsa -des3 -out server.key 1024

You'll have to use a passphrase when you generate the key, but we'll remove it later.

#### Generate a CSR

You can now use the private key you just made to generate a CSR:

    $ openssl req -new -key server.key -out server.csr

#### Get a certificate from a Certificate Authority

You can now send your CSR (the `server.csr` file) to a Certificate Authority, which they'll use to generate your certificate. Once you have that, you're ready to set up SSL for your AppFog app. 

### Install your private key and SSL certificate {#install}

If your private key is password-protected, you'll have to remove the password first:

    $ cp server.key server.key.org
	$ openssl rsa -in server.key.org -out server.key

#### Upload Certificate Data

Now you're ready to head over to the [AppFog web console](http://console.appfog.com). Click on one of your apps, hit the "SSL" tab on the left, and hit the "Get Started" button.

On the "Upload Certificate Data" screen, click on the "Upload Your Certificate" button and navigate to your certificate file (`server.crt` if you followed the instructions above).

Next, click on the "Upload Your Private Key" button and navigate to your private key (`server.key` if you followed the instructions above).

Then do the same with any intermediate certificates your Certificate Authority gave you. 

You now have an SSL terminator that should look something like: `af-ssl-term-0-000000000.us-east-1.elb.amazonaws.com`.

#### Change your DNS

Now head over to your DNS host and update your app's CNAME alias to point at the SSL terminator you just created. That's it! Once your new DNS settings propagate, SSL will be enabled for your app. 
