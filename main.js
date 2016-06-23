/**
 * Created by Dzianis on 22/06/2016.
 */
var bijectionFunctions = require('./bijection_functions');
var getData = require('./get_data');

(function (funcArray, idx, input) {
  if (idx > -1) {
    if (input) {
      funcArray[idx](input);
    } else {
      getData(funcArray[idx]);
    }
  } else {
    for(i in funcArray) {
      getData(funcArray[i]);
    }
  }
}) (bijectionFunctions, 4, "3\n2 3 1");


