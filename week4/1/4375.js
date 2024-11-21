const fs = require("fs");
const input = fs
  .readFileSync("./week4/run/input.txt")
  .toString()
  .trim()
  .split("\n")
  .map(Number); // 입력을 숫자 배열로 변환

const answers = []; // 결과를 저장할 배열

for (let i = 0; i < input.length; i++) {
  const cur = input[i];
  let num = 1; // 이전 계산 값
  let length = 1;

  while (true) {
    if (num % cur === 0) {
      answers.push(length); // 길이를 결과 배열에 추가
      break;
    } else {
      num = (num * 10 + 1) % cur; // 점화식
      length += 1; // 1을 한 자리 추가
    }
  }
}

console.log(answers.join("\n"));
