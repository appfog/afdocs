---
title: PHP
weight: 3
---

## PHP

* [Custom PHP App](#custom)
* [php.ini](#php_ini)
* [Document Root](#docroot)

## Supported Versions

For the most reliable experience, make sure you have the same version of PHP installed on your local development environment as the target AppFog instance. You can check the available runtimes by running: 

    $ af runtimes
    
    +--------------+-----------------+-----------+
    | Name         | Description     | Version   |
    +--------------+-----------------+-----------+
    | java         | Java 7          | 1.7.0     |
    | php          | PHP 5           | 5.3       |
    | ruby18       | Ruby 1.8.7      | 1.8.7     |
    | ruby192      | Ruby 1.9.2      | 1.9.2p180 |
    | ruby193      | Ruby 1.9.3 p125 | 1.9.3     |
    | python2      | Python 2.7.3    | 2.7.3     |
    | node04       | Node.js 0.4.12  | 0.4.12    |
    | node06       | Node.js 0.6.17  | 0.6.17    |
    +--------------+-----------------+-----------+

AppFog supports PHP with `Apache 2.2.22` and `mod_php`. You can take a closer look at the PHP and Apache configurations [here](http://phpinfo.aws.af.cm/info.php).

## Persistent Data Storage

AppFog does not yet have a persistent data storage system, though we're working on it. This means that the file system is volatile and any data that needs to be persistent should be included in the code base (by making all changes in a local development environment) or offloaded to a database or an external storage system like Amazon's S3. You can find a tutorial on just how to do that [here](http://blog.appfog.com/how-to-use-amazon-s3-for-persistent-file-storage-on-appfog/).

## Services

You can connect your PHP app to AppFog services by using the `VCAP_SERVICES` environment variable, which becomes available to your app when you bind a service to it. You can access the variable in PHP like this: 

    getenv('VCAP_SERVICES')

For more information on this, check out our [Services Overview](/services/overview) page.

## Custom PHP App {#custom}

### Create the App

Create a directory for the app and change into it:

    $ mkdir php-example
    $ cd php-example

Create an `index.php` file with the following:

    <?php echo "Hello world!"; ?>

### Deploy to AppFog

    $ af push php-example
    Would you like to deploy from the current directory? [Yn]:
    Detected a PHP Application, is this correct? [Yn]:
    Application Deployed URL [php-example.aws.af.cm]:
    Memory reservation (128M, 256M, 512M, 1G, 2G) [128M]:
    How many instances? [1]:
    Bind existing services to 'php-example'? [yN]:
    Create services to bind to 'php-example'? [yN]:
    Would you like to save this configuration? [yN]:
    Creating Application: OK
    Uploading Application:
        Checking for available resources: OK
        Packing application: OK
        Uploading (0K): OK
    Push Status: OK
    Staging Application 'php-example': OK
    Starting Application 'php-example': OK

    $ af curl php-example.aws.af.cm
    Hello world!% 

## `php.ini` {#php_ini}

AppFog does not support direct access to `php.ini`. However, the `AllowOverride` directive in `php.ini` is set to "`All`" which enables you to set the values of the directives in your `.htaccess` or in your PHP file via `ini_set()`.

### Setting Values `.htaccess`

Setting the value of a directive in `.htaccess` is easy. Simply place the following line of code in your `.htaccess` file, and insert the name and value of the directive you want to use:

    php_value <name> <value>

For more information on this topic, check out the following references: 

* [How to change configuration settings](http://php.net/manual/en/configuration.changes.php)
* [Set php.ini Values Using .htaccess](http://davidwalsh.name/php-values-htaccess)

### Setting Values Using `ini_set()`

Please consult the [PHP manual on `ini_set()`](http://www.php.net/manual/en/function.ini-set.php).

## Document Root {#docroot}

You can modify your document root adding the following into your `.htaccess`:

    RewriteEngine on
    RewriteCond %{HTTP_HOST} ^domain.com$ [NC,OR]
    RewriteCond %{HTTP_HOST} ^www.domain.com$
    RewriteCond %{REQUEST_URI} !public/
    RewriteRule (.*) /public/$1 [L]
