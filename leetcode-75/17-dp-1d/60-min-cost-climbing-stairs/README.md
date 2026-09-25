# 60. Min Cost Climbing Stairs

- **LeetCode:** [746. Min Cost Climbing Stairs](https://leetcode.com/problems/min-cost-climbing-stairs/)
- **Difficulty:** Easy
- **Category:** Dynamic Programming (1D)
- **Pattern:** Rolling-variable DP

## Problem

You are given an integer array `cost` where `cost[i]` is the cost of
`i`th step on a staircase. Once you pay the cost, you can either climb
one or two steps.

You can either start from the step with index `0`, or the step with
index `1`.

Return the minimum cost to reach the top of the floor (one step past the
last index of `cost`).

**Example 1**
```
Input:  cost = [10,15,20]
Output: 15
Explanation: You will start at index 1.
- Pay 15 and climb two steps to reach the top.
The total cost is 15.
```

**Example 2**
```
Input:  cost = [1,100,1,1,1,100,1,1,100,1]
Output: 6
Explanation: You will start at index 0.
- Pay 1 and climb two steps to reach index 2.
- Pay 1 and climb two steps to reach index 4.
- Pay 1 and climb two steps to reach index 6.
- Pay 1 and climb one step to reach index 7.
- Pay 1 and climb two steps to reach index 9.
- Pay 1 and climb one step to reach the top.
The total cost is 6.
```

**Constraints**
- `2 <= cost.length <= 1000`
- `0 <= cost[i] <= 999`

## Approach

**State:** Let `dp[i]` = the minimum cost to *reach* step `i` (i.e. to
stand on step `i`, before paying to leave it). The "top" is the virtual
step at index `n = cost.length`, one past the last stair.

**Base cases:** `dp[0] = 0` and `dp[1] = 0` — you can start for free at
either step 0 or step 1 (no cost is paid just to stand at the starting
step).

**Transition:** To reach step `i`, you either came from step `i-1`
(paying `cost[i-1]` to take that one step) or from step `i-2` (paying
`cost[i-2]` to take a two-step jump). Take the cheaper option:
```
dp[i] = min(dp[i-1] + cost[i-1], dp[i-2] + cost[i-2])
```

**Answer:** `dp[n]`, where `n = cost.length` (the top, past the last
stair).

Since `dp[i]` only depends on the previous two values, roll them forward
in two variables instead of a full array:

1. `prev2 = dp[0] = 0`, `prev1 = dp[1] = 0`.
2. For `i` from `2` to `n`:
   `curr = min(prev1 + cost[i-1], prev2 + cost[i-2])`;
   shift `prev2 = prev1`, `prev1 = curr`.
3. Return `prev1` (which holds `dp[n]`).

## Complexity

- **Time:** `O(n)` — one pass over the stairs computing each `dp[i]`
  once, versus exponential brute force that tries every combination of
  1-step/2-step jumps without memoization.
- **Space:** `O(1)` — two rolling variables instead of an `O(n)` `dp`
  array.
