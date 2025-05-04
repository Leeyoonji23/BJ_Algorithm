const fs = require("fs");
const input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

class MaxHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this._heapifyUp();
  }

  extract() {
    if (this.heap.length === 0) return 0;
    if (this.heap.length === 1) return this.heap.pop();

    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._heapifyDown();
    return max;
  }

  _heapifyUp() {
    let index = this.heap.length - 1;
    const current = this.heap[index];

    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];

      if (parent >= current) break;
      this.heap[index] = parent;
      index = parentIndex;
    }

    this.heap[index] = current;
  }

  _heapifyDown() {
    let index = 0;
    const length = this.heap.length;
    const current = this.heap[0];

    while (true) {
      let left = index * 2 + 1;
      let right = index * 2 + 2;
      let largest = index;

      if (left < length && this.heap[left] > this.heap[largest]) {
        largest = left;
      }

      if (right < length && this.heap[right] > this.heap[largest]) {
        largest = right;
      }

      if (largest === index) break;

      [this.heap[index], this.heap[largest]] = [
        this.heap[largest],
        this.heap[index],
      ];
      index = largest;
    }
  }
}

const n = input[0];
const heap = new MaxHeap();
let result = [];

for (let i = 1; i <= n; i++) {
  const x = input[i];
  if (x === 0) {
    result.push(heap.extract());
  } else {
    heap.insert(x);
  }
}

console.log(result.join("\n"));
