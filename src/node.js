'use strict';

import { randomBytes } from 'crypto';

var SIZE=4096, HEX=[], IDX=0, BUFFER;

for (var i=0; i < 256; i++) {
	HEX[i] = (i + 0x100).toString(16).substr(1);
}

function bounds() {
	var b = slice(16);
	b[6] = (b[6] & 0x0f) | 0x40;
	b[8] = (b[8] & 0x3f) | 0x80;
	return b;
}

function slice(size) {
	if (!BUFFER || ((IDX + size) > SIZE)) {
		BUFFER = randomBytes(SIZE);
		IDX = 0;
	}
	return BUFFER.slice(IDX, IDX += size);
}

export default function () {
	var i=0, out='', arr=bounds();
	for (; i < 4; i++) out+=HEX[arr[i]];
	for (out+='-'; i < 6; i++) out+=HEX[arr[i]];
	for (out+='-'; i < 8; i++) out+=HEX[arr[i]];
	for (out+='-'; i < 10; i++) out+=HEX[arr[i]];
	for (out+='-'; i < 16; i++) out+=HEX[arr[i]];
	return out;
}
