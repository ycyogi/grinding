# 61. House Robber

- **LeetCode:** [198. House Robber](https://leetcode.com/problems/house-robber/)
- **Difficulty:** Medium
- **Category:** Dynamic Programming (1D)
- **Pattern:** Rolling-variable DP

## Problem

You are a professional robber planning to rob houses along a street.
Each house has a certain amount of money stashed, the only constraint
stopping you from robbing each of them is that adjacent houses have
connected security systems and **it will automatically contact the
police if two adjacent houses were broken into on the same night**.

Given an integer array `nums` representing the amount of money of each
house, return the maximum amount of money you can rob tonight **without
alerting the police**.

**Example 1**
```
Input:  nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.
```

**Example 2**
```
Input:  nums = [2,7,9,3,1]
Output: 12
Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob
house 5 (money = 1). Total amount you can rob = 2 + 9 + 1 = 12.
```

**Constraints**
- `1 <= nums.length <= 100`
- `0 <= nums[i] <= 400`

## Approach

**State:** `dp[i]` = the maximum money obtainable considering only the
first `i` houses (indices `0..i-1`), robbing optimally.

**Base cases:** `dp[0] = 0` (no houses), `dp[1] = nums[0]` (only one
house available, rob it).

**Transition:** For house `i` (0-indexed, so it's the `(i+1)`th house
considered), there are two choices:
- **Skip house `i`:** the best is whatever was optimal for the first `i`
  houses, `dp[i]`.
- **Rob house `i`:** since it can't be adjacent to a robbed house, add
  `nums[i]` to the best result excluding the immediately preceding
  house, `dp[i-1] + nums[i]`.

Take the max:
```
dp[i+1] = max(dp[i], dp[i-1] + nums[i])
```

**Answer:** `dp[n]`, where `n = nums.length`.

Since each `dp` value only depends on the previous two, roll forward
with two variables instead of an array:

1. `prev2 = 0` (empty prefix), `prev1 = 0` (also treat as `dp[0]`,
   updated as we go — see below for the clean loop form).
2. For each `num` in `nums`: `curr = max(prev1, prev2 + num)`; shift
   `prev2 = prev1`, `prev1 = curr`.
3. Return `prev1`.

Intuition: `prev1` always tracks "best so far including the current
house's decision", `prev2` tracks "best so far excluding the previous
house" — exactly what's needed to decide whether robbing the current
house beats skipping it.

## Complexity

- **Time:** `O(n)` — one pass over the houses, versus exponential brute
  force trying every subset of non-adjacent houses (`O(2^n)`).
- **Space:** `O(1)` — two rolling variables instead of an `O(n)` `dp`
  array.

## Edge Cases

| Input (`nums`) | Expected | Why it matters |
| --- | --- | --- |
| `[5]` | `5` | Single house — must rob it, no adjacency constraint applies at all. |
| `[5,10]` | `10` | Two houses — must pick the *max* of the two, not their sum (they're adjacent, robbing both is forbidden). |
| `[4,4,4,4]` | `8` | All houses worth the same — optimal is alternating houses (`0,2` or `1,3`), sum `8`; a bug that sums adjacent pairs instead of skipping would overcount. |
| `[4,4,4]` | `8` | Odd count of equal-valued houses — best is the two non-adjacent end houses (`0,2`), sum `8`, not just one house or an adjacent pair. |
