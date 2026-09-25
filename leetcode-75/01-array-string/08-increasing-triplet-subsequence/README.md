# 8. Increasing Triplet Subsequence

- **LeetCode:** [334. Increasing Triplet Subsequence](https://leetcode.com/problems/increasing-triplet-subsequence/)
- **Difficulty:** Medium
- **Category:** Array / String
- **Pattern:** Greedy two-variable running minimums

## Problem

Given an integer array `nums`, return `true` if there exists a triple of
indices `(i, j, k)` such that `i < j < k` and `nums[i] < nums[j] <
nums[k]`. If no such indices exist, return `false`.

**Example 1**
```
Input:  nums = [1,2,3,4,5]
Output: true
Explanation: any triple of increasing indices works, e.g. (0,1,2).
```

**Example 2**
```
Input:  nums = [5,4,3,2,1]
Output: false
Explanation: no increasing triple exists.
```

**Constraints**
- `1 <= nums.length <= 5 * 10^5`
- `-2^31 <= nums[i] <= 2^31 - 1`
- Follow-up: could you implement a solution that runs in `O(n)` time
  complexity and `O(1)` space complexity?

## Approach

Track two running values as we scan left to right:
- `first`: the smallest value seen so far that could serve as `nums[i]`.
- `second`: the smallest value seen so far that is strictly greater than
  some earlier `first` — i.e., the best candidate for `nums[j]`.

For each `num` in `nums`:
1. If `num <= first`, it's a new, smaller candidate for the first element
   of a future triple — update `first = num`.
2. Else if `num <= second`, it's a new, smaller (but still `> first`)
   candidate for the middle element — update `second = num`.
3. Else (`num > first` and `num > second`), we've found a value strictly
   greater than both a valid `first` and a valid `second` that occurred
   earlier in the array — that's a full increasing triplet. Return `true`
   immediately.

If the loop finishes without hitting case 3, no increasing triplet
exists — return `false`.

The key insight that makes this correct: even though `first` and `second`
might get overwritten and no longer refer to the *original* indices where
those minimal values occurred, it's always true that whenever `second` is
finite, some valid earlier index for a smaller `first` genuinely existed
at some point in the scan — so if we later see something bigger than
`second`, a real increasing triple is guaranteed to exist, even if we
don't track the exact indices.

## Edge Cases

| Input | Expected | Why it matters |
|---|---|---|
| `nums=[2,1]` | `false` | Length-2 array — structurally impossible to form a triple. |
| `nums=[7]` | `false` | Single-element array (minimum length). |
| `nums=[1,1,1]` | `false` | All duplicates — the `<=` comparisons must not fabricate a strict increasing triple out of equal values. |
| `nums=[1,2,2,3]` | `true` | Duplicate middle value; a later distinct larger value still completes a valid strict triple (`1<2<3`). |
| `nums=[20,100,10,12,5,13]` | `true` | An early `first`/`second` pair gets undercut by smaller values later, but a genuine triple (`10,12,13`) still exists downstream. |

## Complexity

- **Time:** `O(n)` — a single pass over `nums`, constant work per element.
- **Space:** `O(1)` — only two scalar variables (`first`, `second`) are
  used, regardless of input size. Compare to a brute-force `O(n^3)` (or
  `O(n^2)` with a precomputed "min so far" / "max so far" pair of
  arrays), which needlessly uses `O(n)` extra space.
