const fs = require("fs");
const input = fs
  .readFileSync("./week4/run/input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const graph = input.slice(1).map((line) => line.split(""));

const directions = [
  [0, 1], // 오른쪽
  [0, -1], // 왼쪽
  [-1, 0], // 위
  [1, 0], // 아래
];

const bfs = (startY, startX) => {
  const queue = [];
  const visited = Array.from({ length: N }, () => Array(M).fill(0));

  queue.push({ y: startY, x: startX });
  visited[startY][startX] = 1;

  let maxDistance = 0;

  while (queue.length) {
    const { y, x } = queue.shift();

    for (const [dy, dx] of directions) {
      const nextY = y + dy;
      const nextX = x + dx;

      if (
        nextY >= 0 &&
        nextY < N &&
        nextX >= 0 &&
        nextX < M &&
        !visited[nextY][nextX] &&
        graph[nextY][nextX] === "L"
      ) {
        visited[nextY][nextX] = visited[y][x] + 1;
        maxDistance = Math.max(maxDistance, visited[nextY][nextX]);
        queue.push({ y: nextY, x: nextX });
      }
    }
  }

  return maxDistance - 1;
};

let maxValue = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (graph[i][j] === "L") {
      maxValue = Math.max(maxValue, bfs(i, j));
    }
  }
}

console.log(maxValue);
