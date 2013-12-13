---
title: .afignore
weight: 3
---

## Ignoring or Skipping Specific Files

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
