/**
 * Created by Dzianis on 22/06/2016.
 */
var solutions = [];

solutions[0] = () => {
};
solutions[1] = () => {
};
solutions[2] = function processData(input) {
  var unique = {};
  var array = input.split('\n')[1].split(' ');

  for (var a in array) {
    if (unique.hasOwnProperty(array[a])) {
      console.log('NO');

      return;
    }

    unique[array[a]] = true;
  }

  console.log("YES");
};

module.exports = solutions;