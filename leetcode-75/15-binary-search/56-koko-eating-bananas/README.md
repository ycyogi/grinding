# 56. Koko Eating Bananas

- **LeetCode:** [875. Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/)
- **Difficulty:** Medium
- **Category:** Binary Search
- **Pattern:** Binary search on the answer

## Problem

Koko loves to eat bananas. There are `n` piles of bananas, the `i`th pile
has `piles[i]` bananas. The guards have gone and will come back in `h`
hours.

Koko can decide her bananas-per-hour eating speed of `k`. Each hour, she
chooses some pile of bananas and eats `k` bananas from that pile. If the
pile has less than `k` bananas, she eats all of them instead and will not
eat any more bananas during that hour.

Koko likes to eat slowly but still wants to finish eating all the
bananas before the guards return.

Return the minimum integer `k` such that she can eat all the bananas
within `h` hours.

**Example 1**
```
Input:  piles = [3,6,7,11], h = 8
Output: 4
```

**Example 2**
```
Input:  piles = [30,11,23,4,20], h = 5
Output: 30
```

**Constraints**
- `1 <= piles.length <= 10^4`
- `piles.length <= h <= 10^9`
- `1 <= piles[i] <= 10^9`

## Approach

This is "binary search on the answer": we don't search the input array,
we search the space of possible *speeds* `k`, using a monotonic
feasibility check — "can Koko finish within `h` hours at speed `k`?" — to
decide which half of the speed range to keep.

Observations:
- The smallest possible speed is `k = 1`.
- The largest speed worth trying is `k = max(piles)`, since eating faster
  than the biggest pile gives no further benefit (a whole pile is
  consumed in one hour regardless).
- The hours needed at speed `k` is monotonically non-increasing as `k`
  increases: `hours(k) = sum(ceil(pile / k) for pile in piles)`. If
  `hours(k) <= h`, then any speed `k' > k` also satisfies `hours(k') <= h`.
  This monotonic structure is exactly what makes binary search valid.

Algorithm:
1. Binary search `k` over `[1, max(piles)]`.
2. For a candidate `mid`, compute `hours(mid) = sum(ceil(pile / mid))`.
3. If `hours(mid) <= h`, this speed works — try to go slower:
   `hi = mid`.
4. Otherwise, `mid` is too slow — need to go faster: `lo = mid + 1`.
5. When `lo == hi`, that's the minimum feasible speed.

## Complexity

- **Time:** `O(n log m)`, where `n = piles.length` and
  `m = max(piles)` — each of the `O(log m)` binary search steps scans all
  `n` piles to compute `hours(k)`. Brute force trying every speed from 1
  upward and checking feasibility would be `O(n * m)`.
- **Space:** `O(1)` — only a few scalar variables beyond the input.
