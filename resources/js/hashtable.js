
var HashTable = (function () {

	// Constructor
	function HashTable(length) {
		this._length = length;
		// Fill an array with nulls
		this._table = Array(length).fill(null);
	}

	function hash(key, i) {
		return (hashOne.call(this, key) + Number(i) * hashTwo.call(this, key)) % this._length;
	}

	function hashOne(key) {
		return Number(key) % this._length;
	}

	function hashTwo(key) {
		return (1 + (Number(key) % (this._length - 1)));
	}

	HashTable.prototype.search = function(key) {
		// Iterate by modding ove rthe whole table if necessary
		for (var i = 0; i < this._length; i++) {
			// Generate next best hash
			var properIndex = hash.call(this, key, i);
			// Get value at hash
			var value = this._table[properIndex];
			// If value is the key
			if (value === key) {
				// Return its location
				return properIndex;
			}
		}
		// If key not found, return null (need to catch this)
		return null;
	}

	HashTable.prototype.length = function() {
		return this._length;
	}

	HashTable.prototype.request = function(index) {
		return this._table[index];
	}

	HashTable.prototype.getTable = function() {
		return this._table;
	}

	HashTable.prototype.hash = function(key, i) {
		return hash.call(this, key, i);
	}

	HashTable.prototype.hashOne = function(key) {
		return hashOne.call(this, key);
	}

	HashTable.prototype.hashTwo = function(key) {
		return hashTwo.call(this, key);
	}

	HashTable.prototype.put = function(key) {
		// Iterate by modding over the whole table if necessary
		for (var i = 0; i < this._length; i ++) {
			// Generate next best hash
			var doubleHashVal = hash.call(this, key, i);
			// Uncomment to see hash
			//console.log("Hash:", doubleHashVal);
			// If table at hash is empty
			if (this._table[doubleHashVal] == null) {
				// Fill spot in table
				this._table[doubleHashVal] = key;
				// Return both location of key and key
				// May seem redundant, but making return consistent
				return [doubleHashVal, key, i];
			}
		}
		// Could try implementation of rehash - untested!
		//this.rehash.call(this);
		// Table is full, overwrite table at hash of best fit for key
		var tempVal = this._table[hash.call(this, key, 0)];
		this._table[doubleHashVal] = key;
		// Return both location of key and key
		// Need to return tempVal or previous value at overwrite will be lost
		return [doubleHashVal, tempVal, 'overwrote'];
	}

	HashTable.prototype.stepwiseput = function(key, i) {
		if (i == this._length - 1) {
			var doubleHashVal = hash.call(this, key, 0);
			var tempVal = this._table[doubleHashVal];
			this._table[doubleHashVal] = key;
			return [doubleHashVal, tempVal, 'overwrote'];
		}
		var doubleHashVal = hash.call(this, key, i);
		if (this._table[doubleHashVal] == null) {
			return [doubleHashVal];
		}
		else if (this._table[doubleHashVal] != null) {
			return [key, i + 1];
		}
	}

	HashTable.prototype.remove = function(key) {
		// Find the key's location
		var location = this.search.call(this, key);
		// If the key was not found, return null (need to catch)
		if (location === null) {
			return null;
		}
		// Retrieve the value to delete
		var tempVal = this._table[location];
		// Overwrite spot in table
		this._table[location] = null;
		// Return the now-deleted value
		return tempVal;
	}

	HashTable.prototype.empty = function() {
		this._table = Array(length).fill(null);
	}

	HashTable.prototype.rehash = function() {
		// Untested!
		var oldTable = this._table;
		this._table = Array(this._length * 2).fill(null);
		for (var i = 0; i < this._length; i++) {
			this.put.call(this, oldTable[i]);
		} 
		this._length = this._length * 2;
	}

	return HashTable;
}) ();