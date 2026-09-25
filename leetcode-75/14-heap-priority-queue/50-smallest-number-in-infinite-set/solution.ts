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
function assertEqual(actual: unknown, expected: unknown, label: string): void {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a !== e) {
    console.error(`FAIL [${label}]: got ${a}, expected ${e}`);
  } else {
    console.log(`PASS [${label}]`);
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

  // Edge cases
  const s1 = new SmallestInfiniteSet();
  assertEqual(
    [s1.popSmallest(), s1.popSmallest(), s1.popSmallest()],
    [1, 2, 3],
    "no addBack, sequential pops return 1,2,3"
  );

  const s2 = new SmallestInfiniteSet();
  s2.addBack(5); // never popped yet, must be a no-op
  assertEqual(
    [s2.popSmallest(), s2.popSmallest(), s2.popSmallest(), s2.popSmallest(), s2.popSmallest()],
    [1, 2, 3, 4, 5],
    "addBack a number never yet popped is a no-op"
  );

  const s3 = new SmallestInfiniteSet();
  s3.addBack(1); // num == next (1), still a no-op
  assertEqual(s3.popSmallest(), 1, "addBack equal to current frontier is a no-op");

  const s4 = new SmallestInfiniteSet();
  s4.popSmallest();
  s4.popSmallest();
  s4.popSmallest(); // consumes 1, 2, 3; next = 4
  s4.addBack(1);
  s4.addBack(1); // duplicate, should not double-insert
  assertEqual(
    [s4.popSmallest(), s4.popSmallest()],
    [1, 4],
    "duplicate addBack of already-popped number only re-adds once"
  );

  const s5 = new SmallestInfiniteSet();
  s5.popSmallest();
  s5.popSmallest();
  s5.popSmallest(); // consumes 1, 2, 3; next = 4
  s5.addBack(2);
  s5.addBack(1);
  assertEqual(
    [s5.popSmallest(), s5.popSmallest(), s5.popSmallest()],
    [1, 2, 4],
    "re-added numbers come out in ascending order, frontier resumes correctly"
  );
}

export { SmallestInfiniteSet };
