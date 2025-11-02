//곱셈
//분할정복?

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split("\n");

const [A, B, C] = input[0].split(" ").map(BigInt);

// 분할 정복을 이용한 거듭제곱 (A^B mod C)
function power(base, exponent, mod) {
  if (exponent === 0n) return 1n;

  // B가 짝수면: A^B = (A^(B/2))^2
  // B가 홀수면: A^B = A * A^(B-1)
  let half = power(base, exponent / 2n, mod);
  half = (half * half) % mod;

  if (exponent % 2n === 1n) {
    half = (half * base) % mod;
  }

  return half;
}

console.log(Number(power(A, B, C)));
