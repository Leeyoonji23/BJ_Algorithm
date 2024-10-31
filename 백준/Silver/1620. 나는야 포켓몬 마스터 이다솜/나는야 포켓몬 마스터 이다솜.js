const fs = require('fs');
const input = fs.readFileSync('/dev/stdin', 'utf8').trim().split('\n').map(line => line.trim());

// 첫째 줄
const [N, M] = input.shift().split(' ').map(num => parseInt(num));

// 둘째 줄
const orders = input.slice(0, N);
const questions = input.slice(N, N + M);

// 포켓몬 이름과 번호를 맵으로 저장
const mon_first = orders.map((elem, idx) => [elem, (idx + 1).toString()]);
const num_first = orders.map((elem, idx) => [(idx + 1).toString(), elem]);
const map = new Map(mon_first.concat(num_first));

// 문제에 대한 답 출력
questions.forEach(elem => {
    console.log(map.get(elem) || '존재하지 않는 포켓몬입니다');
});
