const fs = require("fs");
const input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const board = Array.from({ length: N }, () => Array(M));
const visited = Array.from({ length: N }, () => Array(M).fill(false));
let answer = 0;

for (let i = 1; i <= N; i++) {
  const temp = input[i].split("").map(Number);
  for (let j = 0; j < M; j++) {
    board[i - 1][j] = temp[j];
  }
}

dfs(0, 0);
console.log(answer);

function dfs(n, m) {
  // 모든 열을 끝마치고 행을 증가시킨다.
  if (n === N) {
    answer = Math.max(answer, calc());
    return;
  }

  // 마지막 열까지 오면 행을 증가시킨다.
  if (m === M) {
    dfs(n + 1, 0);
    return;
  }

  // 가로, 세로 각각 수행
  // 무조건 왼쪽에서 오른쪽, 위에서 아래
  visited[n][m] = true;
  dfs(n, m + 1);
  visited[n][m] = false;
  dfs(n, m + 1);
}

function calc() {
  let result = 0;

  // 가로
  for (let i = 0; i < N; i++) {
    let sum = 0;
    for (let j = 0; j < M; j++) {
      if (visited[i][j]) {
        sum = sum * 10 + board[i][j];
      } else {
        result += sum;
        sum = 0;
      }
    }
    result += sum;
  }

  // 세로
  for (let j = 0; j < M; j++) {
    let sum = 0;
    for (let i = 0; i < N; i++) {
      if (!visited[i][j]) {
        sum = sum * 10 + board[i][j];
      } else {
        result += sum;
        sum = 0;
      }
    }
    result += sum;
  }

  return result;
}
