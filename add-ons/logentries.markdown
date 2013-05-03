---
title: Logentries
weight: 18
---

[Logentries](https://logentries.com/) provides Log Management and System Intelligence as a Service. Logentries is a simple and powerful solution for log management. It provides an easy to use interface so that you can quickly understand what is happening in your log data and ultimately your applications. Setup one of the client libraries below in a matter of minutes and start sending logs to Logentries from your AppFog application.

## Install Logentries

In the "Add-ons" tab on your app console click "Install" for the Logentries add-on. Then add the appropriate library below and you're done!

Once Logentries has been added, you will notice a new enironment variable: `LOGENTRIES_TOKEN` in the `Env variables` tab on your app console, containing a Token UUID that is used by the client library to locate your logfile on Logentries.

Next, setup your app to start using the Logentries add-on. In the following sections we have documented the interfaces with several languages and frameworks supported by AppFog.

* [Ruby](#logentries-ruby)
* [Rails](#logentries-rails)
* [Sinatra](#logentries-sinatra)
* [PHP](#logentries-php)
* [NodeJS](#logentries-nodejs)
* [Java](#logentries-java)
* [Python](#logentries-python)


## Using Logentries from Ruby {#logentries-ruby}

There are two Logentries rubygems, for Rails and Sinatra.

### Configuring Logentries from Rails {#logentries-rails}

For Rails, update the `gemfile` to include the logentries gem:
    
    gem 'le' 
    
And then install the gem via Bundler:

    $ bundle install

Enter the following in `config/environment.rb`: 
    
    Rails.logger = Le.new(ENV.fetch('LOGENTRIES_TOKEN'))

Lastly, write some log events:

	Rails.logger.info("Hello Logentries. I'm an info message")

### Configuring Logentries on Sinatra {#logentries-sinatra}

For Sinatra, update the `gemfile` to include the logentries gem:

	gem 'sinatra-logentries'

And then install the gem via Bunlder:
	
	$ bundle install

Enter the following in your `app.rb` file:

	require 'sinatra-logentries'

	configure do
		Sinatra::Logentries.token = ENV.fetch('LOGENTRIES_TOKEN')
	end

Lastly, write some log events:

	logger.info("Hello Logentries, I'm an info message.")
    
## Using Logentries from PHP {#logentries-php}

Get the <a href="https://github.com/logentries/le_php/archive/master.zip">PHP library</a> from our Github repository.

Unzip it into your applications root directory.

Enter this line at the top of a PHP file you wish to log from  (Adjust if you unzipped elsewhere):

	require dirname(__FILE__) . '/le_php-master/logentries.php';

Lastly, write some log events:

	$log->Info("Hello Logentries, I'm an info message");
	$log->Warn("Hey Logentries, I'm a warning");

## Using Logentries from NodeJS {#logentries-nodejs}

For NodeJS, install the Logentries library with npm in your apps directory:

	npm install node-logentries

Enter the following at the top of your `app.js` file:

	var logentries = require('node-logentries');
	var log = logentries.logger({
		token:process.env.LOGENTRIES_TOKEN
	});

Lastly, write some log events:

	log.info("Hey Logentries, I'm an info message")
    
## Using Logentries from Java {#logentries-java}

Maven Users
------------
Place this in your pom.xml:

	<dependencies>
  		<dependency>
    		<groupId>log4j</groupId>
    		<artifactId>log4j</artifactId>
    		<version>1.2.17</version>
  		</dependency>
  		<dependency>
    		<groupId>com.logentries</groupId>
    		<artifactId>logentries-appender</artifactId>
    		<version>1.1.13</version>
  		</dependency>
	</dependencies>

Manual Install
--------------
Download the plugin .jar file <a href="http://search.maven.org/remotecontent?filepath=com/logentries/logentries-appender/1.1.13/logentries-appender-1.1.13.jar">here</a> and place it in your `WEB-INF/lib` folder.

Then, if you don't already have it, download log4j from <a href="https://logging.apache.org/log4j/1.2/download.html">here</a> and place it in your `WEB-INF/lib` folder.

Configuration
-------------
The last file you need is the log4j config which you can download <a href="https://github.com/logentries/le_java/raw/master/log4j.xml">here</a>. Be sure to place this on your classpath. A simple way to do this is to put it in your src folder.

Lastly, write some log events, below is a sample Java class configured to use log4j.

	import org.apache.log4j.*;

	public class HelloLogentries
	{
		private static Logger log = LogManager.getRootLogger();

		public static void main(String[] args)
		{
			log.info("Hello Logentries, I'm from AppFog");
		}
	}

## Using Logentries from Python {#logentries-python}

For Python, place the following in your `requirements.txt` file, so it can be installed using pip:

	git+git://github.com/logentries/le_python.git

Configure the library in your code with the following lines:

	from logentries import LogentriesHandler
	import logging,os

	log = logging.getLogger('mylogger')
	log.addHandler(LogentriesHandler(os.getenv("LOGENTRIES_TOKEN")))

Lastly, write some log events

	log.info("Hello Logentries, I'm an info message")
	log.warning("Im quite important")

## Support

All Logentries support issues should be submitted to [Logentries Support](mailto:support@logentries.com) or via the Logentries in-app Support widget in the left sidebar. 

## Additional resources

* [Logentries AppFog Documentation](http://logentries.com/doc/appfog)
