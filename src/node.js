import { randomBytes } from 'crypto';

var SIZE=4096, HEX=[], IDX=0, BUFFER;

for (var i=0; i < 256; i++) {
	HEX[i] = (i + 256).toString(16).substring(1);
}

export default function () {
	if (!BUFFER || ((IDX + 16) > SIZE)) {
		BUFFER = randomBytes(SIZE);
		IDX = 0;
	}

	var arr = BUFFER.slice(IDX, IDX += 16);

	return (
		HEX[arr[0]] + HEX[arr[1]] + HEX[arr[2]] + HEX[arr[3]]
		+ '-' + HEX[arr[4]] + HEX[arr[5]]
		+ '-' + HEX[arr[6] & 15 | 64] + HEX[arr[7]]
		+ '-' + HEX[arr[8] & 63 | 128] + HEX[arr[9]]
		+ '-' + HEX[arr[10]] + HEX[arr[11]] + HEX[arr[12]] + HEX[arr[13]] + HEX[arr[14]] + HEX[arr[15]]
	);
}
