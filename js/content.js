$(function() {
	$.getJSON( "metadata.json", function( itemdata ) {

		var sections = Object.keys(itemdata);

		createSection(itemdata.outfits, "div-outfits");
		createSection(itemdata.barrows, "div-barrows");
		createSection(itemdata.books, "div-books");
		createSection(itemdata.capes, "div-capes");
		createSection(itemdata.clues, "div-clues");
		createSection(itemdata.dragon, "div-dragon");
		createSection(itemdata.bh_skill, "div-bh");
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

		createTextBoxes();

		apply_toggle();

		applyState();

		console.log("JSON data has been read and applied to DOM.");

		$('#main-content').imagesLoaded()
		.done( function( instance ) {
			console.log('All images successfully loaded. Setting paddings.');
			setImagePaddings();
			$("#loading-screen").css("display", "none");
		})
		.fail( function() {
			console.log('One or more images could not be loaded.');
		});

	});

	$( "#export-image-button" ).click(exportImage);
	$( "#toggle-all-button" ).click(toggleAll);
	$( "#save-data-button" ).click(saveState);

});

$(window).on('beforeunload', saveState);


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
				$('#pre-load-images').append(image);
			}
		}
	}
}

function exportImage() {
	$('#download-div').empty();
	html2canvas(document.querySelector("#main-content")).then(canvas => {
		console.log("Attempting to export image");
		
		var data = canvas.toDataURL("image/png");
		var image = $('<img />');
		image.attr('id', "rendered-image");
		image.attr('src', data);
		image.attr('download', 'osrs-progress.png');
		image.css('width', "100%");
		image.css('height', "100%");
		$('#download-div').append(image);
	});
}

function createDividers() {

	var line = '<hr />';
	$(line).attr("id", "normal-hr")
	var gwdLine = '<hr />';
	$(gwdLine).attr("id", "gwd-hr")

	$("#div-outfits").append(line);
	$("#div-capes").prepend(line);
	$("#div-clues").prepend(line);
	$("#div-clues").append(line);
	$("#div-pvm").prepend(line);
	$("#div-pvm").append(line);

	$('#div-gwd').prepend(gwdLine);
}

function createTextBoxes() {

	$('<input/>').attr({ type: 'text', title: 'Number of easy clues', placeholder: '13', class: 'clue-input', id: 'input-easy', name: '45'}).appendTo('#milestones');
	$('<input/>').attr({ type: 'text', title: 'Number of medium clues', placeholder: '76', class: 'clue-input', id: 'input-medium', name: '35'}).appendTo('#milestones');
	$('<input/>').attr({ type: 'text', title: 'Number of hard clues', placeholder: '178', class: 'clue-input', id: 'input-hard', name: '11'}).appendTo('#milestones');
	$('<input/>').attr({ type: 'text', title: 'Number of elite clues', placeholder: '89', class: 'clue-input', id: 'input-elite', name: '89'}).appendTo('#milestones');
	$('<input/>').attr({ type: 'text', title: 'Number of master clues', placeholder: '10', class: 'clue-input', id: 'input-master', name: '12'}).appendTo('#milestones');

	$(".clue-input").on("change paste keyup", function() {
		$(this).css("background-color", "transparent")
	});
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

function createDiv(id_name) {
	var div = document.createElement("div");
	div.setAttribute('id', id_name);
	return div;
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

function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}


function setImagePaddings() {

	$( ".toggle" ).each(function() {

		var w = parseInt($(this).width());
		var h = parseInt($(this).height());

		var newPadding =  Math.floor(((40 - h) / 2)) + "px " + Math.floor(((40 - w) / 2)) + "px";

		$(this).css('padding', newPadding);
	});
}
