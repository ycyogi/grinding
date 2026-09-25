# 28. Dota2 Senate

- **LeetCode:** [649. Dota2 Senate](https://leetcode.com/problems/dota2-senate/)
- **Difficulty:** Medium
- **Category:** Queue
- **Pattern:** Two queues simulating rounds of banning

## Problem

In the world of Dota2, the senate consists of senators from two parties:
the `Radiant` and the `Dire`. The senate is going to decide on a change in
the Dota2 game — a round-based procedure to determine this change:

1. **Ban one senator's right**: A senator can announce to ban one
   opponent's right to vote in this and all following rounds.
2. **Announce the victory**: If this senator finds the senators who still
   have rights to vote all belong to the same party, they can announce
   the victory and decide on the change.

Given a string `senate` representing each senator's party belonging,
where the `i`-th character corresponds to the `i`-th senator, and the
character is either `'R'` or `'D'`, predict which party will finally
announce the victory. Senators make decisions in the given order, one at
a time, going around in a circle (after the last senator, it wraps back
to the first remaining senator), and continue until only one party's
senators remain with voting rights.

Return `"Radiant"` or `"Dire"`.

**Example 1**
```
Input:  senate = "RD"
Output: "Radiant"
Explanation: Senator R (index 0) bans senator D (index 1) first, since R
acts first. There is no more senator for the Dire party, so Radiant wins.
```

**Example 2**
```
Input:  senate = "RDD"
Output: "Dire"
Explanation:
- Senator R (index 0) bans the next Dire senator (index 1).
- Senator D (index 2) bans the next Radiant senator, which is index 0
  again (it wraps around) — but index 0 already acted this round, so it
  simply has no vote left to use; D (index 2) bans R (index 0).
- Only Dire senators remain, so Dire wins.
```

**Constraints**
- `n == senate.length`
- `1 <= n <= 10^4`
- `senate[i]` is either `'R'` or `'D'`.

## Approach

Think of each party as a queue of the *indices* of its still-voting
senators, in the order they'll act. Simulate rounds by repeatedly popping
the earliest-acting senator from each queue and letting the one with the
smaller original index act first (they go first because the circle
resumes from where processing left off, and a smaller "current position"
means an earlier turn):

1. Build two queues, `radiant` and `dire`, holding the original indices of
   each party's senators in input order.
2. While both queues are non-empty, pop the front of each: `r` from
   `radiant` and `d` from `dire`.
3. Whichever index is smaller acts first (it's earlier in the current
   round) and bans the other — the banned senator's index is simply
   discarded. The senator who acted survives to vote in future rounds, so
   push their index back onto the end of their own queue, but bumped by
   `n` (i.e. `index + n`) so that it correctly sorts *after* all senators
   who haven't gone yet in this pass but *before* their own next-round
   turn relative to newly re-queued opponents — this preserves the
   circular ordering across rounds without simulating the circle
   explicitly.
4. Repeat until one queue is empty. The party owning the non-empty queue
   wins.

Using `index + n` is the key trick: it keeps the relative turn order
consistent across multiple laps around the circle while using simple FIFO
queues instead of an actual circular buffer.

## Complexity

- **Time:** `O(n)` — each senator is pushed and popped from a queue a
  constant number of times before being eliminated or the simulation
  ends.
- **Space:** `O(n)` for the two queues holding senator indices.

## Edge Cases

| Input | Expected | Why it matters |
| --- | --- | --- |
| `"R"` | `"Radiant"` | Minimum length (`n = 1`), single-party trivial case, empty opponent queue. |
| `"D"` | `"Dire"` | Same as above for the other party. |
| `"RRRR"` | `"Radiant"` | All one party — the opposing queue is empty from the start, loop never runs. |
| `"DR"` | `"Dire"` | Order reversed from the README's `"RD"` example — checks the smaller-original-index tiebreak isn't hardcoded to favor Radiant. |
| `"RDRD"` | `"Radiant"` | Alternating pattern requiring the `index + n` requeue trick across two full rounds to resolve correctly. |
