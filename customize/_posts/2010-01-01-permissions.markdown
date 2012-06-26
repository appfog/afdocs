---
title: Permissions
layout: doc-page
weight: 7
description: "How to add writable permissions."
---

By default, all PHP Fog apps have only read access to files and directories. To add write permissions to a file or directory:

1. Go to your PHP Fog app console. 

2. Click on the "Permissions" tab on the left. 

3. Enter the path to the file or directory.

4. Hit "Save Changes".

<img class="screenshot" src="/img/screenshots/permissions.png" alt="Permissions"/>

Note: Git doesn't create empty folders, so setting permissions on an empty folder might not work. If you run into this problem, simply add a dummy file into the directory you want to create. 
