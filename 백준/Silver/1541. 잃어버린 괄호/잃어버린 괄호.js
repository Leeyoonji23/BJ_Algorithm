const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().trim();

// '-' 기준으로 쪼갬
const parts = input
  .split("-")
  .map((expr) => expr.split("+").reduce((sum, num) => sum + Number(num), 0));

// 첫 번째 항은 무조건 더함, 이후 항부터는 빼줌
let result = parts[0];
for (let i = 1; i < parts.length; i++) {
  result -= parts[i];
}

console.log(result);
