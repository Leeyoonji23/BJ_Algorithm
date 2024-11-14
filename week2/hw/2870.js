//문자열 주어지면 숫자 모아서 오름차순으로 출력하기

const fs = require("fs");
const input = fs.readFileSync("./week2/run/input.txt").toString().trim().split("\n");

const answer = [];
const numTests = parseInt(input[0], 10);
const reg = /[^0-9]+/;

for (let i = 1; i <= numTests; i++) {
    const line = input[i];
    
    // 숫자가 아닌 문자들을 기준으로 분리하여 숫자 문자열 배열 생성
    const numbers = line.split(reg);
    
    // 숫자가 있는 경우 BigInt로 변환하여 배열에 추가
    numbers.forEach(num => {
        if (num !== "") {
            answer.push(BigInt(num));
        }
    });
}

// 오름차순 정렬
answer.sort((a, b) => (a > b ? 1 : -1));
answer.forEach(num => console.log(num.toString()));
