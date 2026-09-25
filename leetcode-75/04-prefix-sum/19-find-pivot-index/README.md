# 19. Find Pivot Index

- **LeetCode:** [724. Find Pivot Index](https://leetcode.com/problems/find-pivot-index/)
- **Difficulty:** Easy
- **Category:** Prefix Sum
- **Pattern:** Total sum + running left sum

## Problem

Given an array of integers `nums`, calculate the **pivot index** of this
array. The pivot index is the index where the sum of all the numbers
strictly to the left of the index is equal to the sum of all the numbers
strictly to the right of the index. If the index is on the left edge of
the array, the left sum is `0` (there are no elements to the left);
similarly for the right edge.

Return the **leftmost** pivot index. If no such index exists, return
`-1`.

**Example 1**
```
Input:  nums = [1,7,3,6,5,6]
Output: 3
Explanation: left sum = 1+7+3 = 11, right sum = 5+6 = 11, so index 3 is
the pivot.
```

**Example 2**
```
Input:  nums = [1,2,3]
Output: -1
Explanation: no index satisfies the left/right sum condition.
```

**Constraints**
- `1 <= nums.length <= 10^4`
- `-1000 <= nums[i] <= 1000`

## Approach

Brute force would recompute the left and right sums for every index,
costing `O(n)` per index and `O(n^2)` overall. Instead, compute the
`totalSum` once, then derive the right sum for each index algebraically
while sweeping left to right with a running left sum.

1. Compute `totalSum`, the sum of the entire array.
2. Initialize `leftSum = 0`.
3. Iterate `i` from `0` to `n - 1`:
   - The right sum at index `i` is `totalSum - leftSum - nums[i]`
     (everything except the left part and `nums[i]` itself).
   - If `leftSum == rightSum`, index `i` is the pivot — return it
     immediately (this guarantees the leftmost one, since we scan left
     to right).
   - Otherwise, add `nums[i]` to `leftSum` before moving to the next
     index (so `leftSum` always reflects the sum strictly left of the
     current index).
4. If the loop finishes without finding a match, return `-1`.

## Complexity

- **Time:** `O(n)` — one pass to compute the total sum, one pass to scan
  for the pivot. Brute force recomputing sums at each index would be
  `O(n^2)`.
- **Space:** `O(1)` — only a couple of running totals are kept.

## Edge Cases

| Input | Expected | Why it matters |
| --- | --- | --- |
| `nums = [5]` | `0` | Minimum-size input: the single element trivially has an empty left sum and empty right sum. |
| `nums = [0,-1,1]` | `0` | Pivot at index `0`: left sum is `0` by definition, and the right sum happens to be `0` too. |
| `nums = [1,-1,5]` | `2` | Pivot at the last index: right sum is `0` by definition, and the left sum happens to be `0` too. |
| `nums = [2,3,4]` | `-1` | No valid pivot exists anywhere in the array. |
| `nums = [0,0,0,0]` | `0` | All-zero array: every index is technically a valid pivot, so the leftmost (`0`) must be returned. |
