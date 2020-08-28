function toggleButtonColor(btn, canvasName, ulName) {
	var el = document.getElementById(btn);
    if (!el.classList.contains('toggled')) {
        el.classList.add('toggled')
        updateCanvas(canvasName, ulName, '#51B1B5');
    }
    else {
        el.classList.remove('toggled');
        updateCanvas(canvasName, ulName, '#51B1B5');
    }
}


function updateCanvas(canvasName, ulName, color) {
	var rectangles = calculateRectangles(canvasName, ulName);
	drawAllRectangles(canvasName, color, rectangles);
	var currentTotal = getSum();
	var success = checkForUM();
	if (success == true) {
		drawTextLowerLeft('(19)25', 40, canvasName, color);
	}
	else {
		drawTextLowerLeft(currentTotal, 40, canvasName, color);
	}
}

function drawAllRectangles(canvasName, color, coordsList) {
	var canvas = document.getElementById(canvasName);
	var ctx = canvas.getContext("2d");
	ctx.fillStyle = color;
	for (var i = 0; i < coordsList.length; i ++) {
		ctx.fillRect(coordsList[i][0], coordsList[i][1], coordsList[i][2], coordsList[i][3]);
	}
}

function drawTextLowerLeft(text, factor, canvasName, color) {
	var canvas = document.getElementById(canvasName);
	var y = canvas.height - 2 * factor;
	var x = factor;
	info = [text, x, y];
	drawText(info, canvasName, color);
}

function drawText(info, canvasName, color) {
	var canvas = document.getElementById(canvasName);
	var ctx = canvas.getContext("2d");
	ctx.font = "30px Arial";
	ctx.fillStyle = color;
	ctx.fillText(info[0], info[1], info[2]);
}

function checkForUM() {
	var currentSum = getSum();
	if (currentSum === 25) {
		var img = document.createElement('img');
		img.src = '/resources/images/umCampus.JPG';
		img.id = 'campusPic'
		img.style = 'border: 2px solid #51B1B5; max-width: 500px; margin: 20px;'
		document.getElementById('placeholderForCampus').appendChild(img);
		return true;
	}
	else {
		if (elementExists('campusPic') == true) {
			removeElement('campusPic');
		}
		return false;
	}
}

function removeElement(elementId) {
	var element = document.getElementById(elementId);
	element.parentNode.removeChild(element);
}

function elementExists(elementId) {
	var test = document.getElementById(elementId);
	if (typeof(test) != 'undefined' && test != null){
		return true;
	}
	return false;
}

function getSum() {
	var lis = document.getElementsByClassName('but');
	var valToRet = 0;
	for (var i = 0; i < lis.length; i ++) {
		if (lis[i].classList.contains('toggled')) {
			valToRet += parseInt(lis[i].id);
		}
	}
	return valToRet;
}

function getOnButtons() {
	var lis = document.getElementsByClassName('but');
	var lisToRet = new Array(1);
	for (var i = 0; i < lis.length; i ++) {
		if (lis[i].classList.contains('toggled')) {
			lisToRet.push(parseInt(lis[i].id));
		}
	}
	lisToRet.shift(0);
	return lisToRet;
}

function calculateRectangles(canvasName, ulName) {
	var rectangles = new Array(1);
	// 1. Get dimensions - this is the x of top left and width of rectangle
	var dimensions = planCanvas(canvasName, ulName);
	// 2. First y coord of top left will be 0. Add 6 for every rectangle in column
	// 3. Height will be 3. 
	var buttonsTurnedOn = getOnButtons();
	for (var i = 0; i < buttonsTurnedOn.length; i++) {
		var ind = Math.log2(buttonsTurnedOn[i]);
		current_dims = dimensions[ind];
		for (var j = 0; j < buttonsTurnedOn[i]; j++) {
			// Top Left Y Coord
			top_left_y = 4 * j;
			// Top Left X Coord
			top_left_x = current_dims[0];
			// Width
			width = current_dims[1];
			// Height
			height = 2;
			// Add it
			rectangles.push([top_left_x, top_left_y, width, height]);
		}
	}
	rectangles.shift(0);
	return rectangles; 
}

function planCanvas(canvasName, ulName) {
	// Initialize max and min to boundary values
	var minWidth = window.innerWidth;
	var maxWidth = 0;
	// Get a list of all of the li elements in the proper ul
	var lis = document.getElementById(ulName).getElementsByTagName('li');
	// Initialize dimensions and gaps lists at proper lengths
	var dimensions = new Array(lis.length);
	// Access the canvas coordinates
	var canvas = document.getElementById(canvasName);
	var canvasCoords = canvas.getBoundingClientRect();
	// Iterate over the list of lis
	for (var i = 0; i < lis.length; i ++) {
		// Get the coordinates of the particular li
		var coords = lis[i].getBoundingClientRect();
		// Update min
		if (coords.left < minWidth) {
			minWidth = coords.left;
		}
		// Update max
		if (coords.right > maxWidth) {
			maxWidth = coords.right;
		}
		// Add the x length of the li to the dimensions array
		dimensions[i] = new Array(2);
		dimensions[i][0] = coords.left;
		dimensions[i][1] = (coords.right - coords.left);
	}
	// Update the canvas' width
	canvas.width = (maxWidth - minWidth);
	// Update all coordinates so they're relative to the new canvas
	var newCanvasLeft = canvas.getBoundingClientRect().left;
	for (var j = 0; j < dimensions.length; j++){
		dimensions[j][0] = dimensions[j][0] - newCanvasLeft;
	}
	// Return
	return dimensions;
}
