/**
 * LeetCode 2336. Smallest Number in Infinite Set
 * https://leetcode.com/problems/smallest-number-in-infinite-set/
 *
 * Approach: track a watermark `next` for the smallest never-popped
 * integer, plus a min-heap (with a companion membership Set) of
 * numbers explicitly added back via addBack. popSmallest prefers the
 * heap's minimum if present, otherwise returns and advances `next`.
 * TypeScript has no built-in heap, so a minimal binary MinHeap is
 * implemented inline below.
 *
 * Time:  O(log m) per call - m is the number of re-added elements
 * Space: O(m) - heap + membership set
 */

class MinHeap {
  private data: number[] = [];

  get size(): number {
    return this.data.length;
  }

  peek(): number {
    return this.data[0];
  }

  push(value: number): void {
    this.data.push(value);
    this.bubbleUp(this.data.length - 1);
  }

  pop(): number {
    const top = this.data[0];
    const last = this.data.pop() as number;
    if (this.data.length > 0) {
      this.data[0] = last;
      this.bubbleDown(0);
    }
    return top;
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      const parent = (index - 1) >> 1;
      if (this.data[parent] <= this.data[index]) break;
      [this.data[parent], this.data[index]] = [this.data[index], this.data[parent]];
      index = parent;
    }
  }

  private bubbleDown(index: number): void {
    const n = this.data.length;
    while (true) {
      const left = index * 2 + 1;
      const right = index * 2 + 2;
      let smallest = index;

      if (left < n && this.data[left] < this.data[smallest]) smallest = left;
      if (right < n && this.data[right] < this.data[smallest]) smallest = right;
      if (smallest === index) break;

      [this.data[smallest], this.data[index]] = [this.data[index], this.data[smallest]];
      index = smallest;
    }
  }
}

class SmallestInfiniteSet {
  private next: number = 1;
  private heap: MinHeap = new MinHeap();
  private inHeap: Set<number> = new Set();

  popSmallest(): number {
    if (this.heap.size > 0) {
      const smallest = this.heap.pop();
      this.inHeap.delete(smallest);
      return smallest;
    }

    const value = this.next;
    this.next++;
    return value;
  }

  addBack(num: number): void {
    if (num < this.next && !this.inHeap.has(num)) {
      this.heap.push(num);
      this.inHeap.add(num);
    }
  }
}
if (require.main === module) {
  // Example usage:
  const s = new SmallestInfiniteSet();
  s.addBack(2);
  console.log(s.popSmallest()); // 1
  console.log(s.popSmallest()); // 2
  console.log(s.popSmallest()); // 3
  s.addBack(1);
  console.log(s.popSmallest()); // 1
}

export { SmallestInfiniteSet };
