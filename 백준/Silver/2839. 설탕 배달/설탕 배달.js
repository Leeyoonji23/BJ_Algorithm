//설탕배달
//최대한 적은 봉지 들고가야 됨.
//5키로를 최대로 가져가고 남은걸 3키로
//5로 나눠떨어지면 굳

const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");

let result = -1;
for (let five_kilo = Math.floor(input / 5); five_kilo >= 0; five_kilo--) {
  const rest = input - five_kilo * 5;
  if (rest % 3 === 0) {
    const three_kilo = rest / 3;
    result = five_kilo + three_kilo;
    break;
  }
}
console.log(result);
