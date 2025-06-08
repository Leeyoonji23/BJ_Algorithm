const fs = require('fs');
const n = +fs.readFileSync('/dev/stdin').toString().trim();

let answer = 0;
const col = Array(n).fill(false);      // 같은 열에 퀸이 있는지
const diag1 = Array(2 * n).fill(false); // 왼쪽 위 ↘ 대각선 (row + col)
const diag2 = Array(2 * n).fill(false); // 오른쪽 위 ↙ 대각선 (row - col + n)

function dfs(row) {
  if (row === n) {
    answer++;
    return;
  }

  for (let c = 0; c < n; c++) {
    if (!col[c] && !diag1[row + c] && !diag2[row - c + n]) {
      col[c] = diag1[row + c] = diag2[row - c + n] = true;
      dfs(row + 1);
      col[c] = diag1[row + c] = diag2[row - c + n] = false;
    }
  }
}

dfs(0);
console.log(answer);