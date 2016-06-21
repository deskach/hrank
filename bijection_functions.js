/**
 * Created by Dzianis on 22/06/2016.
 */
var solutions = [];

solutions[0] = () => {};
solutions[1] = () => {};
solutions[2] = () => {
  function processData(input) {
    var unique = {};

    for(a in input) {
      if (unique.hasOwnProperty(input[a])) {
        console.log('NO');

        return;
      }

      unique[a] = 1;
    }
  }

  process.stdin.resume();
  process.stdin.setEncoding("ascii");
  _input = "";
  process.stdin.on("data", function (input) {
    _input += input;
  });

  process.stdin.on("end", function () {
    processData(_input);
  });
};

module.exports = solutions;