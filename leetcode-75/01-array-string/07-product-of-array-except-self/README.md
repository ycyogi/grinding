# 7. Product of Array Except Self

- **LeetCode:** [238. Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/)
- **Difficulty:** Medium
- **Category:** Array / String
- **Pattern:** Prefix products x suffix products

## Problem

Given an integer array `nums`, return an array `answer` such that
`answer[i]` is equal to the product of all the elements of `nums` except
`nums[i]`.

The product of any prefix or suffix of `nums` is guaranteed to fit in a
32-bit integer.

You must write an algorithm that runs in `O(n)` time and **without using
the division operation**.

**Example 1**
```
Input:  nums = [1,2,3,4]
Output: [24,12,8,6]
```

**Example 2**
```
Input:  nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]
```

**Constraints**
- `2 <= nums.length <= 10^5`
- `-30 <= nums[i] <= 30`
- The product of any prefix or suffix of `nums` fits in a 32-bit integer.

## Approach

The brute-force approach (for each `i`, multiply everything except
`nums[i]`) is `O(n^2)`. Using division (`total product / nums[i]`) is
`O(n)` but breaks when any element is `0` and is explicitly disallowed.

Instead, observe that `answer[i] = (product of everything to the left of i)
* (product of everything to the right of i)`.

1. Build a `prefix` array where `prefix[i]` = product of all elements
   before index `i` (`prefix[0] = 1`, since there's nothing to the left of
   index 0).
2. Build a `suffix` array where `suffix[i]` = product of all elements
   after index `i` (`suffix[n-1] = 1`).
3. `answer[i] = prefix[i] * suffix[i]`.

To hit `O(1)` extra space (excluding the output array, which the problem
doesn't count against the space complexity), fold this into two passes
over a single output array: first fill `answer[i]` with the prefix
product during a left-to-right pass, then do a right-to-left pass
multiplying in the suffix product using a single running variable instead
of a separate `suffix` array.

## Edge Cases

| Input | Expected | Why it matters |
|---|---|---|
| `nums=[1,2,0,4]` | `[0,0,8,0]` | Exactly one zero — only the zero's own index gets a non-zero answer. |
| `nums=[0,2,0,4]` | `[0,0,0,0]` | Two zeros — every answer is forced to zero, since excluding one index leaves the other zero in the product. |
| `nums=[-1,-2,3]` | `[-6,-3,2]` | Negative numbers — sign must be handled correctly through both passes. |
| `nums=[3,5]` | `[5,3]` | Minimum length `n=2`. |
| `nums=[2,2,2,2]` | `[8,8,8,8]` | All-equal elements. |

## Complexity

- **Time:** `O(n)` — two linear passes over `nums` (one left-to-right,
  one right-to-left).
- **Space:** `O(1)` extra beyond the required `O(n)` output array — the
  running suffix product is a single variable, no separate suffix array
  is allocated.
