"""
LeetCode 841. Keys and Rooms
https://leetcode.com/problems/keys-and-rooms/

Approach: treat rooms as graph nodes and keys as directed edges.
DFS from room 0, marking rooms visited as we collect their keys.
All rooms are reachable iff len(visited) == n.

Time:  O(n + e) - n rooms, e total keys across all rooms
Space: O(n) - visited set and explicit stack
"""

from typing import List


class Solution:
    def canVisitAllRooms(self, rooms: List[List[int]]) -> bool:
        n = len(rooms)
        visited = {0}
        stack = [0]

        while stack:
            room = stack.pop()

            for key in rooms[room]:
                if key not in visited:
                    visited.add(key)
                    stack.append(key)

        return len(visited) == n


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()
    print(sol.canVisitAllRooms([[1], [2], [3], []]))  # True
    print(sol.canVisitAllRooms([[1, 3], [3, 0, 1], [2], [0]]))  # False

    # Edge cases
    assert_equal(sol.canVisitAllRooms([[]]), True, "n=1, only room 0")
    assert_equal(sol.canVisitAllRooms([[], []]), False, "room 0 has no keys, room 1 unreachable")
    assert_equal(sol.canVisitAllRooms([[1], [], []]), False, "room 2's key never handed out")
    assert_equal(sol.canVisitAllRooms([[1], [0, 2], [0]]), True, "cycle back to room 0 doesn't break traversal")
    assert_equal(sol.canVisitAllRooms([[0, 1], []]), True, "self-referencing key is a harmless no-op")
