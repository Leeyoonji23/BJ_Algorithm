const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = parseInt(input[0]);
const M = parseInt(input[1]);

const graph = Array.from({ length: N + 1 }, () => []);

for (let i = 2; i < 2 + M; i++) {
  const [a, b] = input[i].split(' ').map(Number);
  graph[a].push(b);
  graph[b].push(a); // 무방향 연결
}

const visited = Array(N + 1).fill(false);
let count = 0;

function dfs(v) {
  visited[v] = true;

  for (const next of graph[v]) {
    if (!visited[next]) {
      count++;
      dfs(next);
    }
  }
}

dfs(1);
console.log(count);