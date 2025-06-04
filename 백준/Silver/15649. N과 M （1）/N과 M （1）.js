const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim();
const [N, M] = input.split(" ").map(Number);

const visited = Array(N + 1).fill(false);
const result = [];

function backtrack(path) {
  if (path.length === M) {
    console.log(path.join(" "));
    return;
  }

  for (let i = 1; i <= N; i++) {
    if (!visited[i]) {
      visited[i] = true;
      backtrack([...path, i]);
      visited[i] = false;
    }
  }
}

backtrack([]);
