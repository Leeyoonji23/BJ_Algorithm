const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");

const [N, K] = input[0].split(" ").map(Number);
const coins = input.slice(1).map(Number);

let count = 0;
let amount = K;

for (let i = N - 1; i >= 0; i--) {
  const coin = coins[i];
  if (coin <= amount) {
    const use = Math.floor(amount / coin);
    count += use;
    amount -= coin * use;
  }
}

console.log(count);
