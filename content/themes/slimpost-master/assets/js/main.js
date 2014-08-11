$(document).ready(function() {
	$('.post-excerpt').fitVids();

	$('.post-excerpt > p > img').each(function() {
		var imageSrc = $(this).attr('src');
		$(this).wrap('<a href="' + imageSrc + '" rel="darkbox"></a>');
	});

	$('a[rel=darkbox]').darkbox();
});