//확통..?
const fs = require("fs");
const input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let number = 0;
for (let i = 1; i <= +input[0]; i++) {
  let obj = {};
  let t = +input[++number];
  for (let j = 1; j <= t; j++) {
    input[j + number] = input[j + number].split(" ");
    let cloth = input[j + number][0];
    let kinds = input[j + number][1];
    if (obj[kinds]) {
      obj[kinds].push(cloth);
    } else {
      obj[kinds] = [cloth];
    }
  }

  number += t;

  let count = 1;
  for (let key in obj) {
    count *= obj[key].length + 1;
  }
  console.log(count - 1);
}
