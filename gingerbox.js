/**
 *	JS
 *	gingerbox.js
 * 
 *	@author msavary
 *	Copyright (c) 2010-2015, User Studio (USER.IO). All rights reserved.
 * 
 */

//binds gingerBoxLink <a>'s click events with startImgOverlay method
$(document).ready(function(){
    bindGingerBoxLinks(0);
});
function bindGingerBoxLinks(id) {
    // make string for optional container id and add a click event
	$((id!=0 ? id+" " : "")+".gingerBoxLink").click(function(){
		gingerBoxLink = $(this).attr("href");
		window.startImgOverlay(gingerBoxLink);
		return false;
	});
}

function startImgOverlay(gingerBoxLink) {
    //first making sure everything is gone
    $(".gingerBoxClose, .gingerBoxContainer, .gingerBoxOverlay").remove();

    //get the body's scroll position, width, height
    //same for the image
    var bodyScrollTop = $(window).scrollTop(); //only works if body has overflow
    var viewportHeight = $(window).height();
    var viewportWidth = $(window).width();
    var docHeight = $(document).height();
    
    //add the elements to the DOM
	$("body")
		.append('<div class="gingerBoxOverlay">Loading…</div><div class="gingerBoxContainer"></div><div class="gingerBoxClose">×</div>');

    //animate the semitransparent overlay
    $(".gingerBoxOverlay")
    	.css({"top":"0px", "height":docHeight+"px"})
		.animate({"opacity":"0.6"}, 400, "linear");

    //add the gingerBox image to the DOM
    $(".gingerBoxContainer").html('<img src="'+gingerBoxLink+'">');

	// calculate the container's dimensions
	var imgWidth = $(".gingerBoxContainer img").width();
	var imgHeight = $(".gingerBoxContainer img").height();
	var containerWidth = 0;
	var containerHeight = 0;
	var addtnlMargin = 24;
	if (imgWidth > imgHeight) {
		if (imgWidth > viewportWidth - addtnlMargin) {
			containerWidth = viewportWidth - addtnlMargin;
			containerHeight = containerWidth * imgHeight/imgWidth;
		} else {
			containerWidth = imgWidth;
			containerHeight = imgHeight;
		}
		if (containerHeight > viewportHeight - addtnlMargin) {
			containerHeight = viewportHeight - addtnlMargin;
			containerWidth = containerHeight * imgWidth/imgHeight;
		}
	} else {
		if (imgHeight > viewportHeight - addtnlMargin) {
			containerHeight = viewportHeight - addtnlMargin;
			containerWidth = containerHeight * imgWidth/imgHeight;
		} else {
			containerHeight = imgHeight;
			containerWidth = imgWidth;
		}
		if (containerWidth > viewportWidth - addtnlMargin) {
			containerWidth = viewportWidth - addtnlMargin;
			containerHeight = containerWidth * imgHeight/imgWidth;
		}
	}

    //position it correctly after downloading
	$(".gingerBoxContainer img").load(function() {
	    
		$(".gingerBoxContainer")
			.css({
				"top":        	bodyScrollTop + viewportHeight/2.0 - containerHeight/2.0 + "px",
				"left":       	viewportWidth/2.0 - containerWidth/2.0 + "px",				
				"width":      	containerWidth,
				"min-height":   containerHeight,
				"max-width":  	viewportWidth,
				"max-height":  	viewportHeight
			})
			.animate({"opacity":"1"}, 400, "linear", function() {
	            $(".gingerBoxClose")
	                .css({
	                    "top":        bodyScrollTop - 30 + "px",
	                    "left":       "50%",				
	                    "opacity":    1
	                });
			})
			.find("img")
				.css({"max-width": "100%"});

        //callback to prepare for the removal of the new DOM elements
		window.removeImgOverlay(gingerBoxLink);
	});
}

// The Android Gingerbread-inspired magic happens here ;)
function removeImgOverlay(gingerBoxLink) {
	$(".gingerBoxClose, .gingerBoxOverlay, .gingerBoxContainer").click(function(){
		$(".gingerBoxOverlay .loading").remove();
		$(".gingerBoxClose").css({'opacity':0});
		$(".gingerBoxOverlay").animate({'opacity':.95}, 250, 'linear');
		var newTop = $(window).scrollTop() + $(window).height()/2;
		$(".gingerBoxContainer").css({'min-height':0}).animate({'top':newTop+'px', 'height':0}, 250, 'linear', function() {
			$(this)
				.html("")
				.css({'left':0, 'width':$(window).width(), 'height':0, 'border':'solid 1px #fff'})
				.animate({'opacity':0.2, 'width':'20%'}, 350, 'linear', function() {
					$(".gingerBoxClose, .gingerBoxContainer, .gingerBoxOverlay").fadeOut(100, function() {
						$(this).remove();
					});
				});
		});
	});
}
