const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const s = input[1]; // 입력은 두 번째 줄부터터
const stack = [-1]; // 처음에는 아무것도 없으니까 -1 상태로 시작작
let answer = 0;

for (let i = 0; i < s.length; i++) {
  const ch = s[i];

  if (ch === "(") {
    // 여는 괄호면 스택에 현재 인덱스 추가
    stack.push(i);
  } else {
    // 닫는 괄호 처리
    stack.pop();
    if (stack.length > 0) {
      // 스택이 비어있지 않다면 길이 +
      answer = Math.max(answer, i - stack[stack.length - 1]);
    } else {
      // 스택이 비어 있으면 현재 인덱스 추가
      stack.push(i);
    }
  }
}

console.log(answer);
