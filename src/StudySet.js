'use strict';

var fs = require('fs');
var Yaml = require('js-yaml');
var shuffleArray = require('./shuffleArray');

function StudySet(studySet) {
  this._studySet = studySet;
  this._reset();
}

StudySet.prototype._reset = function() {
  this._index = 0;
  this._studySet = shuffleArray(this._studySet);
  return this;
};

StudySet.prototype.getQuestion = function() {
  return this._studySet[this._index].q;
};

StudySet.prototype.getAnswer = function() {
  return this._studySet[this._index].a;
};

StudySet.prototype.hasMore = function() {
  return this._studySet.length > 0;
};

StudySet.prototype.markRight = function() {
  // remove the current item from the study set
  var index = this._index;
  var studySet = this._studySet;
  studySet.splice(index, 1);

  if (index >= studySet.length) {
    this._reset();
  }
  return this;
};

StudySet.prototype.markWrong = function() {
  // proceed to the next study item
  if (++this._index >= this._studySet.length) {
    this._reset();
  }
  return this;
};

StudySet.fromYaml = function(filePath) {
  var yaml = fs.readFileSync(filePath, {
    encoding: 'utf8'
  });
  var studySet = Yaml.load(yaml);
  return new StudySet(studySet.set);
};

module.exports = StudySet;
