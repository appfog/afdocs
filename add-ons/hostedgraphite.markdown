---
title: HostedGraphite
weight: 19
---

HostedGraphite provides [Graphite](http://graphite.wikidot.com/) as a service. You get a simple place for all your application and performance metrics. Add, query, and delete metric data and see it on a dashboard.

## Install HostedGraphite

In the "Add-ons" tab in your app console click "Install" for the HostedGraphite add-on. That’s it!


## HTTP POSTing Graphite-formatted data

When you provision the HostedGraphite add-on, AppFog creates an environment variable called `HOSTEDGRAPHITE_APIKEY`, which stores your API key. 

You can then `HTTP POST` graphite-formatted metric messages to `https://your-api-key@hostedgraphite.com/api/v1/sink`. The expected response is a `HTTP 202 ACCEPTED` with no content.

Authentication is simple HTTP Basic auth. Use your API key as the username, and the password field is optional/ignored.

## curl

    curl https://your-api-key@hostedgraphite.com/api/v1/sink --data-binary "foo 1.2"

## Python

    import urllib2, base64

    url = "https://hostedgraphite.com/api/v1/sink"
    api_key = os.getenv("HOSTEDGRAPHITE_APIKEY")

    request = urllib2.Request(url, "foo 1.2")
    request.add_header("Authorization", "Basic %s" % base64.encodestring(api_key).strip())
    result = urllib2.urlopen(request)

## Ruby

    require 'net/https'

    uri = URI.parse("https://hostedgraphite.com/api/v1/sink")
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE
    api_key = ENV['HOSTEDGRAPHITE_APIKEY']

    req = Net::HTTP::Post.new(uri.request_uri)
    req.basic_auth api_key, nil
    req.body = "foo 1.2"

    response = http.request(req)

## Graphite line format

A graphite message looks like:

    metricname value [timestamp]

Where:

* `metricname` is a period-delimited path, such as `servers.mario.memory.free`
    The periods will turn each path component into a sub-tree. The graphite project website has some [metric naming advice](http://graphite.wikidot.com/getting-your-data-into-graphite).

* `value` is an integer or floating point number.

* `timestamp` (optional) is a [UNIX timestamp](http://en.wikipedia.org/wiki/Unix_time), which is the number of seconds since Jan 1st 1970. (always UTC, never local time)
    If no timestamp is provided, the current time will be assumed. This is probably "good enough" for most uses.

You can send multiple metric messages at once by putting them on separate lines:

    bar 7 1340981282
    foo.monkey 0.34 1340981282
