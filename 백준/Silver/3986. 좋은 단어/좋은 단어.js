//글자를 하나씩 보면서
//스택의 제일 위에 있는 것과, 현재 보는 글자가 같으면
//스택에서 pop 해주고 아니면 스택에 넣기

const fs = require("fs");
const input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);
const strings = input.slice(1);

function countGoodWords(n, strings) {
  let goodWordCount = 0;

  for (const word of strings) {
    const stack = [];
    for (const char of word) {
      if (stack[stack.length - 1] === char) {
        stack.pop(); // 같은 글자가 연속되면 스택에서 제거
      } else {
        stack.push(char); // 아니면 스택에 추가
      }
    }
    if (stack.length === 0) {
      goodWordCount++; // 스택이 비었으면 "좋은 단어"
    }
  }

  return goodWordCount;
}

console.log(countGoodWords(n, strings));
