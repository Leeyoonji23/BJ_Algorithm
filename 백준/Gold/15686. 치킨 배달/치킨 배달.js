const fs = require("fs");
const input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const graph = input.map((v) => v.split(" ").map(Number));
const houses = [];
const chickens = [];

//집 주소와 치킨집 주소 houses 배열, chickens 배열에 push;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (graph[i][j] === 1) houses.push([i, j]);
    else if (graph[i][j] === 2) chickens.push([i, j]);
  }
}

//선택된 치킨집에 대한 치킨거리를 구하고, 총합인 도시의 치킨거리를 구한다.
function getDistance() {
  let total = 0;
  for (let i = 0; i < houses.length; i++) {
    let min = Number.MAX_SAFE_INTEGER; //해당 집에 대한 치킨거리
    for (let j = 0; j < chickens.length; j++) {
      if (visited[j] == true) {
        //가장 작은 값이 해당 집에 대한 치킨 거리임 !
        min = Math.min(
          min,
          Math.abs(houses[i][0] - chickens[j][0]) +
            Math.abs(houses[i][1] - chickens[j][1])
        );
      }
    }
    total += min; //각 집이 구한 치킨 거리를 total에 누적
  }
  return total; //도시의 치킨거리
}

const visited = new Array(chickens.length).fill(false);
let answer = Number.MAX_SAFE_INTEGER;
//dfs를 이용해서 M개의 치킨집을 선정하는 모든 경우를 탐색한다.
function dfs(idx, L) {
  if (L === M) {
    answer = Math.min(answer, getDistance()); //vistied의 상태가 true인 치킨 집들이 선정된 것임
    return;
  } else {
    for (let i = idx; i < chickens.length; i++) {
      if (visited[i] === true) continue;
      visited[i] = true;
      dfs(i, L + 1);
      visited[i] = false;
    }
  }
}
dfs(0, 0);
console.log(answer);
