/**
 * Created by Dzianis on 22/06/2016.
 */
var bijectionFunctions = require('./bijection_functions');

(function (funcArray, idx) {
  if (idx > -1) {
    funcArray[idx]();
  } else {
    for(i in funcArray) {
      funcArray[i]();
    }
  }
}) (bijectionFunctions, 3);


