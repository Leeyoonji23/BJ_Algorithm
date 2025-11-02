//ROT13
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin", "utf-8");

let result = "";
for (let i = 0; i < input.length; i++) {
  const char = input[i];
  const code = char.charCodeAt(0);

  if (code >= 65 && code <= 90) {
    // 대문자 A-Z
    result += String.fromCharCode(((code - 65 + 13) % 26) + 65);
  } else if (code >= 97 && code <= 122) {
    // 소문자 a-z
    result += String.fromCharCode(((code - 97 + 13) % 26) + 97);
  } else {
    // 알파벳이 아닌 경우 그대로
    result += char;
  }
}

console.log(result);
