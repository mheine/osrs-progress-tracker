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

		// Diaries have 4 tiers, and we want to loop through them all
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
		//The BH hats have two tiers, and we want to loop through both
		else if( $(this).parent().attr("id") == "bh_skill") {
			var path = $(this).attr("src");

			if($(this).css('opacity') != 1) {
				$(this).css('opacity', '1');
				$(this).css('padding', '6px 5px');
			}

			else if(path.includes("revenge")) {
				$(this).css('padding', '7px 6px 6px 5px');
				$(this).attr("src", "images/bh_skill/Hunter's_honour.png");
				$(this).css('opacity', '1');
			}
			else {
				$(this).attr("src", "images/bh_skill/Rogue's_revenge.png");
				$(this).css('opacity', '0.4');
				$(this).css('padding', '6px 5px');
			}
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
