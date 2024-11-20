const fs = require("fs");
const input = fs
  .readFileSync("./week4/run/input.txt")
  .toString()
  .trim()
  .split("\n");

let ans = -Infinity;
const nums = [];
const ops = [];

const calculate = (a, op, b) => {
  if (op === "+") {
    return a + b;
  } else if (op === "-") {
    return a - b;
  } else {
    return a * b;
  }
};

const solution = (idx, result) => {
  if (idx >= ops.length) {
    ans = Math.max(ans, result);
    return;
  }

  // 괄호 없는 경우
  solution(idx + 1, calculate(result, ops[idx], nums[idx + 1]));

  // 괄호 있는 경우
  if (idx + 1 < ops.length) {
    const temp = calculate(nums[idx + 1], ops[idx + 1], nums[idx + 2]);
    solution(idx + 2, calculate(result, ops[idx], temp));
  }
};

const main = () => {
  const len = parseInt(input[0], 10);
  const s = input[1];

  for (let i = 0; i < len; i++) {
    if (s.charCodeAt(i) >= 48 && s.charCodeAt(i) <= 57) {
      // 숫자인 경우
      nums.push(parseInt(s[i], 10));
    } else {
      // 연산자인 경우
      ops.push(s[i]);
    }
  }

  // 초기 호출
  solution(0, nums[0]);
  console.log(ans);
};

main();
