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

/* mac
COMMAND   PID    USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
nc      20661 michael    3u  IPv4 0x3b190d9d07c2c3db      0t0  TCP *:8017 (LISTEN)
nc      21145 michael    3u  IPv4 0x3b190d9d054773db      0t0  TCP *:8017 (LISTEN)
Python  21221 michael    3u  IPv4 0x3b190d9ceb8dfd7b      0t0  UDP localhost:8017
*/

/* win
 TCP    0.0.0.0:9000           0.0.0.0:0              LISTENING       5220
 TCP    127.0.0.1:9000         127.0.0.1:62376        ESTABLISHED     5220
 TCP    127.0.0.1:9000         127.0.0.1:62379        ESTABLISHED     5220
 TCP    127.0.0.1:62288        127.0.0.1:9000         TIME_WAIT       0
 TCP    127.0.0.1:62299        127.0.0.1:9000         TIME_WAIT       0
 TCP    127.0.0.1:62376        127.0.0.1:9000         ESTABLISHED     7604
 TCP    127.0.0.1:62378        127.0.0.1:9000         ESTABLISHED     7604
 UDP    127.0.0.1:9000         *:*                                    1240
*/
