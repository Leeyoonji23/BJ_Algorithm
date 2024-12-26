const fs = require("fs");
const input = fs
  .readFileSync("./week5/run/input.txt")
  .toString()
  .trim()
  .split("\n");

function pos(now, n, l) {
  const used = new Array(n).fill(false);

  for (let j = 1; j < n; j++) {
    if (Math.abs(now[j] - now[j - 1]) > 1) {
      // 1. 차이가 1만 가능
      return false;
    }
    if (now[j] < now[j - 1]) {
      // 2. 현재 < 이전, 경사로를 만들기 위해 오른쪽을 스캔함(낮은 곳에 경사로 설치)
      for (let k = 0; k < l; k++) {
        // l 만큼 경사로 너비 필요
        if (j + k >= n || used[j + k] || now[j] !== now[j + k]) {
          // 범위 넘어감 or 이미 설치함 or 낮은 곳의 높이가 다른 경우, 그만
          return false;
        }
        if (now[j] === now[j + k]) {
          // 높이가 같은 경우 사용 여부 체크
          used[j + k] = true;
        }
      }
    } else if (now[j] > now[j - 1]) {
      // 3. 현재 > 이전, 경사로를 만들기 위해 왼쪽을 스캔함
      for (let k = 0; k < l; k++) {
        if (j - k - 1 < 0 || now[j - 1] !== now[j - k - 1] || used[j - k - 1]) {
          // 범위 넘어감 or 이미 설치함 or 낮은 곳의 높이가 다른 경우, 그만
          return false;
        }
        if (now[j - 1] === now[j - k - 1]) {
          // 높이가 같은 경우 사용 여부 체크
          used[j - k - 1] = true;
        }
      }
    }
  }
  return true; // 모두 문제없이 설치된 경우 가능함을 출력
}

function solve(n, l, graph) {
  let result = 0;

  // 1. 가로 확인
  for (let i = 0; i < n; i++) {
    if (pos(graph[i], n, l)) {
      // 현재 확인할 길을 넣어준다.
      result++;
    }
  }

  // 2. 세로 확인
  for (let i = 0; i < n; i++) {
    const column = graph.map((row) => row[i]);
    if (pos(column, n, l)) {
      // 현재 확인할 길을 넣어준다.
      result++;
    }
  }

  return result;
}

// 입력 받기
const [n, l] = input[0].split(" ").map(Number); // 첫 번째 줄: n과 l
const graph = input.slice(1).map((line) => line.split(" ").map(Number)); // 나머지 줄: 각 행의 높이

console.log(solve(n, l, graph));
