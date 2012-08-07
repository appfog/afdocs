---
layout: doc-page
title: PostgreSQL
weight: 1
---

AppFog provides a PosgreSQL service that's accessible to apps that are running on any of the supported runtimes and frameworks. 

* [PHP](#php)

# PHP {#php}

Connecting your PHP app to a bound PostgreSQL service is simple:

{: .prettyprint .linenums}
    $services_json = json_decode(getenv("VCAP_SERVICES"),true);
    $postgresql_config = $services_json["postgresql-9.1"][0]["credentials"];

    $username = $postgresql_config["username"];
    $password = $postgresql_config["password"];
    $hostname = $postgresql_config["hostname"];
    $port = $postgresql_config["port"];
    $db = $postgresql_config["name"];

    $link = pg_connect("host=$hostname port=$port dbname=$db user=$username password=$password");
