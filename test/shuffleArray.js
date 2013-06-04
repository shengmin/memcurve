'use strict';

var shuffleArray = require('../src/shuffleArray');

module.exports = {
  'test empty array': function(test) {
    var newArray = shuffleArray([]);
    test.deepEqual(newArray, [], 'should be empty array');
    test.done();
  },

  'test array of one element': function(test) {
    var newArray = shuffleArray([1]);
    test.deepEqual(newArray, [1], 'should contain 1');
    test.done();
  },

  'test array of many elements': function(test) {
    var SIZE = 5;
    var array = [];
    for (var i = 0; i < SIZE; i++) {
      array[i] = i;
    }
    var newArray = shuffleArray(array);
    test.equal(newArray.length, array.length, 'size should be equal');

    var visited = [];
    newArray.forEach(function(value) {
      test.strictEqual(visited[value], undefined, 'should contain each element once');
      visited[value] = true;
    });

    visited.forEach(function(value) {
      test.equal(value, true, 'all elements should exist');
    });

    test.done();
  }
};
