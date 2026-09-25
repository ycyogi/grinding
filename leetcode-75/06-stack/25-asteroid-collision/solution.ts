/**
 * LeetCode 735. Asteroid Collision
 * https://leetcode.com/problems/asteroid-collision/
 *
 * Approach: stack simulation. Push right-movers unconditionally. For a
 * left-mover, pop smaller right-movers off the top (they explode),
 * then resolve the final case: equal size (both explode), a bigger
 * survivor on top (the incoming asteroid explodes), or an empty/negative
 * top (the incoming asteroid survives and is pushed).
 *
 * Time:  O(n) - each asteroid is pushed and popped at most once (amortized)
 * Space: O(n) - the stack holds up to n surviving asteroids
 */
function asteroidCollision(asteroids: number[]): number[] {
  const stack: number[] = [];

  for (const a of asteroids) {
    let current = a;
    let alive = true;

    while (
      alive &&
      current < 0 &&
      stack.length > 0 &&
      stack[stack.length - 1] > 0
    ) {
      const top = stack[stack.length - 1];
      if (top < -current) {
        stack.pop(); // top explodes, current keeps moving
      } else if (top === -current) {
        stack.pop(); // both explode
        alive = false;
      } else {
        alive = false; // current explodes on the larger top
      }
    }

    if (alive) stack.push(current);
  }

  return stack;
}
function assertEqual(actual: unknown, expected: unknown, label: string): void {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a !== e) {
    console.error(`FAIL [${label}]: got ${a}, expected ${e}`);
  } else {
    console.log(`PASS [${label}]`);
  }
}

if (require.main === module) {
  // Example usage:
  console.log(asteroidCollision([5, 10, -5])); // [5, 10]
  console.log(asteroidCollision([8, -8])); // []
  console.log(asteroidCollision([10, 2, -5])); // [10]

  // Edge cases
  assertEqual(
    asteroidCollision([10, -4, -3, -2]),
    [10],
    'chain reaction, decreasing incoming sizes'
  );
  assertEqual(asteroidCollision([1, 2, 3]), [1, 2, 3], 'all moving right');
  assertEqual(asteroidCollision([-1, -2, -3]), [-1, -2, -3], 'all moving left');
  assertEqual(asteroidCollision([3, -3]), [], 'equal-size collision');
  assertEqual(asteroidCollision([1, -2, 3, -4]), [-2, -4], 'mixed sequence');
}

export { asteroidCollision };
