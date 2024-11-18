//입력된 수 N번째로 나오는 "666"이 포함된 숫자를 찾음.
//num을 1씩 늘려가면서 num내에 연속된 666이 존재할 때마다 카운트를 증가시켜 목표한 카운트(n)에 도달할 때까지 반복하기


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