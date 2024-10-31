const fs = require('fs');
const input = fs.readFileSync('/dev/stdin', 'utf8').trim().split('\n');

// 입력 처리
const N = Number(input[0]);
const M = Number(input[1]);
const arr = input[2].split(' ').map(Number);
arr.sort((a, b) => a - b); // 배열을 오름차순으로 정렬

let left = 0;
let right = N - 1;
let count = 0;

while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum < M) {
        left += 1;
    } else if (sum > M) {
        right -= 1;
    } else {
        // 합이 M과 같을 때
        count += 1;
        left += 1;
        right -= 1;
    }
}

console.log(count);
