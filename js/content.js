$(function() {
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

		createTextBoxes();

		apply_toggle();

		console.log("JSON data has been read and applied to DOM.")

	});

	$( "#export-image-button" ).click(exportImage);
	$( "#toggle-all-button" ).click(toggleAll);
	$( "#save-data-button" ).click(saveState);

});

$(window).on("load", function() {
	setMainContentBounds();
	applyState();
	setTimeout(function(){
		setImagePaddings();
		$("#loading-screen").css("display", "none");
	}, 1000);

});

$( window ).resize(function() {
	setMainContentBounds();
});

$(window).on('zoom', function() {
	console.log('zoom', window.devicePixelRatio);
	setMainContentBounds();
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
				$('#pre-load-images').append(image);
			}
		}
	}
}

function exportImage() {
	$('#download-div').empty();
	html2canvas(document.querySelector("#main-content"), {width: 1080, height: 1400}).then(canvas => {
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

	$('<input/>').attr({ type: 'text', placeholder: '13', class: 'clue-input', id: 'input-easy', name: '45'}).appendTo('#milestones');
	$('<input/>').attr({ type: 'text', placeholder: '76', class: 'clue-input', id: 'input-medium', name: '35'}).appendTo('#milestones');
	$('<input/>').attr({ type: 'text', placeholder: '178', class: 'clue-input', id: 'input-hard', name: '11'}).appendTo('#milestones');
	$('<input/>').attr({ type: 'text', placeholder: '89', class: 'clue-input', id: 'input-elite', name: '89'}).appendTo('#milestones');
	$('<input/>').attr({ type: 'text', placeholder: '10', class: 'clue-input', id: 'input-master', name: '12'}).appendTo('#milestones');

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

function setMainContentBounds() {

	var div = $("#main-content");
	var w = Math.max(window.innerWidth, document.documentElement.clientWidth);
	var divW = parseInt($(div).css("width"));
	var newMargin = ((w - divW) / 2);

	console.log("DEBUG: Applying content bounds.")

	$(div).css('marginLeft', newMargin);
	$(div).css('marginRight', newMargin);

	$(div).css('paddingTop', "40px");
	$(div).css('paddingLeft', "80px");
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

