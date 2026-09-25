/**
 * LeetCode 443. String Compression
 * https://leetcode.com/problems/string-compression/
 *
 * Approach: two pointers over the same array - `read` scans consecutive
 * runs of the same character, `write` writes the compressed run
 * (character, then digits of the count if > 1) back into the front of
 * the array in place.
 *
 * Time:  O(n) - read pointer visits every character once
 * Space: O(1) - compression happens in place
 */
function compress(chars: string[]): number {
  let read = 0;
  let write = 0;

  while (read < chars.length) {
    const groupChar = chars[read];
    let groupStart = read;

    while (read < chars.length && chars[read] === groupChar) {
      read++;
    }

    const count = read - groupStart;
    chars[write++] = groupChar;

    if (count > 1) {
      for (const digit of String(count)) {
        chars[write++] = digit;
      }
    }
  }

  return write;
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
  const c1 = ['a', 'a', 'b', 'b', 'c', 'c', 'c'];
  console.log(compress(c1), c1.slice(0, 6)); // 6 ["a","2","b","2","c","3"]
  const c2 = ['a'];
  console.log(compress(c2), c2.slice(0, 1)); // 1 ["a"]

  // Edge cases
  const c4 = new Array(10).fill('a');
  const n4 = compress(c4);
  assertEqual([n4, c4.slice(0, n4)], [3, ['a', '1', '0']], 'run of exactly 10 (two-digit boundary)');

  const c5 = new Array(9).fill('b');
  const n5 = compress(c5);
  assertEqual([n5, c5.slice(0, n5)], [2, ['b', '9']], 'run of exactly 9 (single-digit boundary)');

  const c6 = ['a', 'b', 'c'];
  const n6 = compress(c6);
  assertEqual([n6, c6.slice(0, n6)], [3, ['a', 'b', 'c']], 'no repeated characters at all');

  const c7 = ['a', 'b', 'a', 'b'];
  const n7 = compress(c7);
  assertEqual([n7, c7.slice(0, n7)], [4, ['a', 'b', 'a', 'b']], 'alternating characters');

  const c8 = new Array(11).fill('c').concat(['d']);
  const n8 = compress(c8);
  assertEqual([n8, c8.slice(0, n8)], [4, ['c', '1', '1', 'd']], 'run of 11 followed by a singleton');
}

export { compress };
