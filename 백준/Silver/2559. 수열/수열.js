//누적 합
//투 포인터

const fs = require("fs");
const input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);
const data = input[1].split(" ").map(Number);

// 누적 합 계산
const prefixSum = new Array(N + 1).fill(0);
for (let i = 1; i <= N; i++) {
  prefixSum[i] = prefixSum[i - 1] + data[i - 1];
}

// K 크기 구간의 최대 합 계산
let max = Number.MIN_SAFE_INTEGER;
for (let i = K; i <= N; i++) {
  max = Math.max(max, prefixSum[i] - prefixSum[i - K]);
}

console.log(max);
