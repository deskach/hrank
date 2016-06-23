/**
 * Created by Dzianis on 22/06/2016.
 */
var solutions = [];

solutions[0] = () => {
};
solutions[1] = () => {
};
solutions[2] = (input) => { // Security Bijective Functions
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

solutions[3] = (input) => { // Security Function Inverses
  var values = input.split('\n');
  var array = values[1].split(' ').map((i) => parseInt(i));
  var n = parseInt(values[0]);
  var dict = {};

  for (var i in array) {
    dict[array[i]] = parseInt(i) + 1;
  }
  for (i = 1; i < n + 1; i++ ) {
    console.log(dict[i]);
  }
};

solutions[4] = (input) => { //Security Permutations
  var values = input.split('\n');
  var array = [undefined].concat(values[1].split(' ').map((i) => parseInt(i)));
  var n = parseInt(values[0]);

  for (var i = 1; i < n + 1; i++ ) {
    console.log(array[array[i]]);
  }
};

solutions[5] = (input) => { //Security Involution
  var values = input.split('\n');
  var array = [undefined].concat(values[1].split(' ').map((i) => parseInt(i)));
  var n = parseInt(values[0]);
  var dict = {};

  for (var i in array) {
    dict[array[i]] = parseInt(i);
  }

  for (var i = 1; i < n + 1; i++ ) {
    if (array[i] != dict[i]) {
      console.log("NO");
      return;
    }
  }
  console.log("YES");
};

module.exports = solutions;