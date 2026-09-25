"""
LeetCode 735. Asteroid Collision
https://leetcode.com/problems/asteroid-collision/

Approach: stack simulation. Push right-movers unconditionally. For a
left-mover, pop smaller right-movers off the top (they explode), then
resolve the final case: equal size (both explode), a bigger survivor on
top (the incoming asteroid explodes), or an empty/negative top (the
incoming asteroid survives and is pushed).

Time:  O(n) - each asteroid is pushed and popped at most once (amortized)
Space: O(n) - the stack holds up to n surviving asteroids
"""

from typing import List


class Solution:
    def asteroidCollision(self, asteroids: List[int]) -> List[int]:
        stack: List[int] = []

        for a in asteroids:
            current = a
            alive = True

            while alive and current < 0 and stack and stack[-1] > 0:
                top = stack[-1]
                if top < -current:
                    stack.pop()  # top explodes, current keeps moving
                elif top == -current:
                    stack.pop()  # both explode
                    alive = False
                else:
                    alive = False  # current explodes on the larger top

            if alive:
                stack.append(current)

        return stack


if __name__ == "__main__":
    sol = Solution()
    print(sol.asteroidCollision([5, 10, -5]))  # [5, 10]
    print(sol.asteroidCollision([8, -8]))  # []
    print(sol.asteroidCollision([10, 2, -5]))  # [10]
