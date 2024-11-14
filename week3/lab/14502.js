//DFS
//1. 좌표 평면에서 0인 좌표중 3개를 골라서 벽을 세운다  (백트래킹으로 조합 구현)
//1-1. 벽 3개를 세운 뒤 바이러스를 확산한다 (DFS)
//1-2. 안전 영역의 갯수를 센다 (중첩 for 문으로 완전 탐색)
//1-3. 안전 영역의 갯수의 최댓값을 갱신한다
//2. 반복 끝나고 안전 영역의 갯수의 최댓값을 리턴

const fs = require("fs");
const input = fs.readFileSync("./week3/run/input.txt").toString().trim().split("\n");

const [n, m] = input.shift().split(" ").map(Number);
const board = input.map((row) => row.split(" ").map(Number));

// 상하좌우 이동을 위한 dx, dy 배열
const dxs = [1, -1, 0, 0];
const dys = [0, 0, 1, -1];
let maxSafeArea = 0; // 안전 영역의 최댓값을 저장할 변수

// 바이러스를 확산시키는 DFS 함수
const spread = (map, y, x) => {
  const stack = [[y, x]];
  while (stack.length) {
    const [Y, X] = stack.pop();

    for (let i = 0; i < 4; i++) {
      const [newY, newX] = [Y + dys[i], X + dxs[i]];
      if (
        newY >= 0 &&
        newY < map.length &&
        newX >= 0 &&
        newX < map[0].length &&
        map[newY][newX] === 0
      ) {
        stack.push([newY, newX]);
        map[newY][newX] = 2;
      }
    }
  }
};

// 백트래킹으로 벽 3개를 세우는 함수
const recursive = (map, depth) => {
  if (depth === 3) {
    // 0인 좌표 3개를 1로 만든 상태에서 바이러스 확산 실행
    const virusPosArr = getVirusPos(map);
    const newMap = map.map((row) => [...row]); // 깊은 복사
    virusPosArr.forEach((pos) => spread(newMap, ...pos));
    maxSafeArea = Math.max(maxSafeArea, countSafeArea(newMap));
    return;
  }

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] === 0) {
        map[i][j] = 1;
        recursive(map, depth + 1);
        map[i][j] = 0;
      }
    }
  }
};

// 바이러스 좌표들을 배열로 반환하는 함수
const getVirusPos = (map) => {
  const posList = [];
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] === 2) posList.push([i, j]);
    }
  }
  return posList;
};

// 안전 영역의 개수를 세는 함수
const countSafeArea = (map) => {
  let safeArea = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] === 0) safeArea++;
    }
  }
  return safeArea;
};

// 초기 호출
recursive(board, 0);
console.log(maxSafeArea);
