
$("document").ready(function() {
	
	$.getJSON( "metadata.json", function( itemdata ) {

		var sections = Object.keys(itemdata);
		console.log("We have " + sections.length + " sections to create.")

		createSection(itemdata.outfits, "div-outfits");
		createSection(itemdata.barrows, "div-barrows");
		createSection(itemdata.books, "div-books");
		createSection(itemdata.capes, "div-capes");
		createSection(itemdata.clues, "div-clues");
		createSection(itemdata.dragon, "div-dragon");
		createSection(itemdata.collections, "div-collections");
		createSection(itemdata.diaries, "div-diaries");
		createSection(itemdata.drops, "div-drops");
		createSection(itemdata.gwd, "div-gwd");
		createSection(itemdata.heads, "div-heads");
		createSection(itemdata.jars, "div-jars");
		createSection(itemdata.jewellry, "div-jewellry");
		createSection(itemdata.mta, "div-mta");
		createSection(itemdata.pets, "div-pets");
		createSection(itemdata.pvm, "div-pvm");
		createSection(itemdata.raids, "div-raids");
		createSection(itemdata.scrolls, "div-scrolls");
		createSection(itemdata.skilling, "div-skilling");


		apply_toggle();

		setImagePaddings();
	});


});

function createSection(data, divID) {
	
	$('#main-content').append(createDiv(divID));

	for (var i = 0; i <= data.length - 1; i++) {

		var subgroup = data[i].items;

		console.log("This group is " + divID + " and the subgroup is " + data[i].group_id)
		$('#' + divID).append(createDiv(data[i].group_id));


		for (var j = subgroup.length - 1; j >= 0; j--) {
			$('#' + data[i].group_id).prepend(createToggleImage(subgroup[j].id, subgroup[j].img_path));
		}

	}

}

function createToggleImage(id_name, path) {
	
	var image = $('<img />');
	image.addClass("toggle small-icon");
	image.attr('id', id_name);
	image.attr('src', path);

	return image;
}

function createDiv(id_name) {
	var div = document.createElement("div");
	div.setAttribute('id', id_name);
	return div;
}

function setImagePaddings() {

	$( ".small-icon" ).each(function() {

		var w = parseInt($(this).css("width"));
		var h = parseInt($(this).css("height"));

		var newPadding =  ((40 - h) / 2) + "px " + ((40 - w) / 2) + "px";

		console.log("new padding is: " + newPadding)

		$(this).css('padding', newPadding);
	});
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