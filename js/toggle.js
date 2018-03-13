/* Toggle-based functions and helpers */

var globalToggle = 0;

var addEvent = function(object, type, callback) {
	if (object == null || typeof(object) == 'undefined') return;
	if (object.addEventListener) {
		object.addEventListener(type, callback, false);
	} else if (object.attachEvent) {
		object.attachEvent("on" + type, callback);
	} else {
		object["on"+type] = callback;
	}
};

function toggleAll() {

	if (globalToggle === 0) {
		$(".toggle").css('opacity', '1');
		globalToggle++;
	} else {
		$(".toggle").css('opacity', '0.4');
		globalToggle--;
	}


}

function apply_toggle() {
	$( ".toggle" ).click(function() {

		if( $(this).parent().attr("id") == "diaries") {
			var path = $(this).attr("src");

			var number = parseInt(path.slice(-5).charAt(0));

			if($(this).css('opacity') != 1) {
				$(this).css('opacity', '1');
			}

			else if(number === 1) {
				$(this).attr("src", path.replace("1.png", "2.png"));
				$(this).css('opacity', '1');
			}
			else if(number === 2) {
				$(this).attr("src", path.replace("2.png", "3.png"));
				$(this).css('opacity', '1');
			}
			else if(number === 3) {
				$(this).attr("src", path.replace("3.png", "4.png"));
				$(this).css('opacity', '1');
			}
			else if(number === 4) {
				$(this).attr("src", path.replace("4.png", "1.png"));
				$(this).css('opacity', '0.4');			
			}

			var src = $(this).attr("src");
			var preloadedID = src.substring(15, src.length - 4);

			var loadedImg = $("#" + preloadedID);

			var w = parseInt($(loadedImg).css("width"));
			var h = parseInt($(loadedImg).css("height"));

			var newPadding =  ((40 - h) / 2) + "px " + ((40 - w) / 2) + "px";
			$(this).css('padding', newPadding);

		}

		else {
			var opacity = $( this ).css( "opacity" );
			if (opacity === "1") {
				$(this).css('opacity', '0.4');
			} else {
				$(this).css('opacity', '1');
			}
		}
	});
}