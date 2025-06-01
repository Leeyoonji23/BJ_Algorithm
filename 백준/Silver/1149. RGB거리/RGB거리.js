const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +input[0];
const cost = input.slice(1).map(line => line.split(' ').map(Number));

// DP 테이블: dp[i][j] = i번째 집을 j색으로 칠했을 때 최소비용
const dp = Array.from({ length: N }, () => Array(3).fill(0));

// 초기값
dp[0][0] = cost[0][0]; // 빨강
dp[0][1] = cost[0][1]; // 초록
dp[0][2] = cost[0][2]; // 파랑

// 점화식 적용
for (let i = 1; i < N; i++) {
  dp[i][0] = cost[i][0] + Math.min(dp[i - 1][1], dp[i - 1][2]); // 이전 집이 초록 또는 파랑
  dp[i][1] = cost[i][1] + Math.min(dp[i - 1][0], dp[i - 1][2]); // 이전 집이 빨강 또는 파랑
  dp[i][2] = cost[i][2] + Math.min(dp[i - 1][0], dp[i - 1][1]); // 이전 집이 빨강 또는 초록
}

console.log(Math.min(...dp[N - 1]));