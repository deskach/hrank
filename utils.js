/**
 * Created by Dzianis on 29/06/2016.
 */

module.exports.fact = (n) => {
  var counter = 1;

  for(var i = 2; i <= n; i++) {
    counter *= i;
  }

  return counter;
};

