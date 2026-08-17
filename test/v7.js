import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { v7 as uuid } from '../src';

const V7 = /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

test('exports', () => {
	assert.type(uuid, 'function', 'exports function');
});

test('returns', () => {
	const out = uuid();
	assert.type(out, 'string', 'returns a string');
	assert.is(out.length, 36, '~> 36 characters long');
	assert.ok(V7.test(out), '~> matches the UUIDv7 layout');
});

test('unique', () => {
	const length = 1e5;
	const unique = new Set(Array.from({ length }, uuid));
	assert.is(unique.size, length, '~> 100,000 uniques');
});
