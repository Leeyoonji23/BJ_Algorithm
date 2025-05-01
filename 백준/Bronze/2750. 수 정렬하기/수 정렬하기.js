//그저 버블정렬이었다

const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");

const N = +input[0];
const arr = input.slice(1).map(Number);

for (let i = 0; i < N - 1; i++) {
  for (let j = 0; j < N - i - 1; j++) {
    if (arr[j] > arr[j + 1]) {
      [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
    }
  }
}

console.log(arr.join("\n"));
