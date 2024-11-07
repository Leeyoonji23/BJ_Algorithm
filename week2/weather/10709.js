const fs = require("fs");
const input = fs.readFileSync("./week2/run/input.txt").toString().trim().split("\n");

const [H, W] = input[0].split(" ").map(Number);
const arr = input.slice(1);

for (let a of arr) {  // 한 줄씩 순회
    let lst = Array(W).fill(-1);  // 모두 구름이 뜨지 않았다고 가정한 배열 만들기
    for (let i = 0; i < W; i++) {
        if (a[i] === 'c') {  // 구름이 있으면
            lst[i] = 0;  // 0 처리
        }
    }
    let tmp = 0;
    for (let i = 1; i < W; i++) {
        if (lst[i] === 0) {  // 다음 구름에서 tmp 초기화
            tmp = 0;
        }
        if (lst[i - 1] !== -1) {  // 그 전 값이 -1이 아니고 0이 아니면 tmp값 넣어주기
            if (lst[i] !== 0) {  // 다음 구름 있는 곳은 다시 reset 되므로
                tmp += 1;
                lst[i] = tmp;
            }
        }
    }
    console.log(lst.join(" "));
}
