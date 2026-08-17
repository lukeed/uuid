var IDX=256, HEX=[], BUFFER;
while (IDX--) HEX[IDX] = (IDX + 256).toString(16).substring(1);

export function v4() {
	var i=0, num, out='';

	if (!BUFFER || ((IDX + 16) > 256)) {
		BUFFER = Array(i=256);
		while (i--) BUFFER[i] = 256 * Math.random() | 0;
		i = IDX = 0;
	}

	for (; i < 16; i++) {
		num = BUFFER[IDX + i];
		if (i==6) out += HEX[num & 15 | 64];
		else if (i==8) out += HEX[num & 63 | 128];
		else out += HEX[num];

		if (i & 1 && i > 1 && i < 11) out += '-';
	}

	IDX++;
	return out;
}

export function v7() {
	// RFC 4122 version 7: time-ordered UUID derived from a 48-bit Unix
	// millisecond timestamp plus random data.
	var bytes = [];
	var ts = Date.now();
	var n = ts;

	for (var i = 0; i < 6; i++) {
		bytes.push((n >> ((5 - i) * 8)) & 255);
	}

	bytes.push(0x70 | ((256 * Math.random()) | 0) & 15); // version 7
	bytes.push((256 * Math.random()) | 0);
	bytes.push(0x80 | ((256 * Math.random()) | 0) & 63); // RFC4122 variant 10xx

	for (var j = 0; j < 7; j++) {
		bytes.push((256 * Math.random()) | 0);
	}

	var out = '';
	for (var k = 0; k < 16; k++) {
		out += HEX[bytes[k]];
		if (k === 3 || k === 5 || k === 7 || k === 9) out += '-';
	}

	return out;
}
