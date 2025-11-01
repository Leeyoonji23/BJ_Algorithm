//팰린드롬인지 확인하기
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split("\n");

const word = input[0];
const reversedWord = word.split("").reverse().join("");

if (word === reversedWord) {
  console.log(1);
} else {
  console.log(0);
}
