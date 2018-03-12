
$("document").ready(function() {

	$('#div-barrows').append(createDiv('ahrims'));
	$('#ahrims').prepend(createToggleImage("ahrims-hood", "images/barrows/Ahrim/Ahrim\'s_hood.png"));
	$('#ahrims').prepend(createToggleImage("ahrims-skirt", "images/barrows/Ahrim/Ahrim\'s_robeskirt.png"));
	$('#ahrims').prepend(createToggleImage("ahrims-top", "images/barrows/Ahrim/Ahrim\'s_robetop.png"));
	$('#ahrims').prepend(createToggleImage("ahrims-staff", "images/barrows/Ahrim/Ahrim\'s_staff.png"));
	

	$.getJSON( "metadata.json", function( itemdata ) {

		var sections = Object.keys(itemdata);
		console.log("We have " + sections.length + " sections to create.")

		createSection(itemdata.barrows, "div-barrows")
		createSection(itemdata.books, "div-books")
		createSection(itemdata.capes, "div-capes")

		apply_toggle();

	});

});

function createSection(data, divID) {
	
	$('#main-content').append(createDiv(divID));

	for (var i = data.length - 1; i >= 0; i--) {

		var subgroup = data[i].items;

		console.log("This group is " + divID + " and the subgroup is " + data[i].group_id)
		$('#' + divID).append(createDiv(data[i].group_id));


		for (var j = subgroup.length - 1; j >= 0; j--) {
			$('#' + data[i].group_id).prepend(createToggleImage(subgroup[j].id, subgroup[j].img_path));
		}

	}

}

function createToggleImage(id_name, path) {
	
	var image = document.createElement("img");
	image.setAttribute('class', 'toggle');
	image.setAttribute('id', id_name);
	image.src = path;

	return image;
}

function createDiv(id_name) {
	var div = document.createElement("div");
	div.setAttribute('id', id_name);
	return div;
}

function apply_toggle() {
	$( ".toggle" ).click(function() {
		var opacity = $( this ).css( "opacity" );
		if (opacity === "1") {
			$(this).css('opacity', '0.4');
		} else {
			$(this).css('opacity', '1');
		}
		console.log("Toggled!")
	});
}