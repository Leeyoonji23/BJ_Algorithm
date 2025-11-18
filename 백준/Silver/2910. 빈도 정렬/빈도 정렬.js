//빈도 정렬

const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [N, C] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

const map = new Map();
let order = 0;

for (const num of arr) {
  if (!map.has(num)) {
    map.set(num, { count: 0, order: order++ });
  }
  map.get(num).count++;
}

const sorted = Array.from(map.entries())
  .sort((a, b) => {
    const [numA, infoA] = a;
    const [numB, infoB] = b;
    if (infoA.count !== infoB.count) {
      return infoB.count - infoA.count; // 빈도 내림차순
    }
    return infoA.order - infoB.order; // 등장 순서 오름차순
  })
  .flatMap(([num, info]) => Array(info.count).fill(num));

console.log(sorted.join(" "));
