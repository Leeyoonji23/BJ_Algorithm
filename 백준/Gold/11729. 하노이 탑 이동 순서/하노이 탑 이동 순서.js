const fs = require("fs");
const input = +fs.readFileSync("dev/stdin").toString().trim(); 

let result = [];
let count = 0;

function hanoi(n, from, to, via) {
  if (n === 1) {
    result.push(`${from} ${to}`);
    count++;
    return;
  }

  hanoi(n - 1, from, via, to);
  result.push(`${from} ${to}`);
  count++;
  hanoi(n - 1, via, to, from);
}

hanoi(input, 1, 3, 2);

console.log(count);
console.log(result.join("\n"));