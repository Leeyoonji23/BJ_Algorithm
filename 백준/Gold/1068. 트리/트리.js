const fs = require("fs");
const input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

//삭제하는 노드의 부모에서 삭제하는 노드를 제거
//삭제하는 노드에서 dfs로 자손들을 모두 방문처리함
//루트노드에서 dfs를 돌며 더이살 갈 곳이없는 노드(graph[idx].length === 0)를 카운팅

const n = Number(input[0]);
const line = input[1].split(" ").map(Number);
const graph = Array.from({ length: n }, () => []);
let root = 0;
line.forEach((v, i) => {
    if (v !== -1) {
        graph[v].push(i);
    } else root = i;
});

const visited = new Array(n).fill(false);

const dfs = (cur) => {
    visited[cur] = true;

    for (const next of graph[cur]) {
        if (!visited[next]) {
            dfs(next);
        }
    }
};

const delNoot = Number(input[2]);
if (delNoot !== root)
    graph[line[delNoot]] = graph[line[delNoot]].filter((v) => v !== delNoot);
dfs(delNoot);

let leaf = 0;
const dfs2 = (cur, d) => {
    visited[cur] = true;

    if (graph[cur].length === 0) leaf++;

    for (const next of graph[cur]) {
        if (!visited[next]) {
            dfs2(next, d + 1);
        }
    }
};

if (!visited[root]) dfs2(root, 0);

console.log(leaf);