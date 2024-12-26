const input = require("fs")
  .readFileSync("./week6/run/input.txt")
  .toString()
  .trim()
  .split("\n");

// 첫 번째 줄: n 값
const n = parseInt(input[0]);

// 소들에 대한 정보를 arr 배열에 저장
const arr = [];
for (let i = 1; i <= n; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  arr.push([a, b]);
}

// 소들을 빨리 도착한 순서대로 정렬
arr.sort((a, b) => a[0] - b[0]);

let time = 0;

for (let i = 0; i < arr.length; i++) {
  if (time > arr[i][0]) {
    // 이전 소가 검문을 받고 있는 중에 도착했을 때
    time += arr[i][1];
  } else {
    // 이전 소가 검문을 다 받은 후 도착했을 때
    time = arr[i][0] + arr[i][1];
  }
}

// 결과 출력
console.log(time);
