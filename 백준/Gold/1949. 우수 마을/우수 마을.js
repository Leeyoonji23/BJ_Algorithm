const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const n = +input[0];
const population = [0, ...input[1].split(' ').map(Number)];
const tree = Array.from({ length: n + 1 }, () => []);
const dp = Array.from({ length: n + 1 }, () => [0, 0]);
const visited = Array(n + 1).fill(false);

for (let i = 2; i < input.length; i++) {
  const [a, b] = input[i].split(' ').map(Number);
  tree[a].push(b);
  tree[b].push(a);
}

function dfs(node) {
  visited[node] = true;
  dp[node][0] = 0; // node가 우수 마을이 아닌 경우
  dp[node][1] = population[node]; // node가 우수 마을인 경우

  for (const next of tree[node]) {
    if (!visited[next]) {
      dfs(next);
      dp[node][0] += Math.max(dp[next][0], dp[next][1]);
      dp[node][1] += dp[next][0];
    }
  }
}

dfs(1);

console.log(Math.max(dp[1][0], dp[1][1]));