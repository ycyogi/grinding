/**
 * LeetCode 2542. Maximum Subsequence Score
 * https://leetcode.com/problems/maximum-subsequence-score/
 *
 * Approach: sort indices by nums2 descending so that, while scanning,
 * the current nums2 value is always the minimum among everything
 * processed so far. Maintain a min-heap of the k largest nums1 values
 * seen so far (with a running sum); whenever the heap holds exactly k
 * values, sum * currentNums2 is a valid candidate score.
 *
 * Time:  O(n log n) - dominated by the initial sort
 * Space: O(n) - sorted pairs, plus O(k) for the heap
 */

class MinHeap {
  private data: number[] = [];

  get size(): number {
    return this.data.length;
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

function maxScore(nums1: number[], nums2: number[], k: number): number {
  const n = nums1.length;
  const pairs: Array<[number, number]> = [];
  for (let i = 0; i < n; i++) pairs.push([nums1[i], nums2[i]]);
  pairs.sort((a, b) => b[1] - a[1]);

  const heap = new MinHeap();
  let sum = 0;
  let best = 0;

  for (const [n1, n2] of pairs) {
    heap.push(n1);
    sum += n1;

    if (heap.size > k) {
      sum -= heap.pop();
    }

    if (heap.size === k) {
      best = Math.max(best, sum * n2);
    }
  }

  return best;
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
  console.log(maxScore([1,3,3,2], [2,1,3,4], 3)); // 12
  console.log(maxScore([4,2,3,1,1], [7,5,10,9,6], 1)); // 30

  // Edge cases
  assertEqual(maxScore([1, 2, 3], [3, 2, 1], 3), 6, "k=n, must select every index");
  assertEqual(maxScore([5, 2, 9], [1, 10, 2], 1), 20, "k=1, reduces to max pairwise product");
  assertEqual(maxScore([3, 1, 2], [5, 5, 5], 2), 25, "all nums2 values tied");
  assertEqual(maxScore([0, 0, 0], [3, 1, 2], 2), 0, "all nums1 values are 0");
  assertEqual(maxScore([10, 10], [0, 5], 2), 0, "nums2 includes the boundary value 0");
}

export { maxScore, MinHeap };
