var gridCount = 64;
var maxSize = 96;
var minSize = 1;

$(document).ready(function() {
	// Draw a default sketchpad so there's something to work with when
	// the page initially loads.
	drawPanels(gridCount);
	draw();

	// Allow user to generate a new grid with their own dimensions
	$('#newPad').on('click', function() {
		gridCount = Math.floor(prompt("How many squares?"));

		// Warn users if they enter an invalid size and revert to nearest
		// acceptable size.
		if ( gridCount > 96 ) {
			alert("ERROR: Grid cannot be larger than " + maxSize + " squares!  Reverting to max size.");
			gridCount = maxSize;
		}
		else if ( gridCount < 1 ) {
			alert("ERROR: Grid cannot be smaller than " + minSize + " square(s)!  Reverting to min size.");
			gridCount = minSize;
		}

		clearSketchPad();
		drawPanels(gridCount);
		draw();
	})

	$('#defaultPad').on('click', function() {
		gridCount = 64;
		clearSketchPad();
		drawPanels(gridCount);
		draw();
	});

});

// Draw the individual panels into the sketchpad div
function drawPanels(num) {
	var rowCount = 0;
	var wrapperWidth = $('#wrapper').css('width');
	var panelSize = Math.floor(960/gridCount) + 'px';
	var panels = $('#sketchpad');

	do {
		for ( var i = 0; i < num; i++ ) {
			panels.append('<div class="gridPanel"></div>');
		};
		rowCount++;
	} while (rowCount < num );
	$('.gridPanel').css({"width": panelSize, "height":panelSize});
}

// Change the background color of the panels on mouseover to show
// that the panel has been "drawn" on
function draw() {
	$('.gridPanel').on('mouseenter', function() {
		$(this).addClass('drawnOn');
	});
}

function clearSketchPad() {
	$('#sketchpad').empty();
}