/**
 * LeetCode 1318. Minimum Flips to Make a OR b Equal to c
 * https://leetcode.com/problems/minimum-flips-to-make-a-or-b-equal-to-c/
 *
 * Approach: examine a, b, c one bit at a time. If the target bit is 1,
 * pay 1 flip only when both a and b bits are 0. If the target bit is 0,
 * pay for every 1 bit among a and b (0, 1, or 2 flips) since both must
 * become 0.
 *
 * Time:  O(log(max(a, b, c))) - a constant number of bit positions
 * Space: O(1) - a running counter and shifting integers
 */
function minFlips(a: number, b: number, c: number): number {
  let flips = 0;

  while (a > 0 || b > 0 || c > 0) {
    const aBit = a & 1;
    const bBit = b & 1;
    const cBit = c & 1;

    if (cBit === 1) {
      flips += aBit === 0 && bBit === 0 ? 1 : 0;
    } else {
      flips += aBit + bBit;
    }

    a >>= 1;
    b >>= 1;
    c >>= 1;
  }

  return flips;
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
  console.log(minFlips(2, 6, 5)); // 3
  console.log(minFlips(4, 2, 7)); // 1

  // Edge cases
  assertEqual(minFlips(0, 0, 0), 0, 'all zero');
  assertEqual(minFlips(1, 1, 0), 2, 'both bits set, target 0 (2 flips)');
  assertEqual(minFlips(1, 0, 0), 1, 'one bit set, target 0');
  assertEqual(minFlips(0, 0, 8), 1, 'c has a bit beyond a/b length');
  assertEqual(minFlips(8, 0, 0), 1, 'a has a bit beyond b/c length');
}

export { minFlips };
