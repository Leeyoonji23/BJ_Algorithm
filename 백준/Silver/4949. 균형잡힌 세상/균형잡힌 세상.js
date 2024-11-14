const fs = require("fs");
const input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");
input.pop();

function solution(input) {
  const result = [];
  const BRACKET_PAIR = {
    ')': '(',
    ']': '[',
  };
  const OPEN_BRACKETS = Object.values(BRACKET_PAIR);

  for (const STRING of input) {
    const stack = [];
    let isBalanced = true;

    for (let i = 0; i < STRING.length; i++) {
      const cur = STRING[i];

      // 괄호가 아니라면 검사 x
      if (!'()[]'.includes(cur)) continue;

      // 여는 괄호라면 stack에 push
      if (OPEN_BRACKETS.includes(cur)) {
        stack.push(cur);
      }
      // 닫는 괄호라면,
      else if (cur in BRACKET_PAIR) {
        // stack이 비었거나 쌍이 맞지 않으면 불균형
        if (!stack.length || stack[stack.length - 1] !== BRACKET_PAIR[cur]) {
          isBalanced = false;
          break;
        }
        stack.pop();
      }
    }

    // 짝이 맞아서 다 제거되었는지 확인
    result.push(isBalanced && stack.length === 0 ? 'yes' : 'no');
  }

  console.log(result.join('\n'));
}

solution(input);
