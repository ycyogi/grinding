# 43. Keys and Rooms

- **LeetCode:** [841. Keys and Rooms](https://leetcode.com/problems/keys-and-rooms/)
- **Difficulty:** Medium
- **Category:** Graphs - DFS
- **Pattern:** Graph traversal (DFS/BFS reachability)

## Problem

There are `n` rooms labeled from `0` to `n - 1`, and all the rooms are
locked except for room `0`. Your goal is to visit all the rooms.
However, you cannot enter a locked room without having its key.

When you visit a room, you may find a set of distinct keys in it. Each
key has a number on it, denoting which room it unlocks, and you can take
all of them and go to other rooms.

Given an array `rooms` where `rooms[i]` is the list of keys you can
obtain if you visit room `i`, return `true` if you can visit all the
rooms, or `false` otherwise.

**Example 1**
```
Input:  rooms = [[1],[2],[3],[]]
Output: true
Explanation: Start in room 0, grab key 1, go to room 1. Grab key 2, go
to room 2. Grab key 3, go to room 3. All rooms visited.
```

**Example 2**
```
Input:  rooms = [[1,3],[3,0,1],[2],[0]]
Output: false
Explanation: Room 2's key is never obtained, so room 2 can never be
visited.
```

**Constraints**
- `n == rooms.length`
- `2 <= n <= 1000`
- `0 <= rooms[i].length <= 1000`
- `1 <= sum(rooms[i].length) <= 3000`
- `0 <= rooms[i][j] < n`
- All values of `rooms[i]` are unique.

## Approach

This is a graph reachability question in disguise: treat each room as a
node, and each key found in room `i` for room `j` as a directed edge
`i -> j`. We just need to know whether every node is reachable from
node `0`.

1. Initialize a `visited` set (or boolean array of size `n`) and a stack
   (or queue) starting with room `0`; mark room `0` visited.
2. While the stack/queue is not empty:
   - Pop a room, look at its list of keys (`rooms[room]`).
   - For each key `k` in that list, if room `k` hasn't been visited yet,
     mark it visited and push it onto the stack/queue.
3. After the traversal, check whether the number of visited rooms equals
   `n`. If so, every room is reachable — return `true`; otherwise
   return `false`.

Either DFS (explicit stack or recursion) or BFS (queue) works equally
well here since we only care about reachability, not shortest paths.

## Edge Cases

| Input | Expected Output | Why it matters |
|---|---|---|
| `rooms = [[]]` (`n = 1`, only room 0, no keys) | `true` | Degenerate size below the stated `n >= 2` minimum; room 0 is trivially "all rooms" and must not be mishandled by an off-by-one against `n`. |
| `rooms = [[],[]]` (`n = 2`, room 0 has no keys at all) | `false` | Smallest possible disconnected case — the very first room yields nothing, so nothing beyond it is ever reachable. |
| `rooms = [[1],[],[]]` (room 2's key is never handed out by any reachable room) | `false` | Matches the "unreachable room" scenario from the constraints/approach note directly — room 2 sits with no incoming key anywhere in the reachable set. |
| `rooms = [[1],[0,2],[0]]` (a cycle: room 1 hands back a key to room 0) | `true` | Keys can point back to already-visited rooms; the `visited` check must prevent infinite looping on a cycle while still finding room 2. |
| `rooms = [[0,1],[]]` (room 0 contains a key to itself, alongside a real key) | `true` | A self-referencing key must be a harmless no-op (room 0 is already visited), not a source of duplicate work or an incorrect early return. |

## Complexity

- **Time:** `O(n + e)` where `n` is the number of rooms and `e` is the
  total number of keys across all rooms (`sum(rooms[i].length)`) — each
  room is visited once and each key is examined once.
- **Space:** `O(n)` for the visited set and the stack/queue.
