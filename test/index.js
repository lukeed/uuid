import { test } from 'uvu';
import isUUID from 'is-uuid';
import * as assert from 'uvu/assert';
import { v4 as uuid } from '../src';

test('exports', () => {
	assert.type(uuid, 'function', 'exports function');
});

test('returns', () => {
	let out = uuid();
	assert.type(out, 'string', 'returns a string');
	assert.is(out.length, 36, '~> 36 characters long');
});

test('unique', () => {
	let length = 1e6;
	assert.is.not(uuid(), uuid(), '~> single');
	let unique = new Set(Array.from({ length }, uuid));
	assert.is(unique.size, length, '~> 1,000,000 uniques');
});

test('validate', () => {
	let arr = Array.from({ length: 1e3 }, uuid);
	assert.ok(arr.every(isUUID.v4));
});

test.run();
