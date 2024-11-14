//1: 어떤 지역을 나타내는 2차원 배열의 행과 열의 개수를 나타내는 수 N
//2:N개의 각 줄에는 2차원 배열의 첫 번째 행부터 N번째 행까지 순서대로 한 행씩 높이 정보가 입력

//접근방식
//물의 양 조절
//물에 잠기는 영역 확인
//안전한 영역의 개수 체크
//반복문, 배열, BFS? 

const fs = require("fs");
const input = fs.readFileSync("./week2/run/input.txt").toString().trim().split('\n');
const N = parseInt(input[0]);
const graph = input.slice(1).map(line => line.split(" ").map(Number));
const maxRain = Math.max(...graph.flat());

const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];

// BFS 함수
function bfs(i, j, sink) {
    let count = 0;
    const queue = [[i, j]];
    sink[i][j] = true;
    count += 1;

    while (queue.length > 0) {
        const [x, y] = queue.shift();
        for (let k = 0; k < 4; k++) {
            const nx = x + dx[k];
            const ny = y + dy[k];
            if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
            if (!sink[nx][ny]) {
                sink[nx][ny] = true;
                queue.push([nx, ny]);
            }
        }
    }
    return count;
}

function solve() {
    const countList = [];

    for (let rain = 0; rain <= maxRain; rain++) {
        let count = 0;
        const sink = Array.from({ length: N }, () => Array(N).fill(false));

        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                if (graph[i][j] <= rain) sink[i][j] = true;
            }
        }

        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                if (!sink[i][j]) {
                    count += bfs(i, j, sink);
                }
            }
        }

        countList.push(count);
    }

    console.log(Math.max(...countList));
}

solve();