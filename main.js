/**
 * Created by Dzianis on 22/06/2016.
 */
var bijectionFunctions = require('./bijection_functions');
var cryptography = require('./cryptography');
var getData = require('./get_data');
var challenge = require('./week_of_challenge');
var dataStructures = require('./data_structures');

(function (funcArray, idx, input) {
  if (idx > -1) {
    if (input) {
      funcArray[idx](input);
    } else {
      getData(funcArray[idx]);
    }
  } else {
    for(var i in funcArray) {
      getData(funcArray[i]);
    }
  }
}) (dataStructures, 1, "6 \n6 2 3 5 1 4");
