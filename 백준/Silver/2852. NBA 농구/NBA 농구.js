// nba 농구

const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

// "MM:SS" -> 경기 시작(0초)으로부터 지난 초로 변환
function timeToSec(t) {
  const [m, s] = t.split(":").map(Number);
  return m * 60 + s;
}

// 초를 "MM:SS" 형식 문자열로 변환 (두 자리 포맷)
function secToTime(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function solution(n, records) {
  let scoreA = 0;
  let scoreB = 0;
  let leadTimeA = 0; // A가 이기고 있던 시간(초)
  let leadTimeB = 0; // B가 이기고 있던 시간(초)
  let prevTime = 0; // 직전 득점 시각(초)

  for (let i = 0; i < n; i++) {
    const team = Number(records[i][0]); // 1 또는 2
    const curTime = timeToSec(records[i][1]);

    // 직전 득점 이후부터 현재 득점 전까지 리드하고 있던 팀에게 시간 추가
    if (scoreA > scoreB) {
      leadTimeA += curTime - prevTime;
    } else if (scoreB > scoreA) {
      leadTimeB += curTime - prevTime;
    }

    // 현재 득점 반영
    if (team === 1) {
      scoreA++;
    } else {
      scoreB++;
    }

    prevTime = curTime;
  }

  // 마지막 득점 이후부터 경기 종료(48:00, 2880초)까지 리드 팀에게 시간 추가
  const endTime = 48 * 60;
  if (scoreA > scoreB) {
    leadTimeA += endTime - prevTime;
  } else if (scoreB > scoreA) {
    leadTimeB += endTime - prevTime;
  }

  console.log(secToTime(leadTimeA));
  console.log(secToTime(leadTimeB));
}

const N = Number(input[0]);
const records = input.slice(1).map((line) => line.split(" "));

solution(N, records);
