/**
 * Created by Dzianis on 22/06/2016.
 */
var bijectionFunctions = require('./bijection_functions');
var cryptography = require('./cryptography');
var getData = require('./get_data');

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
}) (cryptography, 1, "2\nSPORT\nLDXTW KXDTL NBSFX BFOII LNBHG ODDWN BWK\nSECRET\nJHQSU XFXBQ");
