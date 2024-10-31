//알파벳 소문자로만 이루어진 단어 S
//각 알파벳이 단어에 몇 개가 포함되어 있냐?
// 그니까... 이게 a가 몇 갠지, b가 몇 갠지..등등

const input = require("fs").readFileSync("/dev/stdin").toString().trim(); 

const alphabet = "abcdefghijklmnopqrstuvwxyz";
const count = new Array(26).fill(0); // 알파벳 개수 저장하는 배열

// 문자열의 각 문자에 접근하여 알파벳 개수 세기
for (let char of input) {
    count[alphabet.indexOf(char)]++;
}

console.log(count.join(" "));
