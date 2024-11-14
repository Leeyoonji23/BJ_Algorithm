//빈도조사
//그냥,,, 등장 빈도가 높은 순서대로 정렬, 등장 빈도 같으면 등장 순서대로 정렬
//-> 각 숫자의 등장 빈도를 기록, 해당 객체를 정렬

const fs = require('fs');
const input = fs.readFileSync("./week2/run/input.txt").toString().trim().split('\n');

const [N, C] = input[0].split(' ').map(Number);
const numbers = input[1].split(' ').map(Number);

// 등장 횟수를 기록할 객체 생성
const D = {};

// 등장 횟수 기록
numbers.forEach(number => {
  D[number] = (D[number] || 0) + 1;
});

// 객체를 배열로 변환 후 등장 횟수 기준으로 정렬
const items = Object.entries(D).sort((a, b) => b[1] - a[1]);

// 결과 출력
let result = [];
items.forEach(([key, value]) => {
  for (let i = 0; i < value; i++) {
    result.push(key);
  }
});

console.log(result.join(' '));
