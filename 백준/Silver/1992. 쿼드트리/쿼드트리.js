//분할정복
//영역 내 모든 숫자가 0 or 1 로 동일 -> 해당 값 출력
//아니면 영역을 4분면으로 쪼개기 -> 0 or 1로 동일한지 확인

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = parseInt(input[0]);
const video = input.slice(1).map(line => line.split("").map(Number));

function quadtree(n, vlist) {
    let sum = 0;
    for (let i = 0; i < vlist.length; i++) {
        sum += vlist[i].reduce((acc, val) => acc + val, 0);
    }
    
    if (sum === n * n) {
        return '1';
    }
    if (sum === 0) {
        return '0';
    }
    
    const half = Math.floor(n / 2);
    let result = '(';
    result += quadtree(half, vlist.slice(0, half).map(row => row.slice(0, half)));
    result += quadtree(half, vlist.slice(0, half).map(row => row.slice(half)));
    result += quadtree(half, vlist.slice(half).map(row => row.slice(0, half)));
    result += quadtree(half, vlist.slice(half).map(row => row.slice(half)));
    result += ')';
    
    return result;
}

console.log(quadtree(N, video));
