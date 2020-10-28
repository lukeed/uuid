const assert = require('uvu/assert');
const { Suite } = require('benchmark');
const { randomBytes } = require('crypto');
const isUUID = require('is-uuid');

// https://stackoverflow.com/a/2117523
function replace_random() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

function replace_crypto() {
	return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, function (c) {
		return (c ^ randomBytes(1)[0] & 15 >> c / 4).toString(16);
	});
}

const contenders = {
	'String.replace(Math.random)': replace_random,
	'String.replace(crypto)': replace_crypto,
	'uuid/v4': require('uuid').v4,
	'@lukeed/uuid': require('../dist').v4,
	'@lukeed/uuid/secure': require('../secure').v4,
};

console.log('Validation: ');
Object.keys(contenders).forEach(name => {
	try {
		const lib = contenders[name];

		assert.type(lib(), 'string', 'returns string');
		assert.is.not(lib(), lib(), 'unqiue strings');
		assert.ok(isUUID.v4(lib()), 'valid UUID.V4');

		console.log('  ✔', name);
	} catch (err) {
		console.log('  ✘', name, `(FAILED @ "${err.message}")`);
	}
});


console.log('\nBenchmark:');
const bench = new Suite().on('cycle', e => {
	console.log('  ' + e.target);
});

Object.keys(contenders).forEach(name => {
	bench.add(name + ' '.repeat(28 - name.length), () => {
		contenders[name]();
	})
});

bench.run();
