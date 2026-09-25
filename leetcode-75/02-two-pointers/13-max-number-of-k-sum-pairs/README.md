# 13. Max Number of K-Sum Pairs

- **LeetCode:** [1679. Max Number of K-Sum Pairs](https://leetcode.com/problems/max-number-of-k-sum-pairs/)
- **Difficulty:** Medium
- **Category:** Two Pointers
- **Pattern:** Sort + two-pointer converge

## Problem

You are given an integer array `nums` and an integer `k`.

In one operation, you can pick two numbers from the array whose sum
equals `k` and remove them from the array.

Return the maximum number of operations you can perform on the array.

**Example 1**
```
Input:  nums = [1,2,3,4], k = 5
Output: 2
Explanation: starting with nums = [1,2,3,4]:
- remove 1 and 4, leaving nums = [2,3]
- remove 2 and 3, leaving nums = []
There are no more pairs that sum up to 5, so a total of 2 operations.
```

**Example 2**
```
Input:  nums = [3,1,3,4,3], k = 6
Output: 1
Explanation: after removing one pair of 3 and 3, nums = [1,4,3] has no
more pairs that sum up to 6.
```

**Constraints**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`
- `1 <= k <= 10^9`

## Approach

Sort `nums` first, then use two pointers converging from the outside in,
similar to the classic two-sum-sorted pattern:

1. Sort `nums` in ascending order.
2. Set `left = 0`, `right = nums.length - 1`, `count = 0`.
3. While `left < right`:
   - Let `sum = nums[left] + nums[right]`.
   - If `sum === k`, we found a valid pair: increment `count`, then
     advance both `left++` and `right--` (both numbers are now "used").
   - Else if `sum < k`, the left value is too small to reach `k` even
     with the largest remaining value — advance `left++` to try a bigger
     number.
   - Else (`sum > k`), the right value is too big — move `right--` to try
     a smaller number.
4. Return `count`.

This is correct because once sorted, for a fixed `left`, increasing
`right` only increases the sum and decreasing `right` only decreases it
— so the two-pointer convergence explores exactly the pairs that could
possibly sum to `k` without missing any, in a single sweep.

(An alternative `O(n)`-average approach uses a hash map counting
frequencies of each value and matching `k - num` against it in one pass,
avoiding the sort — either is considered optimal; the two-pointer version
is used here to keep the technique consistent with this section's
pattern.)

## Edge Cases

Note: the constraints state `1 <= k <= 10^9`, so `k = 0` is outside the
valid input space. The edge case that actually probes "no pairs match"
is a valid `k` for which no pair sums to it, which is exercised below.

| Input | Expected | Why it matters |
|---|---|---|
| `nums=[1,2,3], k=100` | `0` | No pair sums to `k` at all (a valid `k`, but unreachably large for this array). |
| `nums=[4,4,4,4], k=8` | `2` | All elements identical — every element should still end up paired. |
| `nums=[3,3,3], k=6` | `1` | Odd count (3) of a matching value — one element is necessarily left over unpaired. |
| `nums=[1,4], k=5` | `1` | Minimal length-2 array that does match. |
| `nums=[1,2], k=5` | `0` | Minimal length-2 array that does not match. |

## Complexity

- **Time:** `O(n log n)` — dominated by the sort; the two-pointer scan
  itself is `O(n)`.
- **Space:** `O(log n)` to `O(n)` for the sort's internal stack/buffer
  (depending on the language's sort implementation), plus `O(1)` extra
  for the two pointers and counter.
