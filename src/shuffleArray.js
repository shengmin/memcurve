'use strict';

module.exports = function shuffleArray(array) {
  var newArray = [];
  var arrayCopy = [];

  for (var i = array.length - 1; i >= 0; i--) {
    arrayCopy[i] = array[i];
  }

  while (arrayCopy.length) {
    var index = Math.floor(Math.random() * arrayCopy.length);
    newArray.push(arrayCopy[index]);
    arrayCopy.splice(index, 1);
  }

  return newArray;
};
