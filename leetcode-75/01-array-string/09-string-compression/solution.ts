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

// Example usage:
// const c1 = ['a', 'a', 'b', 'b', 'c', 'c', 'c'];
// console.log(compress(c1), c1.slice(0, 6)); // 6 ["a","2","b","2","c","3"]
// const c2 = ['a'];
// console.log(compress(c2), c2.slice(0, 1)); // 1 ["a"]

export { compress };
