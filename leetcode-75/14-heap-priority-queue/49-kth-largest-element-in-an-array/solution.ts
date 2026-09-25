/**
 * LeetCode 215. Kth Largest Element in an Array
 * https://leetcode.com/problems/kth-largest-element-in-an-array/
 *
 * Approach: maintain a min-heap of size k holding the k largest
 * elements seen so far. Push every element, and whenever the heap
 * grows past size k, pop the minimum. At the end, the heap's root is
 * the k-th largest element overall. TypeScript has no built-in heap,
 * so a minimal binary MinHeap is implemented inline below.
 *
 * Time:  O(n log k) - n insertions/evictions on a heap of size <= k
 * Space: O(k) - the heap
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

function findKthLargest(nums: number[], k: number): number {
  const heap = new MinHeap();

  for (const num of nums) {
    heap.push(num);
    if (heap.size > k) heap.pop();
  }

  return heap.peek();
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
  console.log(findKthLargest([3,2,1,5,6,4], 2)); // 5
  console.log(findKthLargest([3,2,3,1,2,4,5,5,6], 4)); // 4

  // Edge cases
  assertEqual(findKthLargest([3, 1, 2], 1), 3, "k=1, plain maximum");
  assertEqual(findKthLargest([3, 1, 2], 3), 1, "k=nums.length, plain minimum");
  assertEqual(findKthLargest([7], 1), 7, "single-element array");
  assertEqual(findKthLargest([1, 1, 1, 1], 2), 1, "all values equal, duplicates counted");
  assertEqual(findKthLargest([-1, -2, -3, -4], 2), -2, "all negative values");
}

export { findKthLargest, MinHeap };
