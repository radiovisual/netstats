import test from 'ava';
import netstats from './';
const server = require('express')();

test.beforeEach(t => {
	const listener = server.listen(0);
	t.context.listener = listener;
	t.context.port = listener.address().port;
	console.log('running test server on port: ', t.context.port);
});

test('gets the netstats', async t => {
	await netstats(t.context.port).then(stats => {
		t.plan(3);

		const value = stats[0].split(' ')[0];
		t.true(value === 'COMMAND' || value === 'TCP' || value === 'UDP');
		t.true(stats.length > 0);
		t.true(Array.isArray(stats));
	});
});

test.afterEach(t => {
	t.context.listener.close();
	console.log('closing test server on port: ', t.context.port);
});
