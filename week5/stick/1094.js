const fs = require("fs");

const input = require("fs")
  .readFileSync("./week5/run/input.txt")
  .toString()
  .trim()
  .split("\n");

let X = +input;
let answer = 0;

while (X > 0) {
  if (X % 2) answer++;
  X = parseInt(X / 2);
}

answer = answer <= 0 ? 1 : answer;
console.log(answer);
