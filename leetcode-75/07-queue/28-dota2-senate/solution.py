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


if __name__ == "__main__":
    sol = Solution()
    print(sol.predictPartyVictory("RD"))   # Radiant
    print(sol.predictPartyVictory("RDD"))  # Dire
    print(sol.predictPartyVictory("DDRRR"))  # Dire
