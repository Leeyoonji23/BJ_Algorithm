//나는야 포켓몬 마스터 이다솜
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const pokemon = input.slice(1, N + 1);
const questions = input.slice(N + 1);

// 이름 -> 번호 매핑 (O(1) 조회)
const nameToIndex = new Map();
for (let i = 0; i < N; i++) {
  nameToIndex.set(pokemon[i], i + 1);
}

// 출력 버퍼에 모아서 한 번에 출력 (I/O 성능 향상)
const outputs = [];
for (let i = 0; i < M; i++) {
  const q = questions[i];
  // 숫자 여부 판단: 전부 숫자인지 정규식으로 확인
  if (/^\d+$/.test(q)) {
    const idx = parseInt(q, 10);
    outputs.push(pokemon[idx - 1]);
  } else {
    outputs.push(String(nameToIndex.get(q)));
  }
}

console.log(outputs.join("\n"));
