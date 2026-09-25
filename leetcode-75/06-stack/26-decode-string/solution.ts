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
if (require.main === module) {
  // Example usage:
  console.log(decodeString('3[a]2[bc]')); // "aaabcbc"
  console.log(decodeString('3[a2[c]]')); // "accaccacc"
  console.log(decodeString('2[abc]3[cd]ef')); // "abcabccdcdcdef"
}

export { decodeString };
