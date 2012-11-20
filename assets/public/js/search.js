$(document).ready(function() {
    if(params()['q']){
        var query = params()['q'];
        $('div#search_results p#loading').show();
        var index = 0;

        var result = $.getJSON(searchifyPublicURL + '/search?q=' + encodeURIComponent(query) + '&fetch=title,path&snippet=text&callback=?', function(data) {
            $('div#search-results div#inner').empty();

            $.each(data.results, function(index, result) {
                $('div#search-results div#inner').append('<div class="search-result"><a href="/' + result.path + '"><h3>' + result.title + '</h3><pre><p>' + result.snippet_text + '</p></pre></a></div>');
                index++;
            });

            if(data.results.length == 0){
                $('div#search_results div#inner').append('<p>Sorry, no results for that query.</p>');
            }

            $('div#search_results p#loading').hide();
        });
    }
});
