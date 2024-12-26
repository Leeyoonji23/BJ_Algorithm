//그저... Your task is to decide if a given graph is a tree or not.
//트리인지 아닌지 확인해라 문제

//간선의 개수= 노드개수 +1
//모든 노드는 이어져 있어야 함.

//ㄹㅈㄷ 런타임에러

const input = require("fs")
  .readFileSync("./week6/run/input.txt")
  .toString()
  .trim()
  .split("\n");

// DFS 
function func(node, graph, visited) {
  visited[node] = true;

  for (const next of graph[node] || []) {
    if (!visited[next]) {
      func(next, graph, visited);
    }
  }
}

const T = parseInt(input[0]); 
let index = 1;
let result = [];

for (let t = 0; t < T; t++) {
  const N = parseInt(input[index++]); // 정점 수
  const M = parseInt(input[index++]); // 간선 수

  const graph = Array.from({ length: N + 1 }, () => []);
  const visited = Array(N + 1).fill(false);
  
  //간선 정보보
  for (let i = 0; i < M; i++) {
    const [A, B] = input[index++].split(" ").map(Number);
    graph[A].push(B);
    graph[B].push(A);
  }

  let cnt = 0; 

  // 모든 노드를 탐색색
  for (let node = 1; node <= N; node++) {
    if (!visited[node]) {
      func(node, graph, visited);
      cnt++;
    }
  }

  // 트리 조건확인
  result.push(N === M + 1 && cnt === 1 ? "tree" : "graph");
}

console.log(result.join("\n"));
