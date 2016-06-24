/**
 * Created by Dzianis on 23/06/2016.
 */
var solutions = [];

solutions[0] = (input) => { // Basic Cryptanalysis
  var fs = require('fs');
  
  fs.readFile('dictionary.lst', 'utf8', function(err, data) {
    if (err) throw err;

    //Prepare dictionary
    var words = data.toLowerCase().split('\n').map((w) => (w.replace('\r', ''))).sort();
    var maxWord = words.reduce((w1, w2) => {
      return w1.length > w2.length ? w1 : w2
    });

    var dict = {};
    for(var i = 1; i < maxWord.length + 1; i++) {
      dict[i] = words.filter((w) => { return w.length == i; });
    }

    //Create list of possible letters
    var iwords = input.toLowerCase().split(' ');
    var possibilities = {};

    for(var iw of iwords) {
      var iwls = iw.split('');
      
      for(var j = 0; j < iwls.length; j++) {
        var jthPossibilities = new Set();
        
        for(var dw of dict[iwls.length]) {
          jthPossibilities.add(dw[j]);
        }

        if (iwls[j] in possibilities) {
          var intersect = possibilities[iwls[j]].filter((l) => { return jthPossibilities.has(l)});

          possibilities[iwls[j]] = intersect;
        } else {
          possibilities[iwls[j]] = Array.from(jthPossibilities);
        }
      }
    }

    // Try to narrow down the list of possible letter translations by analyzing words which have translated letters
    var processedLetters = [];
    var letters2bProcessed = Object.keys(possibilities).filter((l) => {
      return possibilities[l].length == 1 && processedLetters.indexOf(l) < 0;
    });
    var lettersInQuestion = Object.keys(possibilities).filter((l) => {
      return possibilities[l].length > 1;
    });

    while (letters2bProcessed.length > 0 && lettersInQuestion.length > 0) {
      for(var l of letters2bProcessed) {
        var dl = possibilities[l][0];
        var allInputWordsWithThisLetter = iwords.filter((w) => { return w.indexOf(l) > -1 });

        for(var iw of allInputWordsWithThisLetter) {
          var allRelatedFromDict = dict[iw.length].filter((w) => {
            return w.indexOf(dl) == iw.indexOf(l) && w.lastIndexOf(dl) == iw.lastIndexOf(l);
          });

          if(allRelatedFromDict.length == 1) {
            var dw1 = allRelatedFromDict[0];

            for(var i = 0; i < iw.length; i++) {
              possibilities[iw[i]] = [dw1[i]];
            }

            for(var l1 of dw1.split('')) {
              var pkeys = Object.keys(possibilities).filter((k) => {
                return possibilities[k].length > 1 && possibilities[k].indexOf(l1) > -1
              });

              for(var p of pkeys) {
                var l1idx = possibilities[p].indexOf(l1);

                if(l1idx > -1) {
                  possibilities[p].splice(l1idx, 1);
                }
              }
            }
          }
        }

        processedLetters.push(l);

        lettersInQuestion = Object.keys(possibilities).filter((l) => { return possibilities[l].length > 1 });
        if(lettersInQuestion.length == 0) {
          break;
        }
      }

      letters2bProcessed = Object.keys(possibilities).filter((l) => {
        return possibilities[l].length == 1 && processedLetters.indexOf(l) < 0;
      });
    }

    function getPossibleTranslations(word) {
      var uniqueLetters = Object.keys(possibilities).filter((l) => { return possibilities[l].length == 1 });
      var positions = [];
      var partiallyTranslated = [];

      // replace known letters
      for(var i = 0; i < word.length; i++) {
        var l = word[i];

        if (uniqueLetters.indexOf(l) > -1) {
          var tw = possibilities[l][0];

          partiallyTranslated.push(tw);
        } else {
          positions.push(i);
          partiallyTranslated.push(l);
        }
      }

      // process unresolved letters
      var partiallyTranslatedWord = partiallyTranslated.join('');
      var translations = [partiallyTranslatedWord];
      for(var p of positions) {
        var newTranslations = [];

        for (var t = translations.pop(); t; t = translations.pop()) {
          var currentTranslations = possibilities[word[p]].map((l1) => {
            var translated = t.split('');
            translated[p] = l1;

            return translated.join('');
          });

          newTranslations = newTranslations.concat(currentTranslations);
        }

        translations = newTranslations;
      }

      // remove those words which are not in the dictionary
      var validTranslations = translations.filter((w) => {
        return  dict[w.length].indexOf(w) > -1;
      });
      if (validTranslations.length == 0) {
        validTranslations = translations;
      }

      return validTranslations;
    }

    // Finally do the translation
    for(iw of iwords) {
      var translations = getPossibleTranslations(iw),
        len = translations.length,
        n = len == 1 ? 0 : Math.floor(Math.random() * (translations.length + 1));;

      console.log(translations[n]);
    }
  });
};

solutions[1] = (input) => { // Keyword Transposition Cipher
  var data = input.toUpperCase().split('\n').map((w) => (w.replace('\r', '')));
  var numCases = parseInt(data[0]);
  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var output = [];

  for(var i = 1; i <= numCases * 2; i += 2) {
    var keyword = Array.from(new Set(data[i].split(''))).join(''); // remove duplicated letters
    var encryption = data[i+1];
    var matrix = [keyword.split('')];
    var row = [];

    // create initial matrix
    for(var ch of ALPHABET) {
      if(keyword.indexOf(ch) < 0) {
        row.push(ch);
      }
      if (row.length == keyword.length) {
        matrix.push(row);
        row = [];
      }
    }
    if (row.length > 0) {
      while (row.length < matrix[0].length) {
        row.push(null);
      }
      matrix.push(row);
    }

    // Create sequence of letters to be used instead of the regular ALPHABET
    var sortedKeyword = keyword.split('').sort().join('');
    var substitution = [];
    for (ch of sortedKeyword) {
      var colNum = matrix[0].indexOf(ch);

      for (var j = 0; j < matrix.length; j++) {
        var enchar = matrix[j][colNum];

        if(enchar) {
          substitution.push(enchar);
        }
      }
    }

    // Create dict which maps regular ALPHABET to the encrypted one
    var dict = {};
    for(var j = 0; j < ALPHABET.length; j++) {
      dict[substitution[j]] = ALPHABET[j];
    }
    dict[' '] = ' ';

    // Now decrypt the text
    var decrypted = [];
    for(ch of encryption) {
      decrypted.push(dict[ch]);
    }

    output.push(decrypted.join(''));
  }

  console.log(output.join('\n'));
};

module.exports = solutions;
