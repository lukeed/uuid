import test from 'tape';
import isUUID from 'is-uuid';
import uuid from '../src/node';

test('(node) exports', t => {
	t.is(typeof uuid, 'function', 'exports function');
	t.end();
});

test('(node) returns', t => {
	let out = uuid();
	t.is(typeof out, 'string', 'returns a string');
	t.is(out.length, 36, '~> 36 characters long');
	t.end();
});

test('(node) unique', t => {
	t.not(uuid(), uuid(), '~> single');

	let items = 1e6;
	let unique = new Set(Array.from({ length: items }, uuid));
	t.is(unique.size, items, '~> 1,000,000 uniques');

	t.end();
});

test('(node) validate', t => {
	let arr = Array.from({ length: 100 }, uuid);
	t.true(arr.every(isUUID.v4));
	t.end();
});
