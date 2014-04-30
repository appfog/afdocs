$(function() {
    $('#docs_menu').collapsible({
        effect: "slide",
        initialCollapse: true
    });
});

$(function() {
	$('a.menu-parent').bind('click',function() {
        $(this).find('i').toggleClass('icon-chevron-down icon-chevron-right');
	});
});

function params(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++){
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

$(document).ready(function() {
    $('li.active').parents('li').prev().find('a.menu-parent').trigger('click');
});
