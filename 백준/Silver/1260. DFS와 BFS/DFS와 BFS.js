const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M, V] = input[0].split(' ').map(Number);
const edges = input.slice(1).map(line => line.split(' ').map(Number));

// 인접 리스트 초기화
const graph = Array.from({ length: N + 1 }, () => []);

for (const [from, to] of edges) {
  graph[from].push(to);
  graph[to].push(from); // 무방향 그래프
}

// 인접 정점 번호 오름차순 정렬
for (let i = 1; i <= N; i++) {
  graph[i].sort((a, b) => a - b);
}

// DFS 구현
const dfsVisited = Array(N + 1).fill(false);
const dfsResult = [];

function dfs(v) {
  dfsVisited[v] = true;
  dfsResult.push(v);

  for (const next of graph[v]) {
    if (!dfsVisited[next]) {
      dfs(next);
    }
  }
}

// BFS 구현
const bfsVisited = Array(N + 1).fill(false);
const bfsResult = [];

function bfs(start) {
  const queue = [start];
  bfsVisited[start] = true;

  while (queue.length) {
    const v = queue.shift();
    bfsResult.push(v);

    for (const next of graph[v]) {
      if (!bfsVisited[next]) {
        bfsVisited[next] = true;
        queue.push(next);
      }
    }
  }
}

// 실행
dfs(V);
bfs(V);

console.log(dfsResult.join(' '));
console.log(bfsResult.join(' '));