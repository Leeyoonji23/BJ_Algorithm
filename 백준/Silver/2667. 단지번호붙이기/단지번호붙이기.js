const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +input[0];
const map = input.slice(1).map(line => line.split('').map(Number));
const visited = Array.from({ length: N }, () => Array(N).fill(false));
const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];
const result = [];

function dfs(x, y) {
  let count = 1;
  visited[y][x] = true;

  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (
      nx >= 0 && nx < N &&
      ny >= 0 && ny < N &&
      !visited[ny][nx] &&
      map[ny][nx] === 1
    ) {
      count += dfs(nx, ny);
    }
  }

  return count;
}

// 모든 칸을 돌며 집이 있고 방문 안 했으면 dfs 시작
for (let y = 0; y < N; y++) {
  for (let x = 0; x < N; x++) {
    if (map[y][x] === 1 && !visited[y][x]) {
      const houseCount = dfs(x, y);
      result.push(houseCount);
    }
  }
}

result.sort((a, b) => a - b);
console.log(result.length);
console.log(result.join('\n'));