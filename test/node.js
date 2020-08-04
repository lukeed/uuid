import { test } from 'uvu';
import isUUID from 'is-uuid';
import * as assert from 'uvu/assert';
import uuid from '../src/node';

test('exports', () => {
	assert.type(uuid, 'function');
});

test('returns', () => {
	let out = uuid();
	assert.type(out, 'string', 'returns a string');
	assert.is(out.length, 36, '~> 36 characters long');
});

test('unique', () => {
	assert.is.not(uuid(), uuid(), '~> single');

	let items = 1e6;
	let unique = new Set(Array.from({ length: items }, uuid));
	assert.is(unique.size, items, '~> 1,000,000 uniques');
});

test('validate', () => {
	let arr = Array.from({ length: 1e3 }, uuid);
	assert.ok(arr.every(isUUID.v4));
});

test.run();
