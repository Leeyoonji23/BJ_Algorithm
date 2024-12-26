const input = require("fs")
  .readFileSync("./week6/run/input.txt")
  .toString()
  .trim();

const s = input;
let piKachu = false;

// 재귀- 문자열 `s`에서 특정 인덱스부터 시작하여 "pi", "ka", "chu"로만 구성되었는지 확인
function func(idx) {
  if (idx === s.length) {
    piKachu = true;
    return;
  }

  if (s.substring(idx, idx + 2) === "pi") {
    func(idx + 2);
  }

  if (s.substring(idx, idx + 2) === "ka") {
    func(idx + 2);
  }

  if (s.substring(idx, idx + 3) === "chu") {
    func(idx + 3);
  }
}

func(0);

console.log(piKachu ? "YES" : "NO");
