// 보물섬

const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const map = input.slice(1).map((line) => line.split(""));

const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];

// BFS: 특정 위치에서 시작해서 가장 먼 육지까지의 거리 반환
function bfs(startX, startY) {
  const visited = Array.from({ length: N }, () => Array(M).fill(false));
  const queue = [[startX, startY, 0]];
  visited[startX][startY] = true;
  let maxDist = 0;

  while (queue.length > 0) {
    const [x, y, dist] = queue.shift();
    maxDist = Math.max(maxDist, dist);

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (
        nx >= 0 &&
        nx < N &&
        ny >= 0 &&
        ny < M &&
        !visited[nx][ny] &&
        map[nx][ny] === "L"
      ) {
        visited[nx][ny] = true;
        queue.push([nx, ny, dist + 1]);
      }
    }
  }

  return maxDist;
}

let answer = 0;

// 모든 육지에서 BFS 수행하여 최댓값 찾기
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (map[i][j] === "L") {
      const maxDist = bfs(i, j);
      answer = Math.max(answer, maxDist);
    }
  }
}

console.log(answer);
