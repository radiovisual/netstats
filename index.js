'use strict';
var execa = require('execa');
require('native-promise-only');

function command(port) {
	var win = {
		exe: '\\windows\\system32\\netstat.exe',
		arg: ['-a -n -o | findstr :' + port],
		cmd: '\\windows\\system32\\netstat.exe -a -n -o | findstr :' + port
	};

	var dar = {
		exe: 'lsof',
		arg: ['-i', ':' + port],
		cmd: 'lsof -i :' + port
	};

	return process.platform === 'win32' ? win : dar;
}

module.exports = function (port, opts) {
	if (typeof port !== 'number') {
		throw new TypeError('Expected a port number');
	}

	opts = opts || {};

	return new Promise(function (resolve, reject) {
		var cmd = command(port);

		execa.shell(cmd.cmd).then(function (result) {
			var _err = result.error || result.stderr;
			if (_err) {
				reject(_err);
			}
			resolve(result.stdout.split('\n'));
		});
	});
};
