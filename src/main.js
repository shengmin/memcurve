'use strict';

module.exports = function() {
  var red   = '\u001b[31m';
  var green = '\u001b[32m';
  var blue  = '\u001b[34m';
  var reset = '\u001b[0m';

  var StudySet = require('./StudySet');
  var studySet = StudySet.fromYaml(process.argv[2]);

  function printQuestion() {
    if (studySet.hasMore()) {
      console.log(blue + 'Question: ' + studySet.getQuestion() + reset);
      process.stdin.once('data', onData);
    } else {
      console.log(green + 'Done :)' + reset);
      process.stdin.pause();
    }
  }

  function onData(data) {
    var answer = studySet.getAnswer();
    var color = '';

    if (data.charAt(0) == 'y') {
      studySet.markRight();
      color = green;
    } else {
      studySet.markWrong();
      color = red;
    }
    console.log(color + 'Answer: ' + answer + reset);
    console.log('-----------------------');
    printQuestion();
  }

  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  printQuestion();
};
