/**
 * Created by Dzianis on 22/06/2016.
 */
var readline = require('readline');

module.exports = function getData(callback) {
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  }), input = "";

  console.log('Provide input data.');

  rl.setPrompt('CMD>');
  rl.prompt();

  rl.on('line', function (d) {
    var strCmd = d.trim();

    if (strCmd.length > 0) {
      try {
        input += "\n" + strCmd;
      } catch (e) {
        console.log('Wrong command "' + strCmd + '"');
      }
    } else {
      callback(input);
      process.exit(0);

      return;
    }

    rl.prompt();
  }).on('close', function () {
    console.log('See you!');
    process.exit(0);
  });
};
