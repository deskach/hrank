/**
 * Created by Dzianis on 28/06/2016.
 */
var solutions = [];

solutions[0] = () => {
  var x1 = 0;
  var v1 = 2;
  var x2 = 5;
  var v2 = 3;

  function main() {
    // x1 + v1*n == x2 * v2*n => v1*n - v2*n = x2 - x1 => n = (x2 - x1)/(v1 - v2);
    var r = (x2 - x1) % (v1 - v2);

    if ((v1 > v2) && (x1 < x2) && (r == 0)) {
      console.log("YES");
    } else {
      console.log("NO");
    }
  }
};

solutions[1] = (input) => {
  var lines = input.split('\n');
  var n = parseInt(lines[0].split(' ')[0]);
  var k = parseInt(lines[0].split(' ')[1]);
  var luckImportancePairs = [];
  var L = 0;

  for(var i = 1; i <= n; i++) {
    var values = lines[i].split(' ').map((v) => { return parseInt(v); });

    luckImportancePairs.push(values);
  }

  luckImportancePairs.sort((a, b) => { return a[1] - b[1] == 0 ? a[0] - b[0] : a[1] - b[1]; });

  for(var j = 0; j < k; j++) {
    L += luckImportancePairs[luckImportancePairs.length - 1 - j][0];
  }

  for(var m = 0; luckImportancePairs[m][1] == 0; m++) {
    L += luckImportancePairs[m][0];
  }

  for(var p = m; p < luckImportancePairs.length - k; p++){
    L -= luckImportancePairs[p][0];
  }

  console.log(L);
};

solutions[2] = (input) => {
  var lines = input.split('\n');
  var n = parseInt(lines[0]);
  //var values = lines[1].split(' ').map((v) => { return parseInt(v); });

  function fact(num)
  {
    var rval=1;
    for (var i = 2; i <= num; i++)
      rval = rval * i;
    return rval;
  }

  console.log(fact(n) + ".000000");
};

solutions[3] = (input) => {
  var lines = input.split('\n');
  var n = parseInt(lines[0]);
  //var values = lines[1].split(' ').map((v) => { return parseInt(v); });

  var s = (1 / n) / ((1 - (1 / n))*(1 - (1 / n)));
  
  console.log(s);
};


module.exports = solutions;
