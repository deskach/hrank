function isBalanced(paranthses) {
  return paranthses.split("").reduce((acc, ch) => {
    if(acc < 0)
      return acc;
    else if (ch ==='(')
      return ++acc;
    else if (ch ===')')
      return --acc;

    return acc;
  }, 0) === 0;
}

console.log(isBalanced("(((("));
console.log(isBalanced(")((("));
console.log(isBalanced("()(())()"));
