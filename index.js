const util = require('util');
const exec = util.promisify(require('child_process').exec);

function command(port) {
  const win = `\\windows\\system32\\netstat.exe -a -n -o | findstr.exe :${port}`;

  const dar = `lsof -i :${port}`;

  return process.platform === 'win32' ? win : dar;
}

function netstats(port) {
  if (typeof port !== 'number') {
    throw new TypeError('Expected a port number');
  }

  const cmd = command(port);

  return exec(cmd).then(({ stdout }) => stdout.split('\n'));
}

module.exports = netstats;
