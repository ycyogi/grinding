"""
LeetCode 649. Dota2 Senate
https://leetcode.com/problems/dota2-senate/

Approach: model each party as a queue of surviving senators' original
indices. Repeatedly compare the front of each queue; the smaller index
acts first and bans the other, then requeues itself as index + n so
its relative turn order across future rounds stays correct without
simulating the circle explicitly.

Time:  O(n) - each senator is enqueued/dequeued a constant number of
       times before being eliminated
Space: O(n) for the two queues
"""

from collections import deque


class Solution:
    def predictPartyVictory(self, senate: str) -> str:
        n = len(senate)
        radiant = deque(i for i, c in enumerate(senate) if c == "R")
        dire = deque(i for i, c in enumerate(senate) if c == "D")

        while radiant and dire:
            r = radiant.popleft()
            d = dire.popleft()

            if r < d:
                radiant.append(r + n)
            else:
                dire.append(d + n)

        return "Radiant" if radiant else "Dire"


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()
    print(sol.predictPartyVictory("RD"))   # Radiant
    print(sol.predictPartyVictory("RDD"))  # Dire
    print(sol.predictPartyVictory("DDRRR"))  # Dire

    # Edge cases
    assert_equal(sol.predictPartyVictory("R"), "Radiant", "n=1 single Radiant senator")
    assert_equal(sol.predictPartyVictory("D"), "Dire", "n=1 single Dire senator")
    assert_equal(sol.predictPartyVictory("RRRR"), "Radiant", "all one party (Radiant)")
    assert_equal(sol.predictPartyVictory("DR"), "Dire", "reversed order of RD example")
    assert_equal(sol.predictPartyVictory("RDRD"), "Radiant", "alternating pattern across two rounds")
