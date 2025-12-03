// 교수 가 된 현우

const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

function getFiveCount(n) {
  let five = 0;
  for (let i = 5; i <= n; i *= 5) {
    five += Math.trunc(n / i);
  }
  return five;
}

const T = Number(input[0]); // 테스트 케이스 개수
const answers = [];

for (let i = 1; i <= T; i++) {
  const num = Number(input[i]); // n!
  const fiveCount = getFiveCount(num);
  answers.push(fiveCount);
}

console.log(answers.join("\n"));