//비트마스킹

const fs = require("fs");
const input = require("fs")
  .readFileSync("./week5/run/input.txt")
  .toString()
  .trim()
  .split("\n");

const [M, N] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((line) => line.split(" ").map(Number));

// 방향은 8, 4, 2, 1 순서로 남, 동, 북, 서
const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

const bfs = (a, b, arr, visited, roomNum) => {
  const queue = [];
  queue.push([a, b]);
  visited[a][b] = roomNum;
  let roomSize = 1;

  while (queue.length > 0) {
    const [x, y] = queue.shift();
    let info = arr[x][y].toString(2).padStart(4, "0"); // 2진수로 변환하고 4자리로 맞추기

    for (let k = 0; k < 4; k++) {
      const bit = info[k];
      const nx = x + dx[k];
      const ny = y + dy[k];

      if (bit === "0") {
        // 벽이 아니면
        if (nx >= 0 && nx < N && ny >= 0 && ny < M && !visited[nx][ny]) {
          visited[nx][ny] = roomNum;
          queue.push([nx, ny]);
          roomSize++;
        }
      } else if (bit === "1") {
        // 벽이면
        if (nx >= 0 && nx < N && ny >= 0 && ny < M && visited[nx][ny]) {
          if (visited[nx][ny] !== roomNum) {
            roomDict[visited[nx][ny]].add(roomNum);
            roomDict[roomNum].add(visited[nx][ny]);
          }
        }
      }
    }
  }
  return roomSize;
};

const visited = Array.from({ length: N }, () => Array(M).fill(0));
let roomCount = 0; // 방의 개수
const roomDict = {}; // 인접한 방의 정보
const roomInfo = {}; // 각 방의 크기

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (!visited[i][j]) {
      roomCount++;
      if (!roomDict[roomCount]) roomDict[roomCount] = new Set();
      const size = bfs(i, j, arr, visited, roomCount);
      roomInfo[roomCount] = size;
    }
  }
}

// 벽 하나 제거 시 가장 큰 방의 크기 구하기
let breakMax = 0;
for (const a in roomDict) {
  for (const b of roomDict[a]) {
    breakMax = Math.max(breakMax, roomInfo[a] + roomInfo[b]);
  }
}

// 방의 개수, 가장 큰 방의 크기, 벽 하나 제거 시 가장 큰 방의 크기
console.log(roomCount);
console.log(Math.max(...Object.values(roomInfo)));
console.log(breakMax);
