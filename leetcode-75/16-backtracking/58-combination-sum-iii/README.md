# 58. Combination Sum III

- **LeetCode:** [216. Combination Sum III](https://leetcode.com/problems/combination-sum-iii/)
- **Difficulty:** Medium
- **Category:** Backtracking
- **Pattern:** Backtracking with pruning on sum and count

## Problem

Find all valid combinations of `k` numbers that sum up to `n` such that
the following conditions are true:

- Only numbers `1` through `9` are used.
- Each number is used **at most once**.

Return a list of all possible valid combinations. The list must not
contain the same combination twice, and the combinations may be returned
in any order.

**Example 1**
```
Input:  k = 3, n = 7
Output: [[1,2,4]]
Explanation:
1 + 2 + 4 = 7. There are no other valid combinations.
```

**Example 2**
```
Input:  k = 3, n = 9
Output: [[1,2,6],[1,3,5],[2,3,4]]
Explanation:
1 + 2 + 6 = 9, 1 + 3 + 5 = 9, 2 + 3 + 4 = 9. There are no other valid
combinations.
```

**Constraints**
- `2 <= k <= 9`
- `1 <= n <= 60`

## Approach

Backtrack through the digits `1..9` in increasing order, deciding at
each step whether to include the current digit in the combination.
Using increasing order and only ever moving the start pointer forward
guarantees each combination is generated once (no duplicates from
reordering) and each digit is used at most once.

Decision tree sketch for `k = 3, n = 9` (partial): at each node we either
"take" the current number and recurse from `num + 1`, or move on without
it — the standard include/exclude backtracking shape, except implemented
here as a `for` loop trying each next candidate as the next chosen
number.

State carried through the recursion: `start` (next candidate to try),
`remainingCount` (how many more numbers we still need to pick), and
`remainingSum` (how much more we still need to add up to).

Pruning (this is what keeps it fast):
- **Sum too big:** if `candidate > remainingSum`, stop trying larger
  candidates immediately — since we iterate `1..9` ascending, everything
  larger is also too big. Break out of the loop.
- **Count exhausted:** if `remainingCount == 0` and `remainingSum == 0`,
  we found a valid combination — record it and stop this branch.
  If `remainingCount == 0` but `remainingSum != 0`, this branch is dead
  (backtrack).
- **Not enough numbers left:** implicitly handled because the loop only
  goes up to `9`, so if too few candidates remain to fill
  `remainingCount` slots, the recursion simply produces no valid leaves.

Algorithm:
1. Start backtracking with `start = 1`, `remainingCount = k`,
   `remainingSum = n`, empty `path`.
2. If `remainingCount == 0`: if `remainingSum == 0`, save `path` as a
   result; either way, return (nothing more to add).
3. For `candidate` from `start` to `9`:
   - If `candidate > remainingSum`, break (pruning — no point trying
     bigger numbers).
   - Push `candidate` onto `path`, recurse with
     `(candidate + 1, remainingCount - 1, remainingSum - candidate)`,
     then pop `candidate` (undo).
4. Return all recorded combinations.

## Complexity

- **Time:** `O(C(9, k) * k)` in the worst case — there are at most
  `C(9, k)` ways to choose `k` distinct digits from `1..9`, and each
  valid combination costs `O(k)` to copy into the result. The sum and
  candidate-range pruning cut this down well below a naive
  "try all subsets and filter" approach, which would be `O(2^9 * k)`.
- **Space:** `O(k)` for the recursion depth and the `path` buffer,
  excluding the output.
