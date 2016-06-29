/**
 * Created by Dzianis on 29/06/2016.
 */
var solutions = [];

solutions[0] = (input) => {
  var strings = input.split('\n');
  var NK = strings[0].split(' ').map((v) => {return parseInt(v)});
  var N = NK[0];
  var K = NK[1];
  var heights = strings[1].split(' ').map((v) => {return parseInt(v)}).slice(0, N);
  var Q = parseInt(strings[2]);

  for(var i = 0; i < Q; i++) {
    var lr = strings[3 + i].split(' ').map((v) => {return parseInt(v)});
    var l = lr[0], r = lr[1];
    var numPairs = 0;

    for(var j = l; j < r; j++) {
      for(var k = j + 1; k <= r; k++) {
        if(Math.abs(heights[j] - heights[k]) <= K) {
          numPairs++;
        }
      }
    }
    console.log(numPairs)
  }
};

solutions[1] = (input) => { //Almost sorted interval
  var N = parseInt(input);
  var cnt = 0;
  var start = input.indexOf('\n') + 1;
  var end = input.indexOf(' ', start + 1);

  for(var i = 0; (i < N) && (end > 0); i++) {
    var maxVal = parseInt(input.substr(start, end - start));

    for(var j = i; j < N; j++) {
      var jthVal = parseInt(input.substr(start, end - start));

      if (jthVal < maxVal) {
        break;
      }

      maxVal = jthVal;
      start = end;
      end = input.indexOf(' ', start + 1);
      if (end < 0) {
        end = input.length;
      }
    }

    if (j == i + 1) {
      cnt++;
    } else {
      var sum = (j - i + 1)*(j - i)/2;
      cnt += sum;
      i = j - 1;
    }
  }

  console.log(cnt);
};

module.exports = solutions;