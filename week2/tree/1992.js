//분할정복
//영역 내 모든 숫자가 0 or 1 로 동일 -> 해당 값 출력
//아니면 영역을 4분면으로 쪼개기 -> 0 or 1로 동일한지 확인

const fs = require("fs");
const input = fs.readFileSync("./week2/run/input.txt").toString().trim().split("\n");

const N = parseInt(input[0]);
const video = input.slice(1).map(line => line.split("").map(Number));

function quadtree(n, vlist) {
    //배열의 모든 원소의 합을 구해서 동일한 숫자로 구성되어 있는지 확인
    let sum = 0;
    for (let i = 0; i < vlist.length; i++) {
        sum += vlist[i].reduce((acc, val) => acc + val, 0);
    }
    // 배열이 모두 1로 구성된 경우 '1' 반환
    if (sum === n * n) {
        return '1';
    }
    //배열이 모두 -으로 구서오딘 경우 '0' 반환
    if (sum === 0) {
        return '0';
    }
    
    const half = Math.floor(n / 2);
    let result = '(';
    //왼쪽 위
    result += quadtree(half, vlist.slice(0, half).map(row => row.slice(0, half)));
    //오른쪽 위
    result += quadtree(half, vlist.slice(0, half).map(row => row.slice(half)));
    //왼쪽 아래
    result += quadtree(half, vlist.slice(half).map(row => row.slice(0, half)));
    //오른쪽 아래
    result += quadtree(half, vlist.slice(half).map(row => row.slice(half)));
    result += ')';
    
    return result;
}

console.log(quadtree(N, video));
