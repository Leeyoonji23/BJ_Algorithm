//그리디알고리즘
// 회의 스케줄을 회의 종료 시간이 빠른 순서대로 정렬
//만약 회의 종료 시간이 같으면 회의 시작 시간이 더 빠른 것을 우선적으로 배열
// 정렬된 회의 스케줄을 순회
// 시작시간 직전에 진행한 회의의 종료시간과 같거나 늦을 경우 해당 회의를 진행시킴

const solve = (N, input) => {
  const schedule = input
    .map((time) => time.split(" ").map((v) => +v))
    .sort((a, b) => {
      if (a[1] === b[1]) {
        //종료 시간이 같으면 시작 시간 기준 오름차순 정렬
        return a[0] - b[0];
        // 다르면 종료 시간 기준 오름차순 정렬
      } else return a[1] - b[1];
    });
  let i = 0;
  let count = 0;
  let curEnd = 0;
  while (i < N) {
    const [start, end] = schedule[i++];

    //현재 회의의 시작 시간이 마지막 선택된 회의의 종료 시간 이상이라면
    if (start >= curEnd) {
      curEnd = end;
      count++;
    }
  }
  console.log(count);
};

const [N, ...input] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
solve(N, input);
