---
layout: doc-page
title: PF Command Line Tool
weight: 2
description: "Git and SSH made easy."
---

PHP Fog uses git to give you access to your code and push changes to your cloud. Git is an extremely powerful and flexible tool for managing code, but it's also pretty complex and can be intimidating for developers who haven't used it before. SSH key management can also be pretty complicated and error-prone. That's why we created the PF Command Line Tool: to allow developers to jump into PHP Fog as quickly and simply as possible.

PF is a command line tool for managing PHP Fog apps from the terminal. The tool allows you to list, view, and delete apps. It also does more advanced operations for you, like set up your SSH keys for multiple PHP Fog accounts and deploy apps using git submodules. 

Note: PF modifies your SSH configuration, so we highly recommend that once you install the PF tool, you use it to clone and deploy apps instead of git. 

Prefer to just use git? Comfortable with SSH keys already? PF is completely optional! Feel free to skip ahead to the section on [SSH keys](/getting-started/ssh) or [git](/getting-started/git).

### 1. Download and install PF.

{: .prettyprint}
    $ curl -s https://raw.github.com/phpfog/pf/master/bin/installer | php

Windows user? Skip down to [the Windows section](#windows).

### 2. Set up your credentials in PF. {#credentials}

{: .prettyprint}
    $ pf setup 

### 3. List your apps.

{: .prettyprint}
    $ pf list apps 

This will allow you to pick the name/id to use to download an app in the next step.

### 4. Download your source code.

To get the code we'll use the "pf clone" command. You can use the "ID" or the "Name" of the app list in the previous step. 

{: .prettyprint}
    $ pf clone 811 

Note: The first time you run this command, it will ask you to authorize the SSH address. Make sure to type in 'yes'.

Running into problems with this step? Check out our guide on [troubleshooting ssh](/troubleshooting#ssh).

### 5. Add a new file and push the change to the server.

Change your current working directory to the git repo.

{: .prettyprint}
     $ cd foo.phpfogapp.com/  

Create a new file called `helloworld.php` and populate it with some text.

{: .prettyprint .linenums}
    <?php
        echo "hello world";
    ?>
 
### 6. Add the file to staging.

{: .prettyprint}
    $ git add . 

This command tells git to "stage" the file to get ready to commit to your repository. The "." adds all the files in this directory recursively.

### 7. Commit your changes.

{: .prettyprint}
    $ git commit -m "my first update" 

This commits the new file to your git repository. It's still local, but now it's ready to be uploaded (i.e. "pushed"). 

### 8. Push your changes.

{: .prettyprint}
    $ pf push 

This command uploads the committed changes to PHP Fog.

### Done!

That's it! Wait a couple of minutes for your code to deploy and you should be able to see your changes live!

Ready for more? Continue on to [development](/getting-started/development).


# Windows {#windows}

Here are some things to note while using this guide:

Git Shell uses <a href="http://msdn.microsoft.com/en-us/library/windows/desktop/aa973757(v=vs.85).aspx">Powershell</a> and may ask you to install `.NET Framework 4.0` during the installation process. These instructions are for [Wamp](http://www.wampserver.com/en/), but other Windows installations of PHP should work. 

Additionally, you might have to modify some of the paths to match the paths on your system. If things don't work the first time, double-check that the paths are correct.

### References

* [PF Command Line Tool Github Repo](https://github.com/phpfog/pf)
* [Command Line PHP on Microsoft Windows](http://php.net/manual/en/install.windows.commandline.php)

### Downloads

* [Download and install Github for Windows](http://windows.github.com/).
* [Download and install WampServer 2 32 or 64 bit](http://www.wampserver.com/en/#download).

Make a note of where Wamp’s `php.exe` was installed. The default path should be: `C:\wamp\bin\php\php5.3.13`. You'll need this path later.

### Turn on `CURL` for PHP

Edit the `php.ini` located at `C:\wamp\bin\php\php5.3.13\php.ini` and remove the semicolon from the beginning of the extension line “`;extension=php_curl.dll`” and save. 

Note: Using the Wamp tray tool to enable `php_curl` does not work for the purposes of running PF.

From the Wamp tray icon, “Start All Services”.

### Environment Variables

Open the control panel and search for environment variables. Click on the link with the shield icon labeled “Edit the system environment variables.” In the System Properties dialog click “environment variables.”

* Under system variables, add the following to the end of the Path var list (include the semicolon): 

{: .prettyprint}
	;C:\wamp\bin\php\php5.3.13

* Add the following PF bin path to the end of Path var. Note that the path needs to have your Windows user name. This path doesn't exist yet but we'll create it later on in this guide.

{: .prettyprint}
	;C:\Users\<username>\PHPFog\pf\bin

* Add the following to the end of the `PATHEXT` var: `;.PHP`

### Associate PHP Files

In order for the `pf` command to work PHP CLI has to be configured to execute PHP scripts without the `.php` extension. Run the following commands with `CMD.exe` as an admininstrator. From the Start Menu search for "cmd", right-click, and select “Run as administrator.” Then run the following commands:

{: .prettyprint}
    assoc .php=phpfile

Edit the path in the following command to match your Wamp installation's PHP directory.

{: .prettyprint}
	ftype phpfile="C:\wamp\bin\php\php5.3.13\php.exe" -f "%1" -- %~2

### Registry

Create a registry file with the text below and run it from the desktop. You may need to show extensions for known file types in order to name the registry file correctly. Edit the paths in the file to reflect the actual path to Wamp’s php.exe file:

{: .prettyprint}
	Windows Registry Editor Version 5.00

	[HKEY_LOCAL_MACHINE\SOFTWARE\Classes\.php]
	@="phpfile"
	"Content Type"="application/php"

	[HKEY_LOCAL_MACHINE\SOFTWARE\Classes\phpfile]
	@="PHP Script"
	"EditFlags"=dword:00000000
	"BrowserFlags"=dword:00000008
	"AlwaysShowExt"=""

	[HKEY_LOCAL_MACHINE\SOFTWARE\Classes\phpfile\DefaultIcon]
	@="C:\\wamp\\bin\\php\\php5.3.13\\php-win.exe,0"

	[HKEY_LOCAL_MACHINE\SOFTWARE\Classes\phpfile\shell]
	@="Open"

	[HKEY_LOCAL_MACHINE\SOFTWARE\Classes\phpfile\shell\Open]
	@="&Open"

	[HKEY_LOCAL_MACHINE\SOFTWARE\Classes\phpfile\shell\Open\command]
	@="\"C:\\wamp\\bin\\php\\php5.3.13\\php.exe\" -f \"%1\" -- %~2"

### Download and install PF CLI

Open up a new Git Shell and run the following command:

{: .prettyprint}
	curl -s https://raw.github.com/phpfog/pf/master/bin/installer | php

If you get PHP parse errors, just keep re-running the command until it completes successfully.

If you get a warning dialog popup with the message “PHP Startup: Unable to load dynamic library” regarding `php_curl.dll`, you'll need to download a newer version of the DLL, which you can find linked in [this post](http://www.anindya.com/php-5-4-3-and-php-5-3-13-x64-64-bit-for-windows/).

Replace the `php_curl.dll` found at `C:\wamp\bin\php\php5.3.13\ext` with the one you just downloaded. Retry the `CURL` command above until the installation completes.

### Rename the pf executable

Find the “pf” file located at `C:\Users\<username>\PHPFog\pf\bin\pf` and rename it to `pf.php`.

### Restart

In order for all the changes to take effect, you'll have to restart your computer, then start WampServer. Make sure that the WampServer tray icon indicates that the services are up and running.

Open a new Git Shell console and you'll be able to run the `pf` command even without the `.php` extension.

Now head back up to [Step 2](#credentials) to set up your credentials. 
