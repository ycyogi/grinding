# 3. Kids With the Greatest Number of Candies

- **LeetCode:** [1431. Kids With the Greatest Number of Candies](https://leetcode.com/problems/kids-with-the-greatest-number-of-candies/)
- **Difficulty:** Easy
- **Category:** Array / String
- **Pattern:** Track running max, then single pass

## Problem

There are `n` kids with candies. You are given an integer array `candies`,
where `candies[i]` represents the number of candies the `i`-th kid has,
and an integer `extraCandies`, denoting the number of extra candies that
you have.

Return a boolean array `result` of length `n`, where `result[i]` is `true`
if, after giving the `i`-th kid all `extraCandies`, they will have the
**greatest** number of candies among all the kids, or `false` otherwise.

Note that multiple kids can have the greatest number of candies.

**Example 1**
```
Input:  candies = [2,3,5,1,3], extraCandies = 3
Output: [true,true,true,false,true]
Explanation: Max candies before extras is 5.
  Kid 0: 2+3=5 >= 5 -> true
  Kid 1: 3+3=6 >= 5 -> true
  Kid 2: 5+3=8 >= 5 -> true
  Kid 3: 1+3=4 >= 5 -> false
  Kid 4: 3+3=6 >= 5 -> true
```

**Example 2**
```
Input:  candies = [4,2,1,1,2], extraCandies = 1
Output: [true,false,false,false,false]
```

**Constraints**
- `n == candies.length`
- `2 <= n <= 100`
- `1 <= candies[i] <= 100`
- `1 <= extraCandies <= 50`

## Approach

1. Find the maximum value currently in `candies` with one pass.
2. Make a second pass: for each kid, check whether
   `candies[i] + extraCandies >= max`. If so, they'd tie or beat the
   current leader after receiving all the extra candies, so record `true`,
   otherwise `false`.

No sorting or extra data structures are needed — the max is all the
information required to answer every kid's query.

## Edge Cases

| Input | Expected | Why it matters |
|---|---|---|
| `candies=[1,1], extraCandies=1` | `[True, True]` | Minimum `n` (2), all-equal starting values. |
| `candies=[5,5,5,5], extraCandies=1` | `[True, True, True, True]` | All-equal values above the minimum, every kid already ties the max. |
| `candies=[1,100], extraCandies=50` | `[False, True]` | Extra candies insufficient to close a large gap for the low kid. |
| `candies=[100,1], extraCandies=1` | `[True, False]` | Minimum `extraCandies` (1) still lets the leader stay ahead, but doesn't help the trailing kid. |
| `candies=[100,100], extraCandies=50` | `[True, True]` | Both `candies[i]` and `extraCandies` at their maximum constraint values. |

## Complexity

- **Time:** `O(n)` — one pass to find the max, one pass to build the
  result array.
- **Space:** `O(1)` extra (excluding the required `O(n)` output array).
