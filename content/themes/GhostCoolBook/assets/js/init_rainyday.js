/**
 * Main JS file for RAIN behaviours
 */

(function ($) {

	"use strict";

	var engineRainyDay;

	$(window).resize(function(){

		var win_height = $(window).outerHeight();
		if( ( $('.jqres').width() <= 900 ) ){
			win_height = win_height + 80;
		}
		var win_width = $(window).outerWidth();

		var img_height = $('#site-bg-image').outerHeight();
		var img_width = $('#site-bg-image').outerWidth();

		var fraction_height = win_height / img_height;
		var fraction_width = win_width / img_width;

		var fraction_result = ( fraction_height > fraction_width ) ? fraction_height : fraction_width;

		$('canvas').css('height', Math.ceil( fraction_result * img_height ) + 'px' );
		$('canvas').css('width', Math.ceil( fraction_result * img_width ) + 'px' );

		$('canvas').css('top', Math.floor( (win_height - fraction_result * img_height) / 2 ) + 'px' );
		$('canvas').css('left', Math.floor( (win_width - fraction_result * img_width) / 2 ) + 'px' );
	});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Initialization
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// RAIN background

	function init_RainyDay() {
		var image = document.getElementById('site-bg-image');

		engineRainyDay = new RainyDay('canvas', 'site-bg-image', $('#site-bg-image').outerWidth(), ($('#site-bg-image').outerHeight()/* - $('.footer').outerHeight()*/), 1, 20);

		var preset = 3;
		if (preset == 1) {
			engineRainyDay.gravity = engineRainyDay.GRAVITY_NON_LINEAR;
			engineRainyDay.trail = engineRainyDay.TRAIL_DROPS;
			engineRainyDay.rain([ engineRainyDay.preset(3, 3, 0.88), engineRainyDay.preset(5, 5, 0.9), engineRainyDay.preset(6, 2, 1) ], 100);
		} else if (preset == 2) {
			engineRainyDay.gravity = engineRainyDay.GRAVITY_NON_LINEAR;
			engineRainyDay.trail = engineRainyDay.TRAIL_SMUDGE;
			engineRainyDay.VARIABLE_GRAVITY_ANGLE = Math.PI / 2;
			engineRainyDay.rain([ engineRainyDay.preset(4, 4, 0.5), engineRainyDay.preset(4, 4, 1) ], 50);
		} else if (preset == 3) {
			engineRainyDay.gravity = engineRainyDay.GRAVITY_NON_LINEAR;
			engineRainyDay.trail = engineRainyDay.TRAIL_SMUDGE;
			engineRainyDay.rain([ engineRainyDay.preset(0, 2, 0.5), engineRainyDay.preset(4, 4, 1) ], 50);
		}

		image.crossOrigin = 'anonymous';
		image.src = $('#site-bg-image').attr('src');
	}

	$(window).load(function(){
		init_RainyDay();
	});

	// Pagination replace text with icons
	$('.newer-posts').empty().addClass('fa fa-angle-left');
	$('.older-posts').empty().addClass('fa fa-angle-right');

}(jQuery));