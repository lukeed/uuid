import * as assert from 'uvu/assert';
import * as isUUID from 'is-uuid';

// @ts-ignore
const Benchmark = window.Benchmark;

// contenders
import { v4 as uuid } from 'uuid';
import { v4 as lukeed } from '../../dist';
import { v4 as secure } from '../../secure';

// https://stackoverflow.com/a/2117523
function replace_random() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

const contenders = {
	'String.replace(Math.random)': replace_random,
	'uuid/v4': uuid,
	'@lukeed/uuid': lukeed,
	'@lukeed/uuid/secure': secure,
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
const bench = new Benchmark.Suite().on('cycle', e => {
	console.log('  ' + e.target);
});

Object.keys(contenders).forEach(name => {
	bench.add(name + ' '.repeat(28 - name.length), () => {
		contenders[name]();
	})
});

bench.run();
