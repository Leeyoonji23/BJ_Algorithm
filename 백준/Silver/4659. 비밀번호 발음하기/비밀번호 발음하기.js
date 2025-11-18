//비밀번호 발음하기

const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const vowels = new Set(["a", "e", "i", "o", "u"]);

const isValid = (password) => {
  // 1. 모음 하나 이상 포함
  let hasVowel = false;
  for (const char of password) {
    if (vowels.has(char)) {
      hasVowel = true;
      break;
    }
  }
  if (!hasVowel) return false;

  // 2. 모음 3개 연속 또는 자음 3개 연속 체크
  for (let i = 0; i < password.length - 2; i++) {
    const isVowel1 = vowels.has(password[i]);
    const isVowel2 = vowels.has(password[i + 1]);
    const isVowel3 = vowels.has(password[i + 2]);
    if (isVowel1 === isVowel2 && isVowel2 === isVowel3) {
      return false;
    }
  }

  // 3. 같은 글자 연속 두 번 (ee, oo 제외)
  for (let i = 0; i < password.length - 1; i++) {
    if (
      password[i] === password[i + 1] &&
      password[i] !== "e" &&
      password[i] !== "o"
    ) {
      return false;
    }
  }

  return true;
};

for (const line of input) {
  if (line === "end") break;
  const result = isValid(line);
  console.log(`<${line}> is ${result ? "acceptable" : "not acceptable"}.`);
}
