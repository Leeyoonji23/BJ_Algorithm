const fs = require("fs");
const input = fs.readFileSync("./week3/run/input.txt").toString().trim().split("\n");

//주어진 팩토리얼에서 2의 개수, 5의 개수 중 최솟값 찾기
const T = parseInt(input[0]);
let result = [];

for (let i = 1; i <= T; i++) {
    const N = parseInt(input[i]);

    let twoCnt = 0;
    let fiveCnt = 0;

    for (let j = 2; j <= N; j *= 2) {
        twoCnt += Math.floor(N / j);
    }

    for (let j = 5; j <= N; j *= 5) {
        fiveCnt += Math.floor(N / j);
    }

    result.push(Math.min(twoCnt, fiveCnt));
}

console.log(result.join('\n'));
