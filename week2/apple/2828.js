//1: N과 M
//2: 떨어지는 사과의 개수 (1 ≤ J ≤ 20)
//3: J개 줄에는 사과가 떨어지는 위치가 순서대로 주어진다.
//출력: 모든 사과를 담기 위해 바구니가 이동해야 하는 거리의 최솟값 출력

const fs = require("fs");
const input = fs.readFileSync("./week2/run/input.txt").toString().trim().split("\n");

const [n, m] = input[0].split(" ").map(Number);
const num = parseInt(input[1]);

let start = 1;
let end = start + m;
let answer = 0;

for (let i = 2; i < 2 + num; i++) {
    const a = parseInt(input[i]);

    if (a >= start && a < end) {
        // 바구니가 이미 사과를 포함하는 경우 이동할 필요 없음
        continue;
    } else if (a < start) {
        // 사과가 바구니의 왼쪽에 있는 경우
        answer += start - a;
        start = a;
        end = start + m;
    } else {
        // 사과가 바구니의 오른쪽에 있는 경우
        answer += a + 1 - end;
        end = a + 1;
        start = end - m;
    }
}

console.log(answer);
