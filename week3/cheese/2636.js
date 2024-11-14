//bfs
//1. 치즈 녹이기 
//visited를 통해 이미 방문한 곳인지 확인
//녹이는 치즈를 0으로 바꾸고 그 치즈는 bfs 에 넣으면 안됨.
//2. 남은 치즈의 개수 세기
//-> filter, reduce 를 사용해서 1의 개수 세기
//3. 시간을 1시간으로 늘리기
//4. 남은 치즈의 개수가 0이면 종료

const fs = require('fs');
const input = fs.readFileSync("./week3/run/input.txt").toString().trim().split('\n');

let n = 0, m = 0;
let count = -1;
const map = [];

function cheezeCount(arr) {
    return arr.reduce((pre, cur) => pre += cur.filter((a) => a === 1).length, 0);
}

function checkMeltCheeze(arr) {
    const queue = [[0,0]];
    const dx = [1, -1, 0, 0];
    const dy = [0, 0, 1, -1];
    const visited = Array.from(Array(n), () => new Array(m).fill(false));
    let meltCheezeCnt = 0;
    visited[0][0] = true;

    while(queue.length > 0) {
        const [startX, startY] = queue.shift();
        
        for(let i = 0; i < 4; i++) {
            const nextX = startX + dx[i];
            const nextY = startY + dy[i];
            
            if(0 <= nextX && nextX < n && 0 <= nextY && nextY < m) {
                if(!visited[nextX][nextY]) {
                    visited[nextX][nextY] = true;
                    // 치즈 녹이는 경우
                    if(arr[startX][startY] === 0 && arr[nextX][nextY] === 1) {
                        arr[nextX][nextY] = 0;
                        meltCheezeCnt++;
                    } else {
                        queue.push([nextX, nextY]);
                    }
                }
            }
        }
    }
    return meltCheezeCnt;
}

[n, m] = input.shift().split(' ').map(Number);
input.forEach(line => map.push(line.split(' ').map(Number)));

let cheezeCnt = cheezeCount(map);
let time = 0;
let cheeze = 0;

//cheezCnt가 0이 될 때까지 치즈 녹이는 작업 반복

while(cheezeCnt > 0) {
    cheeze = checkMeltCheeze(map); // 현재 단계에서 녹는 치즈 개수
    cheezeCnt = cheezeCount(map); // 남아있는 치즈 개수 업데이트
    time++;
}

console.log(time);
console.log(cheeze);
