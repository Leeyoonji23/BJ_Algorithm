

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split('\n');



const [m, n, k] = input[0].split(" ").map(Number);
const arr = Array.from({ length: n }, () => Array(m).fill(0));

// 좌표 생성
for (let i = 1; i <= k; i++) {
    const [x1, y1, x2, y2] = input[i].split(" ").map(Number);
    for (let x = x1; x < x2; x++) {     // 왼쪽 위 꼭짓점부터
        for (let y = y1; y < y2; y++) { // 오른쪽 아래 꼭짓점까지
            arr[x][y] = 1;
        }
    }
}

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

// DFS 함수
function dfs(x, y) {
    arr[x][y] = 1; // 방문 표시
    let cnt = 1;

    for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (nx >= 0 && nx < n && ny >= 0 && ny < m && arr[nx][ny] === 0) {
            cnt += dfs(nx, ny); // 재귀 호출한 결과를 cnt에 더함
        }
    }
    return cnt;
}

const answer = [];

for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
        if (arr[i][j] === 0) {
            answer.push(dfs(i, j));
        }
    }
}

answer.sort((a, b) => a - b);
console.log(answer.length);
console.log(answer.join(" "));