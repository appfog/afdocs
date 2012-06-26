$(function() {

	$('a.accordion-toggle').bind('click',function() {
		if ( $(this).find('i.accordion-icon').hasClass('icon-chevron-right') ) {
			$('.accordion-icon').removeClass('icon-chevron-down');
			$('.accordion-icon').addClass('icon-chevron-right');
			$(this).find('i').toggleClass('icon-chevron-down icon-chevron-right');
		} else {
			$(this).find('i').toggleClass('icon-chevron-down icon-chevron-right');
		}
	});

});
