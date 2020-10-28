import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
	input: 'browser/index.js',
	output: {
		format: 'esm',
		file: 'browser/bundle.js',
	},
	plugins: [
		resolve({ browser: true }),
		commonjs()
	]
}
