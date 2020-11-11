async function autorun() {
	window.stopAutorun = false;
	for (var i = 0; i < (2 * window.algoLength + 2); i++) {
		nextAlgoStep();
		if (window.stopAutorun == true) {
			return;
		}
		await sleep(window.speed);
	}
}

function pauseAutorun() {
	window.stopAutorun = true;
}

function changeSpeed(newSpeed) {
	window.speed = newSpeed;
}

function changeAlgoLength(newLength) {
	if (window.speed == undefined) {
		window.speed = 800; 
	}
	window.algoLength = newLength;
	restartAlgo(newLength);
}

function restartAlgo() {
	// Update pseudocode
	var firstStep = document.getElementById('first-step');
	firstStep.style = '';
	var swapStep = document.getElementById('swap-step');
	swapStep.style = '';
	var randomStep = document.getElementById('random-step');
	randomStep.style = '';
	// Initialize "global" variables
	window.i = 0;
	window.random = undefined;
	window.inLoop = false;
	window.rStep = true;
	createArray();
	updateArray();
	var iHolder = document.getElementById('i');
	iHolder.innerHTML = 'i = ';
	var nHolder = document.getElementById('n');
	nHolder.innerHTML = 'n = ';
	var rHolder = document.getElementById('random');
	rHolder.innerHTML = 'Random(i, n) = ';
}

function nextAlgoStep() {
	if (!window.inLoop) {
		firstStep();
		window.inLoop = true;
	}
	else {
		// update pseudocode and end if window.i > window.algoLength - 2
		if (window.i > window.algoLength - 2) {
			var fStep = document.getElementById('first-step');
			fStep.style = '';
			var sStep = document.getElementById('swap-step');
			sStep.style = '';
			var rStep = document.getElementById('random-step');
			rStep.style = '';
			updateArray();
			return;
		}
		else {
			nextLoopStep();
		}
	}
}

function firstStep() {
	var nHolder = document.getElementById('n');
	nHolder.innerHTML = 'n = ' + window.algoLength;
	var iHolder = document.getElementById('i');
	iHolder.innerHTML = 'i = ' + (window.i + 1);
	var firstStep = document.getElementById('first-step');
	firstStep.style = 'background-color: #51B1B5; color: white;';
}

function nextLoopStep() {
	if (window.rStep == true) {
		randomStep();
		window.rStep = false;
	}
	else if (window.rStep == false) {
		swapStep();
		window.rStep = true;
	}
}

function randomStep() {
	// Do the random part
	var randomVal = getRandomInt(window.i, window.algoLength - 1);
	window.random = randomVal;
	// Update random notifier
	var randomHolder = document.getElementById('random');
	randomHolder.innerHTML = 'Random(i, n) = ' + (window.random + 1);
	// Update pseudocode
	var firstStep = document.getElementById('first-step');
	firstStep.style = '';
	var swapStep = document.getElementById('swap-step');
	swapStep.style = '';
	var randomStep = document.getElementById('random-step');
	randomStep.style = 'background-color: #fcaee6; color: black;';
	// Update array
	updateArray();
}

function swapStep() {
	// Do the swap part
	var placeholder = window.arr[window.i];
	window.arr[window.i] = window.arr[window.random];
	window.arr[window.random] = placeholder;
	window.i = window.i + 1;
	// Update i notifier
	var iHolder = document.getElementById('i');
	if (window.i < window.algoLength) {
		iHolder.innerHTML = 'i = ' + (window.i + 1);
	}
	else {
		iHolder.innerHTML = 'i = ' + window.algoLength;
	}
	// Update pseudocode
	var firstStep = document.getElementById('first-step');
	firstStep.style = '';
	var swapStep = document.getElementById('swap-step');
	swapStep.style = 'background-color: #51B1B5; color: white;';
	var randomStep = document.getElementById('random-step');
	randomStep.style = '';
	// Update array
	updateArray();
}

function updateArray() {
	var algoArrayRow = document.getElementById('algoArrayRow');
	removeAllChildNodes(algoArrayRow);
	for (var i = 0; i < window.algoLength; i++) {
		var algoArrayCell = document.createElement('th');
		algoArrayCell.innerHTML = window.arr[i];
		if (window.i !== undefined && i == window.i) {
			algoArrayCell.style.backgroundColor = '#51B1B5';
			algoArrayCell.style.color = 'white';
		}
		if (window.random !== undefined && i == window.random) {
			algoArrayCell.style.backgroundColor = '#fcaee6';
		}
		if (window.i !== undefined && i < window.i) {
			algoArrayCell.style.backgroundColor = '#a1edf0';
		}
		if (window.i !== undefined && window.i == window.algoLength - 1) {
			algoArrayCell.style.backgroundColor = '#a1edf0';
			algoArrayCell.style.color = 'black';
		}
		algoArrayRow.appendChild(algoArrayCell);
	}
}

// Helper functions

function removeAllChildNodes(parent) {
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}

function getRandomInt(min, max) { 
	return Math.floor(Math.random() * (max - min)) + min + 1; 
}

function createArray() {
	var tempArr = []
	for (var i = 0; i < window.algoLength; i++) {
		tempArr[tempArr.length] = i + 1;
	}
	window.arr = tempArr;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
