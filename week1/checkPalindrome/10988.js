//팰린드롬 찾기
//알파벳 소문자로만 이루어진 단어가 주어짐. 이게 긴지 아닌지 확인해라
//팰린드롬이면 ->1 아니면 -> 0 출력
//ex) level -> 1


const fs = require("fs");
const input = fs.readFileSync('./week1/run/input.txt').toString().trim(); 

const word = input.split(""); // 파일에서 읽어온 문자열을 배열로 변환

if (word.join("") === word.reverse().join("")) { // 원래 배열과 뒤집은 배열이 같은지 비교
    console.log(1);
} else {
    console.log(0);
}