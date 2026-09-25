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

## Edge Cases

| Input | Expected Output | Why it matters |
|---|---|---|
| `costs = [1,3,5,7,9]`, `k = 2`, `candidates = 3` (`candidates > n/2`, so the front and back windows overlap) | `4` (hire cost `1`, then cost `3`) | The front/back windows cover overlapping indices from the very first round; the `left <= right` priming guard must stop the back window from re-pushing an index the front window already claimed, so no worker is double-counted. |
| `costs = [1,3,5,7,9]`, `k = 5` (`k == costs.length`, hire every worker) | `25` (the sum of every cost) | When every worker must eventually be hired, the total is forced to equal `sum(costs)` regardless of tie-breaking order — checks both heaps correctly drain to empty and the loop never tries to pop from an empty heap. |
| `costs = [4,2]`, `candidates = 2` (`candidates == costs.length`, both windows fully cover the array on the very first round), `k = 1` | `2` | Maximal window-overlap boundary: both heaps are primed with the entire array between them (2 elements total, not 4), and the single hire must correctly find the global minimum. |
| `costs = [2,5,5,2]`, `candidates = 1` (minimum allowed), `k = 2` (tie in cost between the front and back workers on round 1) | `4` (hire cost `2` at index 0, then cost `2` at index 3) | Exercises the tie-break rule directly: when the front window's cheapest and the back window's cheapest are equal, the smaller-index (front) worker must be chosen first. |
| `costs = [7]`, `candidates = 1`, `k = 1` (smallest possible array, single worker) | `7` | Degenerate size: the back window ends up empty entirely (there's nothing left after the front window claims the only worker), so the algorithm must hire correctly using only the front heap. |

## Complexity

- **Time:** `O(n + k log(candidates))` — priming the heaps takes
  `O(candidates log candidates)`, and each of the `k` hiring rounds
  does `O(1)` heap peeks plus `O(log candidates)` for a pop and a
  refill push.
- **Space:** `O(candidates)` for the two heaps.
