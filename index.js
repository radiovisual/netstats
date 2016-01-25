'use strict';
require('native-promise-only');
var exec = require('child_process').exec;

function command(port) {
	var win = {
		exe: '\\windows\\system32\\netstat.exe',
		arg: ['-a -n -o ^| findstr :' + port],
		cmd: '\\windows\\system32\\netstat.exe -a -n -o | findstr.exe :' + port
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

		exec(cmd.cmd, function (err, stdout, stderr) {
			var _err = err || stderr;
			if (_err) {
				reject(_err);
			}
			resolve(stdout.split('\n'));
		});
	});
};
