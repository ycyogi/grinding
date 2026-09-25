# 4. Can Place Flowers

- **LeetCode:** [605. Can Place Flowers](https://leetcode.com/problems/can-place-flowers/)
- **Difficulty:** Easy
- **Category:** Array / String
- **Pattern:** Greedy linear scan

## Problem

You have a long flowerbed in which some plots are planted, and some are
not. Flowers cannot be planted in adjacent plots — they must be
separated by at least one empty plot on both sides.

Given an integer array `flowerbed` containing `0`'s and `1`'s, where `0`
means empty and `1` means planted, and an integer `n`, return `true` if
`n` new flowers can be planted in `flowerbed` without violating the
no-adjacent-flowers rule, or `false` otherwise.

**Example 1**
```
Input:  flowerbed = [1,0,0,0,1], n = 1
Output: true
```

**Example 2**
```
Input:  flowerbed = [1,0,0,0,1], n = 2
Output: false
Explanation: only the middle plot could hold one more flower.
```

**Constraints**
- `1 <= flowerbed.length <= 2 * 10^4`
- `flowerbed[i]` is `0` or `1`.
- There are no two adjacent flowers in `flowerbed` initially.
- `0 <= n <= flowerbed.length`

## Approach

Greedily plant a flower in every empty plot where it's legal, scanning
left to right:

1. For each index `i`, a flower can be planted at `i` if:
   - `flowerbed[i] == 0`, and
   - the left neighbor is empty or doesn't exist (`i == 0`), and
   - the right neighbor is empty or doesn't exist (`i == len - 1`).
2. Whenever those conditions hold, "plant" there (set `flowerbed[i] = 1`
   or just track it) and decrement `n`.
3. After scanning the whole bed, return `n <= 0`.

Greedy works here because planting as early as possible never blocks a
future planting — leaving a `0` unplanted when it's legal to plant only
wastes a potential slot without ever helping a later plot, since a `1` at
`i` only forbids planting at `i-1` and `i+1`, and skipping `i` doesn't
loosen any other future constraint.

## Edge Cases

| Input | Expected | Why it matters |
|---|---|---|
| `flowerbed=[1,0,1,0,1], n=0` | `True` | Bed already full at every possible spot, but `n=0` needs nothing planted. |
| `flowerbed=[0], n=1` | `True` | Single-element bed, empty — both "neighbors" are off the edge. |
| `flowerbed=[1], n=1` | `False` | Single-element bed, already occupied — nothing can be planted. |
| `flowerbed=[1,0,0,1], n=1` | `False` | A gap of exactly 2 empty plots between two flowers is one short of the 3 needed for an interior planting. |
| `flowerbed=[0,0], n=2` | `False` | Two adjacent empty plots can only ever fit one flower (planting either blocks the other). |
| `flowerbed=[0,0,0], n=2` | `True` | Three empty plots fit exactly at both ends (indices 0 and 2), the maximum possible for this length. |

## Complexity

- **Time:** `O(m)` — a single pass over the flowerbed, `m = flowerbed.length`.
- **Space:** `O(1)` — flowers are "planted" in place (or via a couple of
  scalar counters), no extra structures needed.
