const fs = require("fs");
const input = fs
  .readFileSync("./week5/run/input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);
const people = [0, ...input[1].split(" ").map(Number)];
const adjList = Array.from({ length: n + 1 }, () => []);
const fullStat = (1 << (n + 1)) - 1;
let answer = Infinity;
const set = new Set();

// 인접 리스트 초기화
for (let i = 2; i < input.length; i++) {
  const [count, ...neighbors] = input[i].split(" ").map(Number);
  neighbors.forEach((neighbor) => {
    adjList[i - 1].push(neighbor);
  });
}

// DFS
function dfs(idx, cost, r, stat) {
  if (r === 0) {
    if (!set.has(stat)) {
      set.add(stat);
      getDiff(stat);
    }
    return;
  }

  for (let i = idx; i < n; i++) {
    stat |= 1 << (i + 1); // i+1번 구역 추가
    dfs(i + 1, cost + people[i + 1], r - 1, stat);
    stat ^= 1 << (i + 1); // 원래 상태로 복원
  }
}

// 두 그룹의 차이 계산
function getDiff(stat) {
  const a = stat;
  const b = fullStat ^ a;

  const aCost = linkTesting(a);
  const bCost = linkTesting(b);

  if (aCost !== -1 && bCost !== -1) {
    answer = Math.min(answer, Math.abs(aCost - bCost));
  }
}

// 연결성 테스트
function linkTesting(stat) {
  const city = [];
  for (let i = 1; i <= n; i++) {
    if ((stat & (1 << i)) === 1 << i) {
      city.push(i);
    }
  }

  const visited = Array(n + 1).fill(false);
  const queue = [city[0]];
  visited[city[0]] = true;

  let cost = 0;
  while (queue.length) {
    const cur = queue.shift();
    cost += people[cur];

    for (const next of adjList[cur]) {
      if (!visited[next] && city.includes(next)) {
        visited[next] = true;
        queue.push(next);
      }
    }
  }

  for (const node of city) {
    if (!visited[node]) return -1; // 연결되지 않은 노드가 존재
  }

  return cost;
}

// 메인
for (let i = 0; i < n - 1; i++) {
  const stat = 1 << 1; // 초기 상태: 첫 번째 구역 포함
  dfs(1, people[1], i, stat);
}

console.log(answer === Infinity ? -1 : answer);
