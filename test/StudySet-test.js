'use strict';

var StudySet = require('../src/StudySet');

module.exports = {
  'setUp': function(callback) {
    this._studySet = StudySet.fromYaml('test/StudySet.yaml');
    callback();
  },

  'tearDown': function(callback) {
    this._studySet = null;
    callback();
  },

  'test basic methods': function(test) {
    var studySet = this._studySet;
    test.equal(studySet.getQuestion().charAt(0), 'q');
    test.equal(studySet.getAnswer().charAt(0), 'a');

    test.equal(
      studySet.getQuestion().charAt(1),
      studySet.getAnswer().charAt(1),
      'question and answer should match'
    );
    test.done();
  },

  'test iterations': function(test) {
    var studySet = this._studySet;
    test.equal(studySet.hasMore(), true);

    test.equal(studySet.markWrong().hasMore(), true);
    test.equal(studySet.markWrong().hasMore(), true);
    test.equal(studySet._studySet.length, 2);
    test.equal(studySet._index, 0);

    test.equal(studySet.markRight().hasMore(), true);
    test.equal(studySet._studySet.length, 1);
    test.equal(studySet._index, 0);

    test.equal(studySet.markWrong().hasMore(), true);
    test.equal(studySet._studySet.length, 1);
    test.equal(studySet._index, 0);

    test.equal(studySet.markRight().hasMore(), false);

    test.done();
  }
};
