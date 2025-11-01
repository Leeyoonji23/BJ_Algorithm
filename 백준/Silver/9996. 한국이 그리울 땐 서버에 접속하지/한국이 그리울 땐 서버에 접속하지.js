//한국이 그리울 땐 서버에 접속하지

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split("\n");

const N = Number(input[0]);
const pattern = input[1];

// 별표(*) 위치 찾기
const starIndex = pattern.indexOf("*");
const prefix = pattern.substring(0, starIndex); // 별표 앞부분
const suffix = pattern.substring(starIndex + 1); // 별표 뒷부분

for (let i = 0; i < N; i++) {
  const word = input[i + 2];

  // 파일 이름이 별표 앞부분으로 시작하고, 별표 뒷부분으로 끝나야 함
  // 그리고 파일 이름의 길이가 앞부분과 뒷부분을 합친 것보다 길거나 같아야 함
  if (
    word.length >= prefix.length + suffix.length &&
    word.startsWith(prefix) &&
    word.endsWith(suffix)
  ) {
    console.log("DA");
  } else {
    console.log("NE");
  }
}
