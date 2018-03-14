/* To have some resemblancce of Persistent content, we use localStorage to save data. */

var dataArray = [];

function storageAvailable(type) {
	try {
		var storage = window[type],
		x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	}
	catch(e) {
		return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}

function saveState() {
	if (storageAvailable('localStorage')) {

		var counter = 0;

		dataArray = []
		$( ".toggle" ).each(function() {

			if($(this).css('opacity') == 1) {
				dataArray.push(1);
				counter++;
			} else {
				dataArray.push(0);
			}
		});

		localStorage.setItem('toggled', JSON.stringify(dataArray));

		$("#save-text").fadeOut(200, function() {
        	$(this).text('Data was saved!').fadeIn(200);
    	});

		setTimeout(function(){
			$("#save-text").fadeOut(200, function() {
        	$(this).text('Save data').fadeIn(200);
    	});
		}, 2000);

		console.log(dataArray.length + " item states saved. " + counter + " items were toggled.")
	}
}

function applyState() {
	if (storageAvailable('localStorage')) {

		var i = 0;
		dataArray = JSON.parse( localStorage.getItem('toggled'));

		if (dataArray == null) {
			console.log("No saved state exists.")
			return
		}

		if(dataArray.length != $( ".toggle" ).length) {
			console.log("ERROR: Could not apply data because of a length mismatch. Exiting.")
			console.log("DataArray has " + dataArray.length + " items while toggle.length has " + $( ".toggle" ).length )
			return
		}

		$( ".toggle" ).each(function() {

			if(dataArray[i] == 1) {
				$(this).css('opacity', 1)
			} else {
				$(this).css('opacity', 0.4);
			}
			i++;
		});
	}
}
