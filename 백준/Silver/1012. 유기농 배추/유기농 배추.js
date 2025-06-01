const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let idx = 0;
const T = +input[idx++];
const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

function dfs(x, y, field, visited, M, N) {
  visited[y][x] = true;

  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (
      nx >= 0 && nx < M &&
      ny >= 0 && ny < N &&
      field[ny][nx] === 1 &&
      !visited[ny][nx]
    ) {
      dfs(nx, ny, field, visited, M, N);
    }
  }
}

for (let t = 0; t < T; t++) {
  const [M, N, K] = input[idx++].split(' ').map(Number);
  const field = Array.from({ length: N }, () => Array(M).fill(0));
  const visited = Array.from({ length: N }, () => Array(M).fill(false));

  for (let i = 0; i < K; i++) {
    const [x, y] = input[idx++].split(' ').map(Number);
    field[y][x] = 1;
  }

  let count = 0;
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (field[y][x] === 1 && !visited[y][x]) {
        dfs(x, y, field, visited, M, N);
        count++;
      }
    }
  }

  console.log(count);
}