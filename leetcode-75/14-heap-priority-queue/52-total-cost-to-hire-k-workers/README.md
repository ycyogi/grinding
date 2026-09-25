# 52. Total Cost to Hire K Workers

- **LeetCode:** [2462. Total Cost to Hire K Workers](https://leetcode.com/problems/total-cost-to-hire-k-workers/)
- **Difficulty:** Medium
- **Category:** Heap / Priority Queue
- **Pattern:** Two min-heaps (sliding candidates)

## Problem

You are given a 0-indexed integer array `costs` where `costs[i]` is the
cost of hiring the `i`-th worker.

You are also given two integers `k` and `candidates`. You want to hire
exactly `k` workers, choosing them by running `k` rounds of the
following process:

- In each hiring round, choose the worker with the **lowest** cost
  among the first `candidates` and the last `candidates` workers that
  are still available (unhired), breaking ties by choosing the worker
  with the smaller index. (If fewer than `candidates` workers remain on
  either side, all of the remaining workers on that side are
  considered.) If both sides refer to the same worker (the two windows
  overlap), that worker is considered only once.
- Pay that worker's cost, and remove them from the pool of available
  workers.

Return the total cost to hire exactly `k` workers.

**Example 1**
```
Input:  costs = [17,12,10,2,7,2,11,20,8], k = 3, candidates = 4
Output: 11
Explanation:
Round 1: workers considered are the first 4 [17,12,10,2] and last 4
[7,2,11,20]. The lowest cost is 2, appearing at index 3 and index 5;
index 3 comes first, so hire worker 3 (cost 2). Remaining: [17,12,10,7,2,11,20,8]
Round 2: first 4 [17,12,10,7], last 4 [2,11,20,8]. Lowest is 2 (index
was 5, now shifted). Hire that worker (cost 2). Total so far: 4.
Round 3: first 4 [17,12,10,7], last 3 [11,20,8] (only 3 left on the
right since the pools have shrunk). Lowest is 7. Hire (cost 7).
Total: 2 + 2 + 7 = 11.
```

**Example 2**
```
Input:  costs = [1,2,4,1], k = 3, candidates = 3
Output: 4
Explanation: Since candidates >= n / 2 roughly, both windows quickly
cover the whole remaining array. The three cheapest workers by the
selection rule end up costing 1 + 2 + 1 = 4 in total.
```

**Constraints**
- `1 <= k, candidates <= costs.length <= 10^5`
- `1 <= costs[i] <= 10^5`

## Approach

Maintain **two min-heaps**: one over the "front window" of still-unused
workers and one over the "back window," each capped at `candidates`
entries, refilled one worker at a time as workers get hired from that
side. Two pointers, `left` (next unused worker from the front) and
`right` (next unused worker from the back), track where each window's
next refill would come from and are used to detect when the two
windows have met (so we don't double count any worker).

1. Initialize `left = 0`, `right = n - 1`.
2. Prime both heaps: `candidates` times, if `left <= right`, push
   `costs[left]` onto the left heap and increment `left`; then if
   `left <= right`, push `costs[right]` onto the right heap and
   decrement `right`. (The `left <= right` guard is what prevents
   double-counting a worker when the array is smaller than
   `2 * candidates`.)
3. Repeat `k` times:
   - Compare the two heaps' minimums (treating an empty heap as
     "infinitely expensive" / simply preferring whichever heap is
     non-empty).
   - Pop the cheaper one (ties go to the left/front heap, which
     naturally corresponds to the smaller original index since we fill
     the left heap with earlier indices), and add its cost to the
     running total.
   - Refill whichever heap we popped from: if `left <= right`, push the
     next unused worker from that side (`costs[left]`, incrementing
     `left`, for the left heap; or `costs[right]`, decrementing
     `right`, for the right heap).
4. Return the running total.

## Complexity

- **Time:** `O(n + k log(candidates))` — priming the heaps takes
  `O(candidates log candidates)`, and each of the `k` hiring rounds
  does `O(1)` heap peeks plus `O(log candidates)` for a pop and a
  refill push.
- **Space:** `O(candidates)` for the two heaps.
