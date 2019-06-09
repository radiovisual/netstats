/* eslint prefer-destructuring: 0 */
const condense = require('selective-whitespace');

const server = require('express')();
const netstats = require('./index.js');

let listener;
let port;

describe('netstats', () => {
  afterEach(() => {
    listener.close();
  });

  beforeEach(() => {
    listener = server.listen(0);
    port = listener.address().port;
  });

  test('gets the netstats', () => {
    expect.assertions(3);

    return netstats(port).then((stats) => {
      const v = condense(stats[0]);
      const value = v.split(' ')[0];
      expect(value === 'COMMAND' || value === 'TCP' || value === 'UDP').toEqual(true);
      expect(stats.length > 0).toEqual(true);
      expect(Array.isArray(stats)).toEqual(true);
    });
  });
});
