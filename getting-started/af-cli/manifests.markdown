---
title: Manifests
weight: 4
---

`af` is based on CloudFoundry's `vmc` but includes features specific to AppFog and has the default target set to AppFog's service. Check out [the GitHub repo](https://github.com/appfog/af).

* [Installation](#installation)
    * [Mac OS X and Linux](#max-os-x-linux)
    * [Windows](#af-cli-install-windows)
* [Usage](#usage)
* [Getting Started](#getting-started)
* [Apps](#apps)
    * [App Creation](#app-creation)
    * [App Download](#app-download)
    * [App Operations](#app-ops)
    * [App Updates](#app-updates)
    * [App Information](#app-info)
    * [App Environment](#app-env)
    * [Services](#services)
    * [Administration](#admin)
    * [System](#system)
    * [Misc](#misc)
    * [Help](#help)
* [.afignore](#afignore)
* [Manifests](#manifests)

# Installation 

The `af` command line tool is written in Ruby and installed as a gem: 

### Mac OS X and Linux {#max-os-x-linux}

{: .prettyprint}
    $ gem install af

Note: `af` requires Ruby 1.8.7 or newer.

If you're on Mac OS X 10.7 Lion and you're having trouble, you may have to do the following:

1. Install Xcode 4.3 and the Xcode command line tools (use the "downloads" preference pane to download the command line tools).

2. [Install homebrew](https://github.com/mxcl/homebrew/wiki/Installation).

3. Install `libksba` with homebrew.

{: .prettyprint}
    $ brew install libksba

4. [Install RVM](https://rvm.io/rvm/install/).

5. Install Ruby 1.9.3:

{: .prettyprint}
    $ rvm install ruby-1.9.3
    $ rvm use 1.9.3

5. Install `af`

{: .prettyprint}
    $ gem install af
    $ af login

### Windows 

Download and install [Ruby Installer for Windows](http://rubyinstaller.org/). The installer already includes RubyGems.

Be sure you use the Ruby-enabled command prompt window when you later install and use `af`. You access this command prompt from the Windows Start menu (All Programs > Ruby <version> > Start Command Prompt with Ruby).

Finally, update RubyGems from the Ruby Command Prompt:

{: .prettyprint}
    $ gem update --system
    $ gem install af

Login with:

{: .prettyprint}
    $ af login

Finally from within your source code directory:

{: .prettyprint}
    $ af update hello-node

# Getting Started 

<table class="table table-bordered table-striped">
<tr>
    <td><code>target [url]</code></td>                                <td>Reports current target or sets a new target</td>
</tr>
<tr>
    <td><code>login  [email] [--email, --passwd]</code></td>          <td>Login</td>
</tr>
<tr>
    <td><code>info</code></td>                                         <td>System and account information</td>
</tr>
</table>

# Apps 

<table class="table table-bordered table-striped">
<tr>
    <td><code>apps</code></td>                                         <td>List deployed applications</td>
</tr>
</table>

### App Creation 

<table class="table table-bordered table-striped">

<tr><td><code>push [appname]</code></td>                <td>Create, push, map, and start a new application</td></tr>
<tr><td><code>push [appname] --infra </code></td>                <td>Push application to specificed infrastructure</td></tr>
<tr><td><code>push [appname] --path</code></td>                <td>Push application from specified path</td></tr>
<tr><td><code>push [appname] --url</code></td>                <td>Set the url for the application</td></tr>
<tr><td><code>push [appname] --instances &lt;N></code></td>                <td>Set the expected number <code>&lt;N></code> of instances</td></tr>
<tr><td><code>push [appname] --mem M</code></td>                <td>Set the memory reservation for the application</td></tr>
<tr><td><code>push [appname] --no-start</code></td>                <td>Do not auto-start the application</td></tr>

</table>

### App Download 

<table class="table table-bordered table-striped">
<tr><td><code>pull &lt;appname> [path]                   </code></td><td>Download last pushed source of &lt;appname> to [path]</td></tr>
</table>

### App Operations 

<table class="table table-bordered table-striped">

<tr><td><code>start &lt;appname></code>                             </td><td>Start the application</td></tr>
<tr><td><code>stop  &lt;appname></code>                              </td><td>Stop the application</td></tr>
<tr><td><code>restart &lt;appname></code>                            </td><td>Restart the application</td></tr>
<tr><td><code>delete &lt;appname></code>                             </td><td>Delete the application</td></tr>

</table>

### App Updates 

<table class="table table-bordered table-striped">

<tr><td><code>update &lt;appname> [--path]                       </code></td><td>Update the application bits</td></tr>
<tr><td><code>mem &lt;appname> [memsize]                         </code></td><td>Update the memory reservation for an application</td></tr>
<tr><td><code>map &lt;appname> &lt;url>                          </code></td><td>Register the application to the url</td></tr>
<tr><td><code>unmap &lt;appname> &lt;url>                        </code></td><td>Unregister the application from the url</td></tr>
<tr><td><code>instances &lt;appname> &lt;num|delta>              </code></td><td>Scale the application instances up or down</td></tr>

</table>

### App Information 

<table class="table table-bordered table-striped">

<tr><td><code>crashes &lt;appname>                            </code></td><td>List recent application crashes</td></tr>
<tr><td><code>crashlogs &lt;appname>                          </code></td><td>Display log information for crashed applications</td></tr>
<tr><td><code>logs &lt;appname> [--all]                       </code></td><td>Display log information for the application</td></tr>
<tr><td><code>files &lt;appname> [path] [--all]               </code></td><td>Display directory listing or file download for path</td></tr>
<tr><td><code>stats &lt;appname>                              </code></td><td>Display resource usage for the application</td></tr>
<tr><td><code>instances &lt;appname>                          </code></td><td>List application instances</td></tr>

</table>

### App Environment 

<table class="table table-bordered table-striped">

<tr><td><code>env &lt;appname>                                   </code></td><td>List application environment variables</td></tr>
<tr><td><code>env-add &lt;appname> &lt;variable[=]value>         </code></td><td>Add an environment variable to an application</td></tr>
<tr><td><code>env-del &lt;appname> &lt;variable>                 </code></td><td>Delete an environment variable to an application</td></tr>

</table>

### Services 

<table class="table table-bordered table-striped">

<tr><td><code>services                                               </code></td><td>Lists of services available and provisioned</td></tr>
<tr><td><code>create-service &lt;service> [--name,--bind]            </code></td><td>Create a provisioned service</td></tr>
<tr><td><code>create-service &lt;service> --infra            </code></td><td>Create a provisioned service on a specified infrastructure</td></tr>
<tr><td><code>create-service &lt;service> &lt;name>                  </code></td><td>Create a provisioned service and assign it &lt;name></td></tr>
<tr><td><code>create-service &lt;service> &lt;name> &lt;app>        </code></td><td>Create a provisioned service and assign it &lt;name>, and bind to &lt;app></td></tr>
<tr><td><code>delete-service [servicename]                           </code></td><td>Delete a provisioned service</td></tr>
<tr><td><code>bind-service &lt;servicename> &lt;appname>            </code></td><td>Bind a service to an application</td></tr>
<tr><td><code>unbind-service &lt;servicename> &lt;appname>          </code></td><td>Unbind service from the application</td></tr>
<tr><td><code>clone-services &lt;src-app> &lt;dest-app>             </code></td><td>Clone service bindings from &lt;src-app> application to &lt;dest-app></td></tr>

</table>

### Administration 

<table class="table table-bordered table-striped">

<tr><td><code>user                                             </code></td><td>Display user account information</td></tr>
<tr><td><code>passwd                                           </code></td><td>Change the password for the current user</td></tr>
<tr><td><code>logout                                           </code></td><td>Logs current user out of the target system</td></tr>
<tr><td><code>add-user [--email, --passwd]                     </code></td><td>Register a new user (requires admin privileges)</td></tr>
<tr><td><code>delete-user &lt;user>                           </code></td><td>Delete a user and all apps and services (requires admin privileges)</td></tr>

</table>

### System 

<table class="table table-bordered table-striped">

<tr><td><code>runtimes                                     </code></td><td>Display the supported runtimes of the target system</td></tr>
<tr><td><code>frameworks                                   </code></td><td>Display the recognized frameworks of the target system</td></tr>
<tr><td><code>infras                                   </code></td><td>Display the available infrastructures</td></tr>

</table>

### Misc 

<table class="table table-bordered table-striped">

<tr><td><code>aliases                                      </code></td><td>List aliases</td></tr>
<tr><td><code>alias &lt;alias[=]command>                   </code></td><td>Create an alias for a command</td></tr>
<tr><td><code>unalias &lt;alias>                           </code></td><td>Remove an alias</td></tr>
<tr><td><code>targets                                      </code></td><td>List known targets and associated authorization tokens</td></tr>

</table>

### Help 

<table class="table table-bordered table-striped">

<tr><td><code>help [command]                               </code></td><td>Get general help or help on a specific command</td></tr>
<tr><td><code>help options                                 </code></td><td>Get help on available options</td></tr>

</table>

# .afignore 

You can create a `.afignore` file in your app's root directory to tell `af push` and `af update` to skip files and directories, much like `.gitignore` for git. 

You can set rules in the following ways:

* Specify exact file names.
* Use wildcard patterns.
* Specify directories by appending a '/' (this will include subdirectories).

You can also reverse an ignore rule by beginning the line with a `!`.

Blank lines and lines beginning with `#` are ignored.

Here's a sample `.afignore` file:

{: .prettyprint .linenums }

    # ignore local config
    config.local

    # ignore dot files
	.*

    # ignore assets directory
	assets/

    # don't ignore assets/necessary.css
    !assets/necessary.css

    # don't ignore assets/js/ directory
	!assets/js/

# Manifests 
=======
## Manifests

You can use manifest documents with AppFog to simplify app deployment. These manifest documents describe apps in human-editable format. They can also describe anything from simple "Hello World" apps to complex multi-app hierarchies with inter-app dependencies and service binding information.  

The manifests feature uses a YAML document, aptly named `manifest.yml`. You'll typically place this manifest document in your app’s root directory, though you can specify a different location by telling the `af` tool which to use with the `-m` flag. 

You can create the manifest by hand, or let `af` automatically create it for you after an `af push` or with the `af manifest` command.

When you `af push` an app that has a manifest, `af` will simply read the input values from the file rather than prompt you for each configuration. 

Not only can you automate `af push` with manifests, you can also bypass interactive inputs for a large portion of `af`'s commands to make using the command-line tool more efficient and user-friendly. For example, you can leave the app name out when issuing an `af update` command, and `af` will retrieve the app name from an existing manifest document.

Here’s the full list of commands that can take advantage of the manifest document:

* `af push`: Allows you to specify multiple services. Pushes with information from the manifest. If no manifest is found, it will ask if you want to create one after the interaction is finished.
* `af stats`, `af update`, `af start`, `af stop`: If no app name is given, it operates on the app(s) described by the manifest.
* `af update`: Syncs changes from the root of the app if a manifest is present.
* `af start`: Starts the app in a multi-app deployment in the proper order (taking dependencies into account).
* `af stop`: Stops multi-app deployments by shutting down each app in the reverse of the order in which they were started.
* `af restart`: See `af stop` and `af start`.
* `af delete`: Delete the app

Note: For multi-app hierarchies, these will operate only on the sub-app you’re in, rather than always operating on every app in the hierarchy. To operate on every app, invoke the command from the root of the hierarchy.

### Getting Started

The easiest way to get going is to generate a manifest document from basic app info. If you haven’t pushed your app yet, you can start with `af push` as usual, which will ask if you want to save the configurations as a manifest document:

    $ af push
    Would you like to deploy from the current directory? [Yn]:
    Application Name: php-example
    Detected a PHP Application, is this correct? [Yn]:
    Application Deployed URL [php-example.aws.af.cm]:
    Memory reservation (128M, 256M, 512M, 1G, 2G) [128M]:
    How many instances? [1]:
    Bind existing services to 'php-example'? [yN]:
    Create services to bind to 'php-example'? [yN]: y
    1: mongodb
    2: mysql
    3: postgresql
    What kind of service?: 2
    Specify the name of the service [mysql-example]:
    Create another? [yN]:
    Would you like to save this configuration? [yN]: y
    Manifest written to manifest.yml.
    Creating Application: OK
    Creating Service [mysql-example]: OK
    Binding Service [mysql-example]: OK
    Uploading Application:
      Checking for available resources: OK
      Packing application: OK
      Uploading (1K): OK
    Push Status: OK
    Staging Application 'php-example': OK
    Starting Application 'php-example': OK

As you can see, just before pushing, we saved the deployment configurations in `manifest.yml` in the same directory. Let’s take a peek at the file:

    ---
    applications:
      .:
        name: php-example
        framework:
          name: php
          info:
            mem: 128M
            description: PHP Application
            exec: 
        url: ${name}.${target-base}
        mem: 128M
        instances: 1
        services:
          mysql-398b1:
            type: mysql

The manifest document has captured all of the configuration that we entered above for the app push into a description of the app deployment. Once you have a `manifest.yml` file, you can modify it however you'd like, as it’s meant to be human-editable. The structure of the document is freeform, so if you want to define arbitrary values and use them throughout your document, you can.

Now if we try pushing again, `af push` will use this to automate everything:

    $ af delete php-example
    Provisioned service [mysql-398b1] detected, would you like to delete it? [yN]: y
    Deleting application [php-example]: OK
    Deleting service [mysql-398b1]: OK

    $ af push
    Would you like to deploy from the current directory? [Yn]:
    Pushing application 'php-example'...
    Creating Application: OK
    Creating Service [mysql-398b1]: OK
    Binding Service [mysql-398b1]: OK
    Uploading Application:
      Checking for available resources: OK
      Packing application: OK
    Uploading (1K): OK
    Push Status: OK
    Staging Application 'php-example': OK
    Starting Application 'php-example': OK

You can also use `af manifest` to create a manifest without pushing. `af manifest` will let you create more complex manifests describing multiple applications in a single hierarchy.

Now that you have a manifest document, you don’t really have to do anything else if you don’t want to get fancy. It’ll passively improve `af`’s user interface experience for the commands listed above: `af push` will be interaction-free, making deployment much easier, and many other commands will be efficient to invoke.

### Child Manifests

A manifest document can inherit properties from a parent manifest like so:

    inherit: path/to/parent.yml

This slurps in everything from the parent document ensuring that properties defined in the child manifest are deep-merged with the parent. The symbols are resolved after this merge has taken place, so any properties you set in the child manifest may be used in properties set in the parent.

This allows you to provide the basic information, such as service bindings and framework information, in a "base" manifest, which can be "filled in" via a child manifest. For example:

* Having various child manifests for different deployment modes (e.g. debug, local, public) that extend base app information provided by a "base" manifest.
* Packaging the basic configuration along with your app, which users can extend with their own manifest to override your settings or fill in the blanks for their own deployment.

### Symbol Resolution

There are currently two special symbols:

* `target-base`: The base URL of your target. For example, targeting `api.appfog.com` means a `target-base` value of `appfog.com`.
* `random-word`: A random string of characters. This is useful for making sure your URLs are unique.

Otherwise, symbol resolution simulates lexical scoping, so you can define arbitrary properties, which can be overridden by child manifests or in a nested hash.

For example, the following parent:

    applications:
      ./foo:
        name: bar
        url: ${name}.${target-base}

...combined with this child manifest:

    applications:
      ./foo:
        name: baz

...and with a target of `api.appfog.com`, will result in a `url` of `baz.appfog.com` when using the child manifest, and `bar.appfog.com` when using the parent.

### Multi-App Manifests

Manifests also present a way to deploy multiple apps with a single push command. Let’s say you have a modular app comprised of several independent parts, for example, a publisher and a subscriber. You’ll want the subscriber to start before the publisher, so it doesn’t miss anything that was published. It’s best to have these two apps defined as parts of a whole, so you can specify this dependency. You can do this with multi-app manifest documents.

Our `publisher` app will publish messages every second, with the message starting at 0 and increasing for every iteration. The subscriber will simply collect the messages it receives in the order they came in, and display them to the user.

To start with, you may want to arrange your apps like so:

    ./parent-app
    ./parent-app/publisher
    ./parent-app/subscriber

This will make using the manifest document more natural.

Switch to the `parent-app` directory and use `af manifest` to create your manifest document:

    $ cd parent-app
    parent-app $ af manifest
    Configure for which application? [.]: ./publisher
    Application Name: publisher
    Detected a PHP Application, is this correct? [Yn]:
    Application Deployed URL [publisher.aws.af.cm]: publisher-${random-word}.${target-base}
    Memory reservation (128M, 256M, 512M, 1G, 2G) [128M]:
    How many instances? [1]:
    Bind existing services to 'publisher'? [yN]:
    Create services to bind to 'publisher'? [yN]: y
    1: mongodb
    2: mysql
    3: postgresql
    What kind of service?: 2
    Specify the name of the service [mysql-example]:
    Create another? [yN]:
    Configure for another application? [yN]: y
    Application path?: ./subscriber
    Application Name: subscriber
    Detected a PHP Application, is this correct? [Yn]:
    Application Deployed URL [subscriber.aws.af.cm]: subscriber-${random-word}.${target-base}
    Memory reservation (128M, 256M, 512M, 1G, 2G) [128M]:
    How many instances? [1]:
    Bind existing services to 'subscriber'? [yN]: y
    1: mysql-example
    Which one?: 1
    Bind another? [yN]:
    Create services to bind to 'subscriber'? [yN]:
    Manifest written to manifest.yml.

In this single interactive session we’ve configured a manifest that defines two PHP apps, using a single MySQL service. We’re using URLs with a bit of randomness (provided by the special random-word symbol) to ensure uniqueness.

There’s one thing missing, though. We didn’t specify any dependencies between the apps. If we were to start it now, we could lose some data if the publisher starts before the subscriber:

    parent-app $ af push
    Would you like to deploy from the current directory? [Yn]:
    Pushing application 'publisher'...
    # ...
    Starting Application 'publisher': OK
    Pushing application 'subscriber'...
    # ...
    Starting Application 'subscriber': OK

    parent-app $ curl subscriber-bf872.aws.af.cm
    Received: ["5", "6", "7", "8", "9"]

As you can see, we’ve lost some data here. In the time between the publisher starting and the subscriber starting, the subscriber has missed four messages.

We can fix this by editing the `manifest.yml` document to indicate that the publisher depends on the subscriber being started:

    ---
    applications:
    ./publisher:
    # ...
    depends-on: ./subscriber
    ./subscriber:
    # ...

Now let’s delete both apps and retry.

    parent-app $ af delete publisher
    Deleting application [publisher]: OK

    parent-app $ af delete subscriber
    Deleting application [subscriber]: OK

    parent-app $ af push
    Would you like to deploy from the current directory? [Yn]:
    Pushing application 'subscriber'...
    # ...
    Starting Application 'subscriber': OK
    Pushing application 'publisher'...
    # ...
    Starting Application 'publisher': OK

As you can see, now the subscriber starts before the publisher, so we shouldn’t have any data loss this time.

    parent-app $ curl subscriber-bf872.aws.af.cm
    Received: ["1", "2", "3", "4", "5", "6", "7"]
