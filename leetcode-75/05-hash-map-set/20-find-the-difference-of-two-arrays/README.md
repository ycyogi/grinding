# 20. Find the Difference of Two Arrays

- **LeetCode:** [2215. Find the Difference of Two Arrays](https://leetcode.com/problems/find-the-difference-of-two-arrays/)
- **Difficulty:** Easy
- **Category:** Hash Map / Set
- **Pattern:** Set difference

## Problem

Given two `0`-indexed integer arrays `nums1` and `nums2`, return a list
`answer` of size `2` where:

- `answer[0]` is a list of all **distinct** integers in `nums1` that are
  **not** present in `nums2`.
- `answer[1]` is a list of all **distinct** integers in `nums2` that are
  **not** present in `nums1`.

The values in each list may be returned in **any order**.

**Example 1**
```
Input:  nums1 = [1,2,3], nums2 = [2,4,6]
Output: [[1,3],[4,6]]
Explanation: 1 and 3 are only in nums1; 4 and 6 are only in nums2.
```

**Example 2**
```
Input:  nums1 = [1,2,3,3], nums2 = [1,1,2,2]
Output: [[3],[]]
Explanation: 3 is only in nums1 (duplicates collapse to one entry); every
value in nums2 also appears in nums1, so the second list is empty.
```

**Constraints**
- `1 <= nums1.length, nums2.length <= 1000`
- `-1000 <= nums1[i], nums2[i] <= 1000`

## Approach

Membership testing is the natural fit for a hash set: checking "is this
value present in the other array" in `O(1)` average time instead of the
`O(n)` linear scan a brute-force nested loop would need per element.

1. Build `set1` from `nums1` and `set2` from `nums2`; this both
   deduplicates each array and enables `O(1)` membership checks.
2. For `answer[0]`, iterate over `set1` and keep every value that is
   **not** in `set2`.
3. For `answer[1]`, iterate over `set2` and keep every value that is
   **not** in `set1`.
4. Return `[answer0, answer1]`.

This is exactly a two-way set difference (`set1 - set2` and
`set2 - set1`), which most languages' standard libraries expose directly
(e.g. Python's `-` operator on sets, or `Set` construction plus a filter
in TypeScript).

## Complexity

- **Time:** `O(m + n)` — building both sets is `O(m + n)`, and computing
  each difference is `O(m)` or `O(n)` with `O(1)` average lookups. Brute
  force comparing every pair would be `O(m * n)`.
- **Space:** `O(m + n)` — for the two sets and the output lists.
