/* Helper Fns */

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function convertOneCharToDecimal(c) {
    return c.charCodeAt(0);
}

function writeStringToHTML(str, id) {
    document.getElementById(id).innerHTML = str;
}

/* Decimal->Base Fns */

function convertOneDecimalToOct(x) {
	return pad(x.toString(8), 3);
}

function convertOneDecimalToHex(x) {
	return x.toString(16);
}

function convertOneDecimalToBinary(x) {
    let bin = 0;
    let rem, i = 1, step = 1;
    while (x != 0) {
        rem = x % 2;
        x = parseInt(x / 2);
        bin = bin + rem * i;
        i = i * 10;
    }
    bin = pad(bin, 8);
    return bin;
}

/* Character->Base Fns */

function convertOneCharToOct(c) {
	return convertOneDecimalToOct(convertOneCharToDecimal(c));
}

function convertOneCharToHex(c) {
	return convertOneDecimalToHex(convertOneCharToDecimal(c));
}

function convertOneCharToBinary(c) {
    return convertOneDecimalToBinary(convertOneCharToDecimal(c));
}

/* String->Base Fns */

function convertOneStringToOct(str) {
    let octString = '';
    for (let i = 0; i < str.length; i++) {
        if (octString.length > 0) {
            octString = octString.concat(' ');
        }
        octString = octString.concat(convertOneCharToOct(str.charAt(i)));
    }
    return octString;
}

function convertOneStringToHex(str) {
    let hexString = '';
    for (let i = 0; i < str.length; i++) {
        if (hexString.length > 0) {
            hexString = hexString.concat(' ');
        }
        hexString = hexString.concat(convertOneCharToHex(str.charAt(i)));
    }
    return hexString;
}

function convertOneStringToBinary(str) {
    let binaryString = '';
    for (let i = 0; i < str.length; i++) {
        if (binaryString.length > 0) {
            binaryString = binaryString.concat(' ');
        }
        binaryString = binaryString.concat(convertOneCharToBinary(str.charAt(i)));
    }
    return binaryString;
}

/* Convert & Write Fns */

function convertAndWriteOct(str, id) {
    writeStringToHTML(convertOneStringToOct(str), id);
}

function convertAndWriteHex(str, id) {
    writeStringToHTML(convertOneStringToHex(str), id);
}

function convertAndWriteBinary(str, id) {
    writeStringToHTML(convertOneStringToBinary(str), id);
}

