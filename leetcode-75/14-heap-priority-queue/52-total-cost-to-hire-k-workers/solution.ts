/**
 * LeetCode 2462. Total Cost to Hire K Workers
 * https://leetcode.com/problems/total-cost-to-hire-k-workers/
 *
 * Approach: two min-heaps, one for the front "candidates" window and
 * one for the back window, each refilled from two pointers (left,
 * right) as workers are hired. Each round, hire the cheaper of the
 * two heap roots (ties favor the front/left heap), then refill that
 * heap from its side if any unused workers remain. TypeScript has no
 * built-in heap, so a minimal binary MinHeap is implemented inline
 * below (reused for both windows).
 *
 * Time:  O(n + k log(candidates)) - priming + k rounds of heap ops
 * Space: O(candidates) - the two heaps
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

function totalCost(costs: number[], k: number, candidates: number): number {
  const n = costs.length;
  const leftHeap = new MinHeap();
  const rightHeap = new MinHeap();
  let left = 0;
  let right = n - 1;

  for (let i = 0; i < candidates; i++) {
    if (left <= right) {
      leftHeap.push(costs[left]);
      left++;
    }
    if (left <= right) {
      rightHeap.push(costs[right]);
      right--;
    }
  }

  let total = 0;

  for (let i = 0; i < k; i++) {
    const canUseRight = rightHeap.size > 0;
    const canUseLeft = leftHeap.size > 0;

    if (canUseRight && (!canUseLeft || rightHeap.peek() < leftHeap.peek())) {
      total += rightHeap.pop();
      if (left <= right) {
        rightHeap.push(costs[right]);
        right--;
      }
    } else {
      total += leftHeap.pop();
      if (left <= right) {
        leftHeap.push(costs[left]);
        left++;
      }
    }
  }

  return total;
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
  console.log(totalCost([17,12,10,2,7,2,11,20,8], 3, 4)); // 11
  console.log(totalCost([1,2,4,1], 3, 3)); // 4

  // Edge cases
  assertEqual(totalCost([1, 3, 5, 7, 9], 2, 3), 4, "candidates > n/2, windows overlap");
  assertEqual(totalCost([1, 3, 5, 7, 9], 5, 2), 25, "k=costs.length, hire everyone");
  assertEqual(totalCost([4, 2], 1, 2), 2, "candidates==costs.length, full overlap on round 1");
  assertEqual(totalCost([2, 5, 5, 2], 2, 1), 4, "tie in cost between front and back, index tie-break");
  assertEqual(totalCost([7], 1, 1), 7, "single worker array");
}

export { totalCost, MinHeap };
