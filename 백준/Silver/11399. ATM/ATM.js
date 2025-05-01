const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");

const n = Number(input[0]);
const times = input[1].split(" ").map(Number);

// 오름차순 정렬
times.sort((a, b) => a - b);

let totalTime = 0;
let accumulatedTime = 0;

for (let i = 0; i < n; i++) {
  accumulatedTime += times[i];
  totalTime += accumulatedTime;
}

console.log(totalTime);
