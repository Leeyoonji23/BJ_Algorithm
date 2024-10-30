// 2309번

//아홉 개의 줄에 걸쳐 난쟁이 키가 주어짐. 키의 합은 100이 안됨
//키는 100을 넘진 않음
//가능한 정답이 여러가지인 경우에는 아무거나 출력(?)



const input = require("fs").readFileSync('./week1/run/input.txt').toString().trim().split("\n");

// 길이가 9인 배열 생성 -> 난쟁이가 9명이니까
const arr = input.map(Number); // 입력을 배열로 변환
let sum = arr.reduce((acc, num) => acc + num, 0); // 난쟁이들의 키 총합

// 키 데이터가 저장된 배열을 오름차순으로 정렬
arr.sort((a, b) => a - b);

let a = -1, b = -1; // 범인 인덱스를 찾기 위한 변수 선언

// 바깥 for문 : 맨 마지막 값까지 갈 필요 없음, 안쪽 for문이 마지막 값을 체크해줌
outer: for (let i = 0; i < arr.length - 1; i++) {
    // 안쪽 for문 : i+1번째 값부터 시작
    for (let j = i + 1; j < arr.length; j++) {
        // 총합에서 두 값을 뺐을 때 100이 되면, 그 두 값이 범인임
        if (sum - arr[i] - arr[j] === 100) {
            a = i;
            b = j;
            break outer; // 범인을 찾으면 바깥 루프까지 완전히 탈출
        }
    }
}

// 범인을 제외한 진짜 일곱 난쟁이 키 출력
for (let i = 0; i < arr.length; i++) {
    // 배열의 9개 인덱스 중에 범인이 아닌 경우에만 출력
    if (i !== a && i !== b) {
        console.log(arr[i]);
    }
}