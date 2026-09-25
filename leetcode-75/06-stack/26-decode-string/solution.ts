/**
 * LeetCode 394. Decode String
 * https://leetcode.com/problems/decode-string/
 *
 * Approach: stack of (previousString, repeatCount) pairs. On '[', push
 * the string built so far and the pending repeat count, then start a
 * fresh string for the bracket's contents. On ']', pop the pair and
 * splice the repeated contents back onto the outer string. Digits
 * accumulate a possibly multi-digit repeat count; letters append.
 *
 * Time:  O(maxK * n) - dominated by building the repeated output strings
 * Space: O(maxK * n) - the stack and the decoded string can grow with
 *        the product of nested repeat counts
 */
function decodeString(s: string): string {
  const stack: Array<[string, number]> = [];
  let currentString = '';
  let currentNum = 0;

  for (const c of s) {
    if (c >= '0' && c <= '9') {
      currentNum = currentNum * 10 + Number(c);
    } else if (c === '[') {
      stack.push([currentString, currentNum]);
      currentString = '';
      currentNum = 0;
    } else if (c === ']') {
      const [prevString, num] = stack.pop()!;
      currentString = prevString + currentString.repeat(num);
    } else {
      currentString += c;
    }
  }

  return currentString;
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
  console.log(decodeString('3[a]2[bc]')); // "aaabcbc"
  console.log(decodeString('3[a2[c]]')); // "accaccacc"
  console.log(decodeString('2[abc]3[cd]ef')); // "abcabccdcdcdef"

  // Edge cases
  assertEqual(decodeString('1[a]'), 'a', 'minimal repeat count k == 1');
  assertEqual(decodeString('10[a]'), 'a'.repeat(10), 'multi-digit repeat count');
  assertEqual(
    decodeString('100[leetcode]'),
    'leetcode'.repeat(100),
    'large multi-digit repeat count, multi-char word'
  );
  assertEqual(decodeString('xyz'), 'xyz', 'no brackets at all');
  assertEqual(
    decodeString('2[ab3[cd]]'),
    'abcdcdcdabcdcdcd',
    'nested brackets with multi-digit inner count'
  );
}

export { decodeString };
