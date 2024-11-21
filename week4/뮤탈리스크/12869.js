const fs = require("fs");
const input = fs
  .readFileSync("./week4/run/input.txt")
  .toString()
  .trim()
  .split("\n");
const N = Number(input[0]);
const SCV = input[1].split(" ").map(Number);

if (N == 2) {
  SCV.push(0);
} else if (N == 1) {
  SCV.push(0);
  SCV.push(0);
}

const dx = [9, 3, 9, 3, 1, 1];
const dy = [3, 9, 1, 1, 9, 3];
const dz = [1, 1, 3, 9, 3, 9];
let memo = Array.from(Array(61), () =>
  Array.from(Array(61), () => Array(61).fill(Infinity))
);

function mutal(scv1, scv2, scv3) {
  if (scv1 < 0) scv1 = 0;
  if (scv2 < 0) scv2 = 0;
  if (scv3 < 0) scv3 = 0;

  if (scv1 == 0 && scv2 == 0 && scv3 == 0) {
    return 0;
  }

  let ret = memo[scv1][scv2][scv3];

  if (ret != Infinity) {
    return ret;
  }

  for (let i = 0; i < 6; i++) {
    ret = Math.min(ret, mutal(scv1 - dx[i], scv2 - dy[i], scv3 - dz[i]) + 1);
  }
  memo[scv1][scv2][scv3] = ret;
  return ret;
}

const answer = mutal(SCV[0], SCV[1], SCV[2]);
console.log(answer);
