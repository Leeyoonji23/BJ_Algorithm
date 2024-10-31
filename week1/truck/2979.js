//상근이 트럭 세 대
//주차 비용 얼마?
//트럭 수에 따라 주차요금 할인
//1 대 주차 -> 1분당 A원
//2 대 주차 -> 1분에 한 대당 B원 
//3대 주차 -> 1분에 한 대당 C원
//A,B,C 와 주차시간 주어졌을 때 얼마를 내야할까? -> 핵심은 주차 시간
//((1 ≤ C ≤ B ≤ A ≤ 100))

const fs = require('fs');
const input = fs.readFileSync('./week1/run/input.txt', 'utf8').trim().split('\n');

// 주차 요금
const [A, B, C] = input.shift().split(' ').map(Number);

// 각 트럭의 주차 시간 기록
const times = Array(101).fill(0);

function calc(arrival, departure) {
    for (let i = arrival; i < departure; i++) {
        times[i]++;
    }
}

function fair(min, max) {
    let res = 0;
    for (let i = min; i <= max; i++) {
        // 트럭이 한 대 있을 때
        if (times[i] === 1) res += times[i] * A;
        // 트럭이 두 대 있을 때
        else if (times[i] === 2) res += times[i] * B;
        // 트럭이 세 대 있을 때
        else if (times[i] === 3) res += times[i] * C;
    }
    return res;
}

// 트럭의 주차 시간 범위 설정 및 계산
let minTime = Infinity;
let maxTime = -Infinity;

for (let truck = 0; truck < 3; truck++) {
    const [arrival, departure] = input[truck].split(' ').map(Number);
    calc(arrival, departure);
    minTime = Math.min(minTime, arrival);
    maxTime = Math.max(maxTime, departure);
}

// 최종 요금 계산
const result = fair(minTime, maxTime - 1);
console.log(result);