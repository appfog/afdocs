---
title: Troubleshooting
layout: doc-page
weight: 16
---

Here are some of the most common issues and how to deal with them. 

Don't see your issue here? Try our [mailing list](https://groups.google.com/forum/#!forum/appfog-users) or [email our support desk](mailto:support@appfog.com).

* [af cli login issues](#af-cli-login)

### af cli login issues {#af-cli-login}

If you can log into the web console, but you're running into issues with the `af login` command, try this: 

{: .prettyprint}
    $ rm ~/.af_token
	$ af login
