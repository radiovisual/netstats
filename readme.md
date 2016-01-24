# netstats 

> Get the netstat activity on a given port.

[![Build Status](https://travis-ci.org/radiovisual/netstats.svg?branch=master)](https://travis-ci.org/radiovisual/netstats)


## Install

```
$ npm install --save netstats
```

## Usage

```js
const netstats = require('netstats');

netstats(8017).then(results => {
    console.log(results);
});
/*
[ 'COMMAND   PID    USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME',
  'nc      20661 michael    3u  IPv4 0x3b190d9d07c2c3db      0t0  TCP *:8017 (LISTEN)',
  'nc      21145 michael    3u  IPv4 0x3b190d9d054773db      0t0  TCP *:8017 (LISTEN)',
  'Python  21221 michael    3u  IPv4 0x3b190d9ceb8dfd7b      0t0  UDP localhost:8017' ]
*/  
```

Returns an array containing the line output of the following commands:
- on **linux/mac**: `lsof -i :<port>`
- on **windows**: `netstat.exe -a -n -o | findstr :<port>`


## License

MIT © [Michael Wuergler](http://numetriclabs.com)
