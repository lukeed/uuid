const { parse } = require('path');
const { platform } = require('os');
const { promisify } = require('util');
const { spawn } = require('child_process');
const premove = require('premove');

const isWindows = platform() === "win32";
const run = promisify(spawn);
const bundt = require.resolve('bundt');

function capitalize(str) {
	return str[0].toUpperCase() + str.substring(1);
}

async function mode(filename, args) {
	let { name } = parse(filename);
	let { stdout } = await run(bundt, [filename].concat(args || []), {
		shell: isWindows
	});

	let diff = 8 - name.length;
	let spacer1 = ' '.repeat(diff < 0 ? 0 : diff);
	let spacer2 = ' '.repeat(diff < 0 ? diff * -1 : 0);

	process.stdout.write(
		stdout.replace('Filename' + spacer2, capitalize(name) + spacer1)
	);
}

(async function () {
	// Purge
	await premove('dist');

	// Build modes (order matters)
	await mode('src/browser.js', ['--browser', '--unpkg']);
	await mode('src/node.js', ['--module', '--main']);
})().catch(err => {
	console.error('ERROR:', err);
	process.exit(1);
});
