import { test } from 'uvu';
import isUUID from 'is-uuid';
import * as assert from 'uvu/assert';
import { randomFillSync } from 'crypto';
import uuid from '../src/browser';

global.msCrypto = undefined;

global.crypto = {
	getRandomValues(arr) {
		const buffer = Buffer.from(arr.buffer);
		randomFillSync(buffer);
		return arr;
	}
}

test('(browser) exports', () => {
	assert.type(uuid, 'function', 'exports function');
});

test('(browser) returns', () => {
	let out = uuid();
	assert.type(out, 'string', 'returns a string');
	assert.is(out.length, 36, '~> 36 characters long');
});

test('(browser) unique', () => {
	assert.is.not(uuid(), uuid(), '~> single');

	let items = 1e6;
	let unique = new Set(Array.from({ length: items }, uuid));
	assert.is(unique.size, items, '~> 1,000,000 uniques');
});

test('(browser) validate', () => {
	let arr = Array.from({ length: 1e3 }, uuid);
	assert.ok(arr.every(isUUID.v4));
});

test.run();
