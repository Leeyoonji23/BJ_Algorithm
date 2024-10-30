//포켓몬 마스터 되기 힘들다..

//첫째 줄: 포켓몬 개수 N, 맞춰야 하는 문제의 수 M
// 1<= N, M < 100,000

//둘째 줄: N개의 줄, 포켓몬 1~N , 한 줄에 하나씩, 영어로만, 첫 글자만 대문자
//일부 포켓몬은 마지막 문자만 대문자일수도..
// 2 <= 포켓몬 이름[] <= 20

//세번쨰 줄: 문제는 입력
// 알파벳으로만 -> 포켓몬 번호 출력
// 숫자만 -> 포켓몬 번호에 해당하는 문자 출력

const fs = require('fs');

// 첫째 줄
const input = fs.readFileSync('./week1/run/input.txt', 'utf8').trim().split('\n').map(line => line.trim());
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
