//n x n 크기의 동전판. 동전의 상태는 H (앞면) 또는 T (뒷면)
//행을 뒤집으면 해당 행의 모든 동전이 H → T 또는 T → H
//열별로 H 또는 T의 개수를 계산한 후, 각 열을 뒤집을지 말지를 결정해서 T의 수를 최소로

const input = require("fs")
  .readFileSync("./week5/run/input.txt")
  .toString()
  .trim()
  .split("\n");

const n = parseInt(input[0]);
const coin = input.slice(1).map((row) => row.split(""));

let res = n * n + 1;

for (let bit = 0; bit < 1 << n; bit++) {
  const tmp = coin.map((row) => [...row]);

  // 비트마스크를 기반으로 행 뒤집기
  for (let i = 0; i < n; i++) {
    if (bit & (1 << i)) {
      // i번째 행 뒤집기
      for (let j = 0; j < n; j++) {
        tmp[i][j] = tmp[i][j] === "H" ? "T" : "H";
      }
    }
  }

  let tsum = 0;

  // 각 열을 확인하며 T의 개수를 최소화
  for (let j = 0; j < n; j++) {
    let cnt = 0;
    for (let i = 0; i < n; i++) {
      if (tmp[i][j] === "T") cnt++;
    }
    tsum += Math.min(cnt, n - cnt); // 열을 뒤집을지 여부 결정
  }

  res = Math.min(res, tsum); // 결과 최소값 갱신
}

console.log(res);
