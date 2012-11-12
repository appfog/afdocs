---
title: Java
weight: 4
---

* [Supported Java Versions](#javaversions)
* [Deploying Java Apps](#deploy)
* [Custom JVM Parameters](#custom-jvm-params)

### Supported Java Versions {#javaversions}

For a list of runtimes that AppFog supports run:

{: .prettyprint}
    $ af runtimes

    +--------------+-----------------+-----------+
    | Name         | Description     | Version   |
    +--------------+-----------------+-----------+
    | java         | Java 7          | 1.7.0     |

# Deploying Java Apps {#deploy}

You can deploy most Java apps by simply generating a `WAR` file, then running `af push` from the target directory.  

# Custom JVM Parameters {#custom-jvm-params}

You can add custom JVM parameters like `-Duser.timezone` by specifiying `JAVA_OPTS` as an environment variable:

    $ af env-add <app-name> JAVAOPTS=<value>

You can also include the `$HOME` variable to point to the Tomcat's `lib` directory.
