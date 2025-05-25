const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim(); // /dev/stdin 대신 0 사용
const N = Number(input);

function getDigitSum(n) {
  return n + n.toString().split('').reduce((acc, digit) => acc + Number(digit), 0);
}

function findConstructor(n) {
  for (let i = 1; i <= n; i++) {
    if (getDigitSum(i) === n) {
      return i;
    }
  }
  return 0;
}

console.log(findConstructor(N));