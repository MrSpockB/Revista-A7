/* 
	http://labs.skinkers.com/touchSwipe/demo/image_scroll.php
*/
 
setimgwidth();
window.onorientationchange =  setimgwidth;
function setimgwidth () {
  /*window.orientation returns a value that indicates whether iPhone is in portrait mode, landscape mode with the screen turned to the
  left, or landscape mode with the screen turned to the right. */
  var orientation = window.orientation;
  IMG_WIDTH = window.innerWidth;
}
 
var speed=500;
 
$(function()
{				
	  $(".imgscroll-imgs").each(function(){
	    $(this).attr("data-current-image",0);
      var swipeOptions=
      {
      	triggerOnTouchEnd : true,	
      	swipeStatus : swipeStatus,
      	allowPageScroll:"vertical",
      	threshold:100,
      	elem: this
      }
      $(this).swipe(swipeOptions);
	});
});
				
			/**
			* Catch each phase of the swipe.
			* move : we drag the div.
			* cancel : we animate back to where we were
			* end : we animate to the next image
			*/			
			function swipeStatus(event, phase, direction, distance, elem)
			{
				//If we are moving before swipe, and we are going Lor R in X mode, or U or D in Y mode then drag.
				if( phase=="move" && (direction=="left" || direction=="right") )
				{
					var duration=0;
					if (direction == "left") {
						scrollImages((IMG_WIDTH * parseInt($(elem).attr("data-current-image")) + distance), duration, elem);
					} else if (direction == "right") {
						scrollImages((IMG_WIDTH * parseInt($(elem).attr("data-current-image")) - distance), duration, elem);
					}
				
				}
				else if ( phase == "cancel")
				{
					scrollImages(IMG_WIDTH * parseInt($(elem).attr("data-current-image")), speed, elem);
				}
				
				else if ( phase =="end" )
				{
					if (direction == "right")
						previousImage(elem)
					else if (direction == "left")			
						nextImage(elem)
				}
			}
					
			function previousImage(elem)
			{
				currentImg = Math.max(parseInt($(elem).attr("data-current-image"))-1, 0);
				$(elem).attr("data-current-image",currentImg);
				scrollImages( IMG_WIDTH * currentImg, speed, elem);
			}
		
			function nextImage(elem)
			{
				currentImg = Math.min(parseInt($(elem).attr("data-current-image"))+1, $(elem).find(".imgscroll-img").size()-1);
				$(elem).attr("data-current-image",currentImg);
				scrollImages( IMG_WIDTH * currentImg, speed, elem);
			}
				
			/**
			* Manuallt update the position of the imgs on drag
			*/
			function scrollImages(distance, duration, elem)
			{
        $(elem).css("-webkit-transition-duration", (duration/1000).toFixed(1) + "s");
        //inverse the number we set in the css
        var value = (distance<0 ? "" : "-") + Math.abs(distance).toString();
        $(elem).css("-webkit-transform", "translate3d("+value +"px,0px,0px)");
			}