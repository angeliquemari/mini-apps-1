var assert = require('assert');
// var helpers = require('./client/checkers.js');
import {checkForTie, checkForWin} from './client/checkers.js';

// describe('Array', function() {
//   describe('#indexOf()', function() {
//     it('should return -1 when value is not present', function() {
//       assert.equal([1,2].indexOf(3), -1);
//     });
//   });
// });

describe('Checkers', function() {
  describe('#checkForTie()', function() {
    it('should false for an empty grid', function() {
      assert.equal(checkForTie([
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null]
      ]), false);
    });
  });
});
