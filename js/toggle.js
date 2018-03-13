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