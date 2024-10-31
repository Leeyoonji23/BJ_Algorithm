//주몽... 철기군 양성 프로젝트
//갑옷을 만드는 재료들은 각각 고유한 번호를 가지고 있음.
//갑옷은 두 가지의 재료로 만듦
// 두 재료의 고유한 번호를 합쳐서 M(1<= M <= 10,000,000) 이 되면 됨

//N(1<=N <+ 15,000) 개의 재료와 M이 주어졌을 때 몇 개의 갑옷을 만들 수 있니?

//첫째 줄에는 재료의 개수 N(1 ≤ N ≤ 15,000)
//두 번째 줄에는 갑옷을 만드는데 필요한 수 M(1 ≤ M ≤ 10,000,000) 
//셋째 줄에는 N개의 재료들이 가진 고유한 번호들이 공백을 사이에 두고 주어진다
//고유한 번호는 100,000보다 작거나 같은 자연수이다.


const input = require("fs").readFileSync('./week1/run/input.txt').toString().trim().split("\n");
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