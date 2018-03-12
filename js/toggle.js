/* Main JS file*/

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

$("document").ready(function() {
	//apply_toggle();
});

function apply_toggle() {
	$( ".toggle" ).click(function() {
		var opacity = $( this ).css( "opacity" );
		if (opacity === "1") {
			$(this).css('opacity', '0.4');
		} else {
			$(this).css('opacity', '1');
		}
		console.log("Toggled from toggle.")
	});
}