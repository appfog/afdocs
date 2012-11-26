---
title: AF Command Line Tool
weight: 1
description: "Code deployment made easy."
---

`af` is based on CloudFoundry's `vmc` but includes features specific to AppFog and has the default target set to AppFog's service. Check out [the GitHub repo](https://github.com/appfog/af).

* [Installation](#installation)
    * [Mac OS X and Linux](#max-os-x-linux)
    * [Windows](#af-cli-install-windows)
* [Usage](#usage)
* [Getting Started](#af-cli-getting-started)
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

## Installation {#installation}

The `af` command line tool is written in Ruby and installed as a gem: 

### Mac OS X and Linux {#max-os-x-linux}

    $ gem install af

Note: `af` requires Ruby 1.8.7 or newer.

If you're on Mac OS X 10.7 Lion and you're having trouble, you may have to do the following:

1. Install Xcode 4.3 and the Xcode command line tools (use the "downloads" preference pane to download the command line tools).

2. [Install homebrew](https://github.com/mxcl/homebrew/wiki/Installation).

3. Install `libksba` with homebrew.

    $ brew install libksba

4. [Install RVM](https://rvm.io/rvm/install/).

5. Install Ruby 1.9.3:

    $ rvm install ruby-1.9.3
    $ rvm use 1.9.3

5. Install `af`

    $ gem install af
    $ af login

### Windows {#af-cli-install-windows}

Download and install [Ruby Installer for Windows](http://rubyinstaller.org/). The installer already includes RubyGems.

Be sure you use the Ruby-enabled command prompt window when you later install and use `af`. You access this command prompt from the Windows Start menu (All Programs > Ruby <version> > Start Command Prompt with Ruby).

Finally, update RubyGems from the Ruby Command Prompt:

    $ gem update --system
    $ gem install af

Login with:

    $ af login

Finally from within your source code directory:

    $ af update hello-node

## Getting Started {#af-cli-getting-started}

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

## Apps {#apps}

<table class="table table-bordered table-striped">
<tr>
    <td><code>apps</code></td>                                         <td>List deployed applications</td>
</tr>
</table>

### App Creation {#app-creation}

<table class="table table-bordered table-striped">

<tr><td><code>push [appname]</code></td>                <td>Create, push, map, and start a new application</td></tr>
<tr><td><code>push [appname] --infra </code></td>                <td>Push application to specificed infrastructure</td></tr>
<tr><td><code>push [appname] --path</code></td>                <td>Push application from specified path</td></tr>
<tr><td><code>push [appname] --url</code></td>                <td>Set the url for the application</td></tr>
<tr><td><code>push [appname] --instances &lt;N></code></td>                <td>Set the expected number <code>&lt;N></code> of instances</td></tr>
<tr><td><code>push [appname] --mem M</code></td>                <td>Set the memory reservation for the application</td></tr>
<tr><td><code>push [appname] --no-start</code></td>                <td>Do not auto-start the application</td></tr>

</table>

### App Download {#app-download}

<table class="table table-bordered table-striped">
<tr><td><code>pull &lt;appname> [path]                   </code></td><td>Download last pushed source of &lt;appname> to [path]</td></tr>
</table>

### App Operations {#app-ops}

<table class="table table-bordered table-striped">

<tr><td><code>start &lt;appname></code>                             </td><td>Start the application</td></tr>
<tr><td><code>stop  &lt;appname></code>                              </td><td>Stop the application</td></tr>
<tr><td><code>restart &lt;appname></code>                            </td><td>Restart the application</td></tr>
<tr><td><code>delete &lt;appname></code>                             </td><td>Delete the application</td></tr>

</table>

### App Updates {#app-updates}

<table class="table table-bordered table-striped">

<tr><td><code>update &lt;appname> [--path]                       </code></td><td>Update the application bits</td></tr>
<tr><td><code>mem &lt;appname> [memsize]                         </code></td><td>Update the memory reservation for an application</td></tr>
<tr><td><code>map &lt;appname> &lt;url>                          </code></td><td>Register the application to the url</td></tr>
<tr><td><code>unmap &lt;appname> &lt;url>                        </code></td><td>Unregister the application from the url</td></tr>
<tr><td><code>instances &lt;appname> &lt;num|delta>              </code></td><td>Scale the application instances up or down</td></tr>

</table>

### App Information {#app-info}

<table class="table table-bordered table-striped">

<tr><td><code>crashes &lt;appname>                            </code></td><td>List recent application crashes</td></tr>
<tr><td><code>crashlogs &lt;appname>                          </code></td><td>Display log information for crashed applications</td></tr>
<tr><td><code>logs &lt;appname> [--all]                       </code></td><td>Display log information for the application</td></tr>
<tr><td><code>files &lt;appname> [path] [--all]               </code></td><td>Display directory listing or file download for path</td></tr>
<tr><td><code>stats &lt;appname>                              </code></td><td>Display resource usage for the application</td></tr>
<tr><td><code>instances &lt;appname>                          </code></td><td>List application instances</td></tr>

</table>

### App Environment {#app-env}

<table class="table table-bordered table-striped">

<tr><td><code>env &lt;appname>                                   </code></td><td>List application environment variables</td></tr>
<tr><td><code>env-add &lt;appname> &lt;variable[=]value>         </code></td><td>Add an environment variable to an application</td></tr>
<tr><td><code>env-del &lt;appname> &lt;variable>                 </code></td><td>Delete an environment variable to an application</td></tr>

</table>

### Services {#services}

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

### Administration {#admin}

<table class="table table-bordered table-striped">

<tr><td><code>user                                             </code></td><td>Display user account information</td></tr>
<tr><td><code>passwd                                           </code></td><td>Change the password for the current user</td></tr>
<tr><td><code>logout                                           </code></td><td>Logs current user out of the target system</td></tr>
<tr><td><code>add-user [--email, --passwd]                     </code></td><td>Register a new user (requires admin privileges)</td></tr>
<tr><td><code>delete-user &lt;user>                           </code></td><td>Delete a user and all apps and services (requires admin privileges)</td></tr>

</table>

### System {#system}

<table class="table table-bordered table-striped">

<tr><td><code>runtimes                                     </code></td><td>Display the supported runtimes of the target system</td></tr>
<tr><td><code>frameworks                                   </code></td><td>Display the recognized frameworks of the target system</td></tr>
<tr><td><code>infras                                   </code></td><td>Display the available infrastructures</td></tr>

</table>

### Misc {#misc}

<table class="table table-bordered table-striped">

<tr><td><code>aliases                                      </code></td><td>List aliases</td></tr>
<tr><td><code>alias &lt;alias[=]command>                   </code></td><td>Create an alias for a command</td></tr>
<tr><td><code>unalias &lt;alias>                           </code></td><td>Remove an alias</td></tr>
<tr><td><code>targets                                      </code></td><td>List known targets and associated authorization tokens</td></tr>

</table>

### Help {#help}

<table class="table table-bordered table-striped">

<tr><td><code>help [command]                               </code></td><td>Get general help or help on a specific command</td></tr>
<tr><td><code>help options                                 </code></td><td>Get help on available options</td></tr>

</table>

## .afignore {#afignore}

You can create a `.afignore` file in your app's root directory to tell `af push` and `af update` to skip files and directories, much like `.gitignore` for git. 

You can set rules in the following ways:

* Specify exact file names.
* Use wildcard patterns.
* Specify directories by appending a '/' (this will include subdirectories).

You can also reverse an ignore rule by beginning the line with a `!`.

Blank lines and lines beginning with `#` are ignored.

Here's a sample `.afignore` file:

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
