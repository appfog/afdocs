---
title: Python
weight: 3
---

* [WSGI](#wsgi)
* [Dependencies](#dependencies)
* [Services](#services)

AppFog currently supports Python 2.7.3. You can check the available runtimes by running `af runtimes`.


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




# WSGI {#wsgi} 

AppFog supports Python by serving apps through the [WSGI](http://wsgi.readthedocs.org/en/latest/index.html) protocol using [Gunicorn](http://gunicorn.org/). 

By convention, the entry point for non-django applications should be in a file named `wsgi.py` in the base directory and should contain a function named `application` with 2 parameters for the wsgi `environ` and `start_response`. The full gunicorn command will be something like `gunicorn -c gunicorn.config wsgi:application`, where the generated config file will include the port your application will bind to. For django applications, the wsgi.py file is not required. Unfortunately, the file your app is bootstrapped through (wsgi.py) and name of your application function is not customizable on AppFog. 


# Dependencies {#dependencies}

AppFog uses `pip` (1.1) and `virtualenv` to deploy apps. You can define the package prequisites of your Python app in a top-level [requirements.txt](http://www.pip-installer.org/en/latest/requirements.html#the-requirements-file-format) file, which `pip` uses to install dependencies. Dependencies will be downloaded and re-cached into your package whenever you update your app. In cases where your requirements take an exceptionally long time to download or compile, you have as an option the ability to bundle your requirements along with your application code. For more details, see the [pip docs](http://www.pip-installer.org/en/1.1/usage.html#bundles). 
    
## Limitations

There is currently a known issue with Python apps that include many dependencies. We are working on a solution to this that should be available very soon.

## Services {#services}

You can connect your Python app to AppFog services by using the `VCAP_SERVICES` environment variable, which becomes available to your app when you bind a service to it. For more information on this, check out our [Services Overview](/services/overview) page.
