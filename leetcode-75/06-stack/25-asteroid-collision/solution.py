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


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()
    print(sol.asteroidCollision([5, 10, -5]))  # [5, 10]
    print(sol.asteroidCollision([8, -8]))  # []
    print(sol.asteroidCollision([10, 2, -5]))  # [10]

    # Edge cases
    assert_equal(
        sol.asteroidCollision([10, -4, -3, -2]),
        [10],
        "chain reaction, decreasing incoming sizes",
    )
    assert_equal(sol.asteroidCollision([1, 2, 3]), [1, 2, 3], "all moving right")
    assert_equal(sol.asteroidCollision([-1, -2, -3]), [-1, -2, -3], "all moving left")
    assert_equal(sol.asteroidCollision([3, -3]), [], "equal-size collision")
    assert_equal(
        sol.asteroidCollision([1, -2, 3, -4]), [-2, -4], "mixed sequence"
    )
