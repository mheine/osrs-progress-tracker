var globalToggle = 0;

$(window).on("load", function() {
	//setImagePaddings();

	$("#loading-screen").css("display", "none");
});


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
		createSection(itemdata.drops, "div-drops");
		createSection(itemdata.jewellry, "div-jewellry");
		createSection(itemdata.diaries, "div-diaries");
		createSection(itemdata.gwd, "div-gwd");
		createSection(itemdata.heads, "div-heads");
		createSection(itemdata.jars, "div-jars");
		createSection(itemdata.mta, "div-mta");
		createSection(itemdata.pets, "div-pets");
		createSection(itemdata.pvm, "div-pvm");
		createSection(itemdata.raids, "div-raids");
		createSection(itemdata.scrolls, "div-scrolls");
		createSection(itemdata.skilling, "div-skilling");

		createHiddenDiaryImages(itemdata.diaries);

		createDividers();

		$( "#export-image-button" ).click(exportImage);

		$( "#toggle-all-button" ).click(toggleAll);
		apply_toggle();
	});


});

function createHiddenDiaryImages(data) {
	for (var i = 0; i <= data.length - 1; i++) {

		var subgroup = data[i].items;

		for (var j = subgroup.length - 1; j >= 0; j--) {

			for (var k = 1; k <= 4; k++) {
				var image = $('<img />');
				var path = subgroup[j].img_path.replace("1", k);
				image.addClass("default-hidden");
				image.attr('id', subgroup[j].id + "_" + k);
				image.attr('src', path);
				$('#main-content').append(image);

			}

		}



	}
}

function exportImage() {
	html2canvas(document.querySelector("#main-content")).then(canvas => {
		console.log("Attempting to export image");
		ReImg.fromCanvas(canvas).downloadPng()
	});
}

function createDividers() {
	$("#div-outfits").append('<hr />');
	$("#div-capes").prepend('<hr />');
	$("#div-clues").prepend('<hr />');
	$("#div-clues").append('<hr />');
	$("#div-gwd").prepend('<hr />');
	$("#div-pvm").prepend('<hr />');
	$("#div-pvm").append('<hr />');

}

function createSection(data, divID) {

	$('#main-content').append(createDiv(divID));

	for (var i = 0; i <= data.length - 1; i++) {

		var subgroup = data[i].items;

		$('#' + divID).append(createDiv(data[i].group_id));

		for (var j = subgroup.length - 1; j >= 0; j--) {
			$('#' + data[i].group_id).prepend(createToggleImage(subgroup[j].id, subgroup[j].img_path));
		}

	}

}

function createToggleImage(id_name, path) {

	var image = $('<img />');
	var mouseover = capitalize(id_name.replace(/_/g, " "));
	image.addClass("toggle small-icon noselect");
	image.attr('id', id_name);
	image.attr('title', mouseover);
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

		var wPad = ((40 - w) / 2) + "px"
		var hPad = ((40 - h) / 2) + "px";

		//$(this).css('paddingLeft', wPad);
		//$(this).css('paddingRight', wPad);
		//$(this).css('paddingTop', hPad);
		//$(this).css('paddingBottom', hPad);

		//$(this).css('padding', newPadding);
	});
}

function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}


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