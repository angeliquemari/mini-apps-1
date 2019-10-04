// attempt at tests failed, lost draft of them after a reset to origin
var assert = require('assert');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when value is not present', function() {
      assert.equal([1,2].indexOf(3), -1);
    });
  });
});
