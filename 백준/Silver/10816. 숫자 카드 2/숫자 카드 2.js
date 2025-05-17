const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(input[0]);
const cards = input[1].split(' ').map(Number);
const M = Number(input[2]);
const targets = input[3].split(' ').map(Number);

// 카운트 맵 생성
const cardCount = new Map();

for (let card of cards) {
  cardCount.set(card, (cardCount.get(card) || 0) + 1);
}

const result = targets.map(target => cardCount.get(target) || 0);
console.log(result.join(' '));