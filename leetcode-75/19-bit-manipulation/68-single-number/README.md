# 68. Single Number

- **LeetCode:** [136. Single Number](https://leetcode.com/problems/single-number/)
- **Difficulty:** Easy
- **Category:** Bit Manipulation
- **Pattern:** XOR cancellation

## Problem

Given a non-empty array of integers `nums`, every element appears
exactly twice except for one element which appears only once. Find that
single element.

You must implement a solution with linear runtime complexity and use
only constant extra space.

**Example 1**
```
Input:  nums = [2,2,1]
Output: 1
```

**Example 2**
```
Input:  nums = [4,1,2,1,2]
Output: 4
```

**Constraints**
- `1 <= nums.length <= 3 * 10^4`
- `-3 * 10^4 <= nums[i] <= 3 * 10^4`
- Each element in the array appears twice except for one element which
  appears only once.

## Approach

Use the XOR (`^`) operator's key properties:
- `x ^ x = 0` (a number XORed with itself cancels out)
- `x ^ 0 = x` (XOR with zero is a no-op)
- XOR is commutative and associative, so order doesn't matter.

XOR every number in the array together. Every value that appears twice
cancels itself out to `0`, and XORing `0` with the single leftover value
just returns that value. What remains after processing the whole array
is exactly the single number.

This avoids the extra space a hash-map frequency count would use
(`O(n)` space) and the `O(n log n)` time a sort-based approach would
need.

## Complexity

- **Time:** `O(n)` — one pass over the array.
- **Space:** `O(1)` — a single accumulator variable, no auxiliary
  structures.

## Edge Cases

| Input | Expected Output | Why it matters |
|---|---|---|
| `[5]` | `5` | Minimum-length array (constraint floor); the single element is the whole answer. |
| `[-1,-1,-2]` | `-2` | Negative numbers XOR correctly via two's-complement cancellation. |
| `[0,0,7]` | `7` | `0` as a *paired* value must still cancel (`0 ^ 0 = 0`), not be mistaken for "no-op only". |
| `[-30000,-30000,30000]` | `30000` | Singleton sits at the exact upper constraint boundary. |
| `[30000,-30000,30000,-30000,-1]` | `-1` | Both extreme boundary magnitudes are paired; singleton is a distinct negative value. |
