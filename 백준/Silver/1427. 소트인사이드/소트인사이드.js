const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim();

const result = input
  .split("")
  .sort((a, b) => b - a)
  .join("");

console.log(result);