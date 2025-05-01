//제한된 버블정렬 (S번만 교환 가능), 댠순한 버블정렬 아님!
//1.선택정렬처럼 제일 큰 수 찾기
//2.버블정렬과 같이 인접한 두 수 교환하기
//그러려면? 범위는 S+1보다 작아야겠지

const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");

const N = +input[0];
const arr = input[1].split(" ").map(Number);
let S = +input[2];

if (N === 1) {
  console.log(arr.join(" "));
  return;
}

let position = 0; // current index

while (S > 0 && position < N - 1) {
  let maxIndex = position;

  //S번 안에서 가장 큰 값 찾기
  for (let i = position + 1; i < N && i <= position + S; i++) {
    if (arr[i] > arr[maxIndex]) {
      maxIndex = i;
    }
  }
  //if current positon is the biggest one, do not swap and go next position
  if (maxIndex === position) {
    position++;
    continue;
  }
  //swap
  for (let i = maxIndex; i > position; i--) {
    [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
    S--;
  }
  position++;
}

console.log(arr.join(" "));
