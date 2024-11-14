const fs = require("fs");
 
const input = fs.readFileSync("./week3/run/input.txt").toString().trim().split("\n");
 
const N = parseInt(input);
 
let count = 0; // 종말의 수 개수
let num = 0; // 현재 검사 중인 수
 
// N보다 작을 때 까지 종말의 수 찾기
// num을 1씩 증가시키면서 num을 문자열로 변환했을 때 '666'이 포함되어있다면 count 증가시키기
while (count < N) {
  num++;
  if (String(num).includes("666")) {
    count++;
  }
}
console.log(num);