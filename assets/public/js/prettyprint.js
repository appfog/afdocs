var cliRegex = /^\$\s/;
var multipleLineRegex = /[\s\S]+\n[\s\S]+\n[\s\S]+/;
$(document).ready(function() {
    $('pre > code').filter(function(){ 
        return (!cliRegex.test(this.innerHTML) && multipleLineRegex.test(this.innerHTML));
    }).parent().addClass('linenums');
    $('pre > code').parent().addClass('prettyprint');
});
