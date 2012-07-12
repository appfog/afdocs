This is the repo for the AppFog Documentation site at http://docs.appfog.com.

### [Jekyll](https://github.com/mojombo/jekyll)

The site is generated in [Jekyll](https://github.com/mojombo/jekyll), so [install that](https://github.com/mojombo/jekyll/wiki/install) first.

Then clone this repo.

Jekyll is a static site generator. It converts the markdown files into a static site under the "\_site" directory.

The live site is hosted on GitHub Pages, which simply pulls from this repo's "gh-pages" branch.

The markdown file structure is pretty straightforward and self-explanatory. You can make your changes, then generate the site by using the following in the repo's root:

    $ jekyll 

When you're done, add, commit, and push your changes. 

### Testing

To test the generated site in the browser, you can use jekyll's default local server:

    $ jekyll --server --auto

Go to `0.0.0.0:4000` in your browser to see a live version. 

You'll have to append `.html` to links generated, though, since the default version of Webrick doesn't do redirects. 

If you have node installed, you can use the included `app.js`. First, install `node connect`:

    $ npm install connect

Then:

    $ node app.js

Go to `0.0.0.0:3000` in your browser to see a live version. 

### AF Docs Style Guide

* Capitalization in Titles Like This
* command line formatting: "$ af login"
* SSH key
* AppFog user console: "app console"
* local terminal: "terminal"
* WordPress
* "log in" and "set up" are verbs
* "login" and "setup" are nouns
* "Add-ons" or "add-ons", not "Add-Ons" or "Addons"

### Contributing

Clone this repo, commit some changes, then make a pull request.

### Attribution

These docs are adapted from [Cloud Foundry's Documentation](http://docs.cloudfoundry.com).

### License

This work is licensed under a [Creative Commons Attribution-ShareAlike 3.0 License](http://creativecommons.org/licenses/by-sa/3.0/).
