const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const unheard = new Set(input.slice(1, N + 1));
const unseen = input.slice(N + 1);

const result = unseen.filter((name) => unheard.has(name)).sort();

console.log(result.length);
console.log(result.join("\n"));
