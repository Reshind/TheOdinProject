var gridCount = 80;
var maxSize = 100;
var minSize = 1;
var panelType = "regular";

$(document).ready(function() {
	// Draw a default sketchpad so there's something to work with when
	// the page initially loads.
	drawPanels(gridCount);
	draw();
	$('#gridSize').text("Current grid size is: " + gridCount + "x" + gridCount);

	// Allow user to generate a new grid with their own dimensions
	$('#newPad').on('click', function() {
		clearSketchPad();
		panelType = "regular";
		drawPanels(gridCount);
		draw();
	});

	$('#defaultPad').on('click', function() {
		gridCount = 64;
		clearSketchPad();
		panelType = "regular";
		drawPanels(gridCount);
		draw();
		$('#gridSize').text("Current grid size is: 64x64");
	});

	$('#randomPad').click(function() {
		panelType = "random";
		clearSketchPad();
		drawPanels(gridCount);
		draw();
	});

	$('#trailPad').click(function() {
		clearSketchPad();
		panelType = "trail";
		drawPanels(gridCount);
		draw();
	});

	$('#changeSize').click(function() {
		promptUser();
		clearSketchPad();
		drawPanels(gridCount);
		draw();
		$('#gridSize').text("Current grid size is: " + gridCount + "x" + gridCount);
	});
});

// Draw the individual panels into the sketchpad div
function drawPanels(num) {
	var rowCount = 0;
	var wrapperWidth = $('#wrapper').css('width');
	var panelSize = Math.floor(800/gridCount) + 'px';
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
	if ( panelType === "regular") {
		$('.gridPanel').on('mouseenter', function() {
			$(this).addClass('drawnOn');
		});
	}
	else if ( panelType === "random") {
		$('.gridPanel').on('mouseenter', function() {
			var currentColor = $(this).css("background-color");
			var newColor = getRandomColor();

			if ( currentColor === "transparent") {
				$(this).css("background-color", getRandomColor());
			}
		});
	}
	else
	{
		$('.gridPanel').on('mouseenter', function() {
			$(this).addClass("drawnOn");
			$(this).fadeTo(0, 1);
		});

		$('.gridPanel').on("mouseleave", function() {
			// $(this).css("background-color", "transparent");
			$(this).fadeTo(400, 0);
		});
	}
}

function clearSketchPad() {
	$('#sketchpad').empty();
}

// Generate a random RGB Color for the background
function getRandomColor() {
	var val1 = Math.floor(Math.random() * 255);
	var val2 = Math.floor(Math.random() * 255);
	var val3 = Math.floor(Math.random() * 255);
	var color = "RGB(" + val1 + "," + val2 + "," + val3 + ")";
	return color;
}

function promptUser() {
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
}