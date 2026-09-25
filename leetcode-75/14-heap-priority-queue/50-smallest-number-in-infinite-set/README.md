# 50. Smallest Number in Infinite Set

- **LeetCode:** [2336. Smallest Number in Infinite Set](https://leetcode.com/problems/smallest-number-in-infinite-set/)
- **Difficulty:** Medium
- **Category:** Heap / Priority Queue
- **Pattern:** Min-heap + pointer

## Problem

You have a set which contains all positive integers `[1, 2, 3, 4, 5,
...]`.

Implement the `SmallestInfiniteSet` class:

- `SmallestInfiniteSet()` initializes the object to contain all
  positive integers.
- `int popSmallest()` removes and returns the smallest integer
  contained in the set.
- `void addBack(int num)` adds a positive integer `num` back into the
  set, if it is not already in the set.

**Example 1**
```
Input:
["SmallestInfiniteSet", "addBack", "popSmallest", "popSmallest",
 "popSmallest", "addBack", "popSmallest", "popSmallest", "popSmallest"]
[[], [2], [], [], [], [1], [], [], []]

Output:
[null, null, 1, 2, 3, null, 1, 4, 5]

Explanation:
SmallestInfiniteSet smallestInfiniteSet = new SmallestInfiniteSet();
smallestInfiniteSet.addBack(2);    // 2 is already in the set, no change
smallestInfiniteSet.popSmallest(); // returns 1, set = {2,3,4,5,...}
smallestInfiniteSet.popSmallest(); // returns 2, set = {3,4,5,...}
smallestInfiniteSet.popSmallest(); // returns 3, set = {4,5,...}
smallestInfiniteSet.addBack(1);    // 1 is added back, set = {1,4,5,...}
smallestInfiniteSet.popSmallest(); // returns 1, set = {4,5,...}
smallestInfiniteSet.popSmallest(); // returns 4, set = {5,6,...}
smallestInfiniteSet.popSmallest(); // returns 5, set = {6,7,...}
```

**Constraints**
- `1 <= num <= 1000`
- At most `1000` calls will be made in total to `popSmallest` and
  `addBack`.

## Approach

We never actually need to materialize the whole infinite set. Almost
all of it is just "every integer from some watermark `next` upward,
untouched" — the only part that needs real bookkeeping is the small set
of numbers that were popped and then explicitly added back out of
order.

1. Keep a counter `next`, starting at `1`, representing the smallest
   integer that has never been popped (the frontier of the untouched
   infinite tail).
2. Keep a **min-heap** of numbers that were added back via `addBack`
   (these are always `< next`, since anything `>= next` is already
   implicitly "in" the set), plus a companion `Set` (`inHeap`) that
   mirrors the heap's contents so we can check membership in `O(1)` and
   avoid pushing the same number twice.
3. `popSmallest()`:
   - If the heap is non-empty, pop and return its minimum (also remove
     it from `inHeap`) — a re-added number is always smaller than
     `next`, so it takes priority.
   - Otherwise, return `next` and increment `next`.
4. `addBack(num)`:
   - If `num < next` (it was already popped at some point) and `num`
     is not already in `inHeap`, push it onto the heap and add it to
     `inHeap`.
   - If `num >= next`, it was never popped, so it's already "in" the
     set implicitly — do nothing.

## Edge Cases

| Input (sequence of calls) | Expected Output | Why it matters |
|---|---|---|
| new instance, `popSmallest() x3` (no `addBack` at all) | `1, 2, 3` | Baseline: the frontier watermark alone must correctly generate the sequence with an always-empty heap. |
| new instance, `addBack(5)`, then `popSmallest() x5` | `1, 2, 3, 4, 5` (5 is *not* duplicated) | `addBack` on a number that was never popped yet (`num >= next`) must be a silent no-op — it's already implicitly in the set. |
| new instance, `addBack(1)` (called when `next` is still `1`), then `popSmallest()` | `1` | Boundary of the "already popped" check: `num == next` (not `num > next`) must also be treated as "not yet popped" and ignored, not pushed onto the heap. |
| new instance, `popSmallest() x3` (consumes 1,2,3), then `addBack(1)` twice in a row, then `popSmallest() x2` | `1, 4` (not `1, 1`) | A duplicate `addBack` call for the same already-popped number must not insert it into the heap twice — the membership set must prevent a double-pop of the same value. |
| new instance, `popSmallest() x3` (consumes 1,2,3, `next` becomes 4), then `addBack(2)`, `addBack(1)`, then `popSmallest() x3` | `1, 2, 4` | Re-added numbers must come out of the heap in ascending order regardless of insertion order, and the frontier must resume correctly at `4` afterward — `3` (never re-added) is correctly skipped forever. |

## Complexity

- **Time:** `O(log m)` per `popSmallest` / `addBack` call, where `m` is
  the number of currently re-added elements (bounded by the number of
  `addBack` calls, so at most `O(log(total calls))` in practice) —
  dominated by the heap push/pop.
- **Space:** `O(m)` for the heap and the membership set, where `m` is
  the number of elements added back that haven't been popped again.
