//강의 시간을 시작 시간 기준으로
// 최소 힙 (종료 시간만 저장)
// 힙에서 가장 빠르게 끝나는 시간보다 시작 시간이 크거나 같으면 -> 기존 강의실 사요 가능 -> 힙에서 꺼냄
// 새로운 강의 시작 -> 종료 시간 힙에 넣기

// MinHeap
class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(value) {
    this.heap.push(value);
    this._bubbleUp();
  }

  pop() {
    if (this.size() === 1) return this.heap.pop();
    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._bubbleDown();
    return top;
  }

  peek() {
    return this.heap[0];
  }

  size() {
    return this.heap.length;
  }

  _bubbleUp() {
    let index = this.heap.length - 1;
    const current = this.heap[index];

    while (index > 0) {
      const parentIdx = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIdx];

      if (current >= parent) break;

      this.heap[index] = parent;
      this.heap[parentIdx] = current;
      index = parentIdx;
    }
  }

  _bubbleDown() {
    let index = 0;
    const length = this.heap.length;
    const current = this.heap[0];

    while (true) {
      let leftIdx = index * 2 + 1;
      let rightIdx = index * 2 + 2;
      let swapIdx = null;

      if (leftIdx < length) {
        if (this.heap[leftIdx] < current) swapIdx = leftIdx;
      }

      if (rightIdx < length) {
        if (
          (swapIdx === null && this.heap[rightIdx] < current) ||
          (swapIdx !== null && this.heap[rightIdx] < this.heap[swapIdx])
        ) {
          swapIdx = rightIdx;
        }
      }

      if (swapIdx === null) break;

      this.heap[index] = this.heap[swapIdx];
      this.heap[swapIdx] = current;
      index = swapIdx;
    }
  }
}

const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");

const N = +input[0];
const lectures = input
  .slice(1)
  .map((line) => line.split(" ").map(Number))
  .sort((a, b) => a[0] - b[0]); // 시작 시간 기준 정렬

const heap = new MinHeap();
heap.push(lectures[0][1]); // 첫 강의 종료 시간 추가

for (let i = 1; i < N; i++) {
  const [start, end] = lectures[i];

  if (heap.peek() <= start) {
    heap.pop(); // 기존 강의실 사용 가능
  }

  heap.push(end); // 새 강의 종료 시간 push
}

console.log(heap.size());
