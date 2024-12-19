const input = require("fs")
  .readFileSync("./week5/run/input.txt")
  .toString()
  .trim()
  .split("\n");

// mp: minimum protein, mf: minimum fat, mc: minimum carbohydrate, mv: minimum vitamin
const n = parseInt(input[0]);
const [mp, mf, mc, mv] = input[1].split(" ").map(Number);
const foods = input.slice(2).map((line, index) => {
  const [p, f, c, v, m] = line.split(" ").map(Number);
  return { num: index + 1, p, f, c, v, m };
  // p: 단백질, f: 지방, c: 탄수화물, v: 비타민, m: 비용 (money)
});

let ret = Infinity; // 최소 비용 infinity 로 설정-> 더 작은 값이 발견되면 업데이트
let ret_v = []; // 최소 비용을 음식 번호 배열

const isOver = (visited) => {
  let sp = 0,
    sf = 0,
    sc = 0,
    sv = 0,
    sm = 0;
  const temp_v = [];
  for (let i = 0; i < n; i++) {
    if (visited[i]) {
      sp += foods[i].p;
      sf += foods[i].f;
      sc += foods[i].c;
      sv += foods[i].v;
      sm += foods[i].m;
      temp_v.push(foods[i].num);
    }
  }
  if (sp >= mp && sf >= mf && sc >= mc && sv >= mv) {
    return { cost: sm, items: temp_v };
  }
  return null;
};

// 백트래킹 
const dfs = (ind, visited) => {
  const result = isOver(visited);
  if (result && ret > result.cost) {
    ret = result.cost;
    ret_v = [...result.items];
  }

  if (ind === n) return;

  // 현재 음식 포함
  visited[ind] = true;
  dfs(ind + 1, visited);

  // 현재 음식 미포함
  visited[ind] = false;
  dfs(ind + 1, visited);
};

const visited = Array(n).fill(false);

// DFS
dfs(0, visited);

if (ret === Infinity) {
  console.log(-1);
} else {
  console.log(ret);
  console.log(ret_v.join(" "));
}
