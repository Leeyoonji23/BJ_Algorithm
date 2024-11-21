const fs = require("fs");
const input = fs
  .readFileSync("./week4/run/input.txt")
  .toString()
  .trim()
  .split("\n");
class Queue {
  constructor() {
    this.items = {};
    this.head = 0;
    this.tail = 0;
  }
  enqueue(element) {
    this.items[this.tail] = element;
    this.tail++;
  }
  dequeue() {
    const element = this.items[this.head];
    delete this.items[this.head];
    this.head++;
    return element;
  }
  getLength() {
    return this.tail - this.head;
  }
}

// n x n 크기의 땅, l <= 차이 <= r
let [n, l, r] = input[0].split(" ").map(Number);
// 인구 정보
let graph = [];
for (let i = 1; i <= n; i++) {
  graph.push(input[i].split(" ").map(Number));
}

function bfs(start, end, graph, visited) {
  queue = new Queue();
  queue.enqueue([start, end]);
  visited[start][end] = true;

  let curUnited = [[start, end]];
  while (queue.getLength() != 0) {
    let [x, y] = queue.dequeue();

    for (let dx of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      let [nx, ny] = [x + dx[0], y + dx[1]];

      if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;

      if (!visited[nx][ny]) {
        let dist = Math.abs(graph[x][y] - graph[nx][ny]);
        // 인구 수의 차가 조건에 만족하면 연합 정보에 넣기
        if (l <= dist && dist <= r) {
          visited[nx][ny] = true;
          queue.enqueue([nx, ny]);
          curUnited.push([nx, ny]);
        }
      }
    }
  }
  return curUnited;
}

// 인구 이동 기간
let days = 0;

while (true) {
  // 방문 정보
  let visited = new Array(n).fill().map((_) => new Array(n).fill(false));

  // 연합 정보
  let united = [];

  // 모든 나라를 순회하면서 BFS 진행
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (!visited[i][j]) {
        let curUnited = bfs(i, j, graph, visited);
        if (curUnited.length != 0) united.push(curUnited);
      }
    }
  }

  // 더이상 인구이동 할 게 없으면 중단
  let result = united.reduce((acc, cur) => acc * cur.length, 1);
  if (result == 1) break;

  // 인구 이동
  for (let un of united) {
    let sumValue = un.reduce((acc, cur) => acc + graph[cur[0]][cur[1]], 0);
    let count = parseInt(sumValue / un.length);
    for (let nation of un) {
      graph[nation[0]][nation[1]] = count;
    }
  }

  days++;
}
console.log(days);
