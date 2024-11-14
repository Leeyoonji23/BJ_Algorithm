const fs = require("fs");
const input = fs.readFileSync("./week3/run/input.txt").toString().trim().split("\n");

const len = Number(input[0]);
const answer=[];      
for(let i=1;i<=len;i++){
    let hap = 0;        // 한줄이 끝날때마다 초기화
    for(let j=0;j<input[i].length;j++){     //각 줄의 길이만큼 반복
        input[i][j]==="("?hap+=1:hap-=1;    // "("이면 hap+=1 아니면 hap-=1
        if(hap<0) break;                    // 계산 도중 음수가 나오면 "NO" 예)())(()
    }
    hap===0?answer.push("YES"):answer.push("NO");
}
console.log(answer.join('\n'));