function changeTableLength(length) {
	window.hashTable = new HashTable(length);
	updateWindowTable();
}

function addFromTableInput() {
	var inputValue = parseInt(document.getElementById('tableInput').value);
	if (Number.isInteger(inputValue)) {
		addToTable(inputValue);
	}
	else {
		console.log('Not a number!');
	}
}

async function newAddFromTableInput() {
	var inputValue = parseInt(document.getElementById('tableInput').value);
	if (Number.isInteger(inputValue)) {
		const stuff = await run(inputValue);
		if (stuff == null) {
			clearTable();
			return;
		}
		if (stuff.length == 2) {
			window.hashTable.put(inputValue);
			showHashValues(inputValue, stuff[1]);
			updateWindowTable();
		}
		else if (stuff.length == 3) {
			window.hashTable.put(inputValue);
			showHashValues(inputValue, window.hashTable.length());
			updateWindowTable();
		}
	}
	else {
		console.log('Not a number!');
	}
}

function removeFromTableInput() {
	var inputValue = parseInt(document.getElementById('tableInput').value);
	if (Number.isInteger(inputValue)) {
		removeFromTable(inputValue);
	}
	else {
		console.log('Not a number!');
	}
}

function updateWindowTable(cell) {
	var algoArrayRow = document.getElementById('algoArrayRow');
	removeAllChildNodes(algoArrayRow);
	for (var i = 0; i < window.hashTable.length(); i++) {
		var algoArrayCell = document.createElement('th');
		var newContent = window.hashTable.request(i);
		if (newContent == null) {
			algoArrayCell.innerHTML = '-';
		}
		else {
			algoArrayCell.innerHTML = newContent;
			algoArrayCell.style.backgroundColor = '#a1edf0';
		}
		if (cell == i) {
			algoArrayCell.style.backgroundColor = '#fcaee6';
		}
		algoArrayRow.appendChild(algoArrayCell);
	}
}

function addToTable(value) {
	var stuff = window.hashTable.put(value);
	if (Number.isInteger(stuff[2])) {
		showHashValues(stuff[1], stuff[2]);
	}
	updateWindowTable();
}

function removeFromTable(value) {
	window.hashTable.remove(value);
	updateWindowTable();
}

function showHashValues(value, i) {
	var iterationsText = document.getElementById('iterations');
	var hash1Text = document.getElementById('hash1');
	var hash2Text = document.getElementById('hash2');
	var fullHashText = document.getElementById('fullhash');
	iterationsText.innerHTML = 'Iterations: ' + i;
	hash1Text.innerHTML = 'Hash1: ' + window.hashTable.hashOne(value);
	hash2Text.innerHTML = 'Hash2: ' + window.hashTable.hashTwo(value);
	fullHashText.innerHTML = 'FullHash: ' + window.hashTable.hash(value, i);
}

function clearTable() {
	window.hashTable.empty();
	var tableInput = document.getElementById('tableInput');
	var iterationsText = document.getElementById('iterations');
	var hash1Text = document.getElementById('hash1');
	var hash2Text = document.getElementById('hash2');
	var fullHashText = document.getElementById('fullhash');
	tableInput.value = '-';
	iterationsText.innerHTML = 'Iterations:';
	hash1Text.innerHTML = 'Hash1:';
	hash2Text.innerHTML = 'Hash2:';
	fullHashText.innerHTML = 'FullHash: ';
	updateWindowTable();
}

// Helper functions

function removeAllChildNodes(parent) {
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}

async function run(val) {
	var i = 0;
	while (1) {
		if (window.stopRun == true) {
			return null;
		}
		var stuff = window.hashTable.stepwiseput(val, i);
		// Case 1: Table is empty at spot & add it
		if (stuff.length == 1) {
			return [stuff[0], i];
		}
		// Case 2: There is stuff there
		else if (stuff.length == 2) {
			updateWindowTable(window.hashTable.hash(val, i));
			showHashValues(val, i);
			i = stuff[1];
		}
		// Case 3: We're out of spots
		else if (stuff.length == 3) {
			await sleep(1000);
			return stuff;
		}
		await sleep(window.speed);
	}
}

function changeSpeed(newSpeed) {
	window.speed = newSpeed;
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}