(() => {
  var numbers = [10, 20, 30];

  var lessThanFifteen = reject(numbers, function(number){
    return number > 15;
  });

  console.log(lessThanFifteen);
})();

function reject(array, iteratorFunction) {
  return array.filter(item => { return !iteratorFunction(item); })
}
