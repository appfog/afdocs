---
layout: doc-page
title: Frequently Asked Questions
weight: 14
---

* [How reliable is PHP Fog?](#reliable)
* [What type of SLA does PHP Fog offer?](#sla)
* [Is my app still running when PHP Fog is under maintenance?](#maintenance)
* [How secure is PHP Fog?](#secure)
* [Does PHP Fog support SSL?](#ssl)
* [Is PHP Fog PCI compliant? ](#pci)
* [Do I have to modify my app to run on PHP Fog?](#modify)
* [Can I get SSH access?](#ssh)
* [Can I get FTP access?](#ftp)
* [I modified my app through a web interface but those changes aren't reflected in git. Why not?](#web)
* [Can my app access third party services?](#3rdparty)
* [What version of PHP, Apache, and MySQL does PHP Fog use?](#version)
* [What are the differences between Shared and Dedicated Clouds?](#sharedvdedicated)
* [How do I log into New Relic? ](#newrelic)
* [Can I migrate from a Dedicated Cloud to a Shared Cloud?](#migrate)

#### How reliable is PHP Fog? {#reliable}

Very! We have redundancy and failover built into every piece of the PHP Fog stack end-to-end. Click [here](/reliability) for a full walkthrough on all of our reliability components.

#### What type of SLA does PHP Fog offer? {#sla}

We don't offer a general SLA, but if you have specific SLA requirements, feel free to contact us at [support@appfog.com](mailto:support@appfog.com). 

#### Is my app still running when PHP Fog is under maintenance? {#maintenance}

Yes. While the PHP Fog website and your app console will be inaccessible during maintenance, your app will continue to run. You'll also continue to have access to your source code. 

#### How secure is PHP Fog? {#secure}

We take security very seriously. For a full walkthrough of our security precautions, check out [this page](/security).

#### Does PHP Fog support SSL? {#ssl}

We provide SSL for all *.phpfogapp.com subdomains and support SSL on custom subdomains, including www. Check out [this guide](/customize/ssl) for additional details.

#### Is PHP Fog PCI compliant? {#pci}

We're not PCI compliant as a service or as a host yet. We are in the process of getting PCI compliance certification for our service. We have no current plans for offering PCI compliance on our hosting, but if you'd like to see it, let us know by contacting [support@appfog.com](mailto:support@appfog.com).

#### Do I have to modify my app to run on PHP Fog? {#modify}

Nope. We've set everything up to run without any changes.

#### Can I get SSH access? {#ssh}

To maintain security across our service, we don't offer SSH access. 

#### Can I get FTP access? {#ftp}

We have an SFTP feature on our roadmap, but no ETA. Meanwhile, you can access your source code using our [PF Command Line Tool](/getting-started/pf-command-line-tool) or [Git](/getting-started/git).

#### I modified my app through a web interface but those changes aren't reflected in git. Why not? {#web}

Git is a one-way versioning tool. That means any changes you make to your file system through a web interface will not propagate back into git. This is why we recommend setting up a local dev environment and making all code changes there and pushing those changes to your app through git. Read more about that in our [local dev environment guide](/getting-started/development).

For WordPress, you can get a backup of your file system with the [ManageWP plugin](http://managewp.com/).

#### How do I log into New Relic? {#newrelic}

Just use the email address your PHP Fog account is under as your username and your original MySQL password. 

#### Can my app access third party services? {#3rdparty}

Yes. PHP Fog apps have no firewalls or other network blocking mechanisms, so your app is free to call external web services.

#### What version of PHP, Apache, and MySQL does PHP Fog use? {#version}

* PHP version 5.3.2
* Apache version 2.2.14
* MySQL version 5.1.41

#### What are the differences between Shared and Dedicated Clouds? {#sharedvdedicated}

In order to ensure the security of your Shared Cloud app, we restrict certain configurations and functions.

###### Server Resources

Shared Cloud apps run on a Shared Cloud server alongside many other Shared apps. This means your server resources are restricted as follows:

* 100M storage
* Shared CPU, memory, and filesystem
* Memory Limits on an instance is 48MB on Shared (128MB on Dedicated)

These restrictions mean that your app may run into errors if it tries to use too many resources.

###### Configuration Differences

* APC opcode cache disabled
* New Relic monitoring disabled

###### Disabled Functions

The following functions are disabled on our Shared Cloud to ensure the security of your app:

* escapeshellarg
* escapeshellcmd
* exec
* passthru
* pcntl_exec
* proc_close
* proc_get_status
* proc_open
* proc_nice
* proc_terminate
* shell_exec
* system
* ini_restore
* popen
* file_get_contents for remote URLS
* fopen for remote URLS
* pclose
* dl
* disk_free_space
* diskfreespace
* disk_total_space
* set_time_limit
* tmpfile
* openlog
* show_source
* highlight_file
* link
* symlink
* php_uname
* apache_child_terminate
* apache_get_modules
* apache_get_version
* apache_getenv
* apache_note
* apache_setenv
* posix_kill
* posix_mkfifo
* posix_setpgid
* posix_setsid
* posix_setuid
* posix_getpwuid
* posix_uname

Check out [this page](http://limits.phpfogapp.com/) for more information on the PHP restrictions of our Shared service. 

#### Can I migrate from a Dedicated Cloud to a Shared Cloud? {#migrate}

No. Our Shared Cloud is more restricted than our Dedicated Clouds, so seamless and automated migration from Dedicated to Shared isn't possible. An alternative way to do this is to start a new Shared app and migrate your source code using [git](/getting-started/git).
