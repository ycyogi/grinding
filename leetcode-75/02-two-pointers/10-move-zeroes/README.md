# 10. Move Zeroes

- **LeetCode:** [283. Move Zeroes](https://leetcode.com/problems/move-zeroes/)
- **Difficulty:** Easy
- **Category:** Two Pointers
- **Pattern:** Two-pointer in-place partition (slow/fast pointers)

## Problem

Given an integer array `nums`, move all `0`'s to the end of it while
maintaining the relative order of the non-zero elements.

Note that you must do this in-place without making a copy of the array.

**Example 1**
```
Input:  nums = [0,1,0,3,12]
Output: [1,3,12,0,0]
```

**Example 2**
```
Input:  nums = [0]
Output: [0]
```

**Constraints**
- `1 <= nums.length <= 10^4`
- `-2^31 <= nums[i] <= 2^31 - 1`
- Follow up: could you minimize the total number of operations done?

## Approach

Use a slow pointer `insertPos` that marks where the next non-zero element
should go, and a fast pointer `i` that scans the array:

1. Initialize `insertPos = 0`.
2. For each `i` from `0` to `n - 1`:
   - If `nums[i] !== 0`, swap `nums[i]` and `nums[insertPos]`, then
     increment `insertPos`.
3. After the scan, everything before `insertPos` is the non-zero elements
   in their original relative order, and everything from `insertPos`
   onward is all zeros (since every swap either moves a zero rightward or
   swaps an element with itself).

Swapping (rather than just overwriting) is what keeps this O(1) extra
space and single-pass: each swap places the correct non-zero value at
`insertPos` while pushing whatever was there (always a zero already
passed over, or itself) to the position we just vacated.

## Complexity

- **Time:** `O(n)` — a single pass through the array with `i`, `O(1)` work
  per step.
- **Space:** `O(1)` — all work is done in place with two index variables,
  no auxiliary array.
