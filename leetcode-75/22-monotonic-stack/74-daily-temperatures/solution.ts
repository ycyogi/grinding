/**
 * LeetCode 739. Daily Temperatures
 * https://leetcode.com/problems/daily-temperatures/
 *
 * Approach: monotonic decreasing stack of indices. Push each day's
 * index; whenever the current temperature exceeds the temperature at
 * the index on top of the stack, pop it and record the day gap.
 *
 * Time:  O(n) - each index pushed and popped at most once (amortized)
 * Space: O(n) - stack + output array in the worst case
 */
function dailyTemperatures(temperatures: number[]): number[] {
  const n = temperatures.length;
  const answer: number[] = new Array(n).fill(0);
  const stack: number[] = []; // indices, temperatures strictly decreasing

  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const j = stack.pop()!;
      answer[j] = i - j;
    }
    stack.push(i);
  }

  return answer;
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
  console.log(dailyTemperatures([73,74,75,71,69,72,76,73])); // [1,1,4,2,1,1,0,0]
  console.log(dailyTemperatures([30,40,50,60])); // [1,1,1,0]

  // Edge cases
  assertEqual(dailyTemperatures([100, 90, 80, 70]), [0, 0, 0, 0], 'strictly decreasing');
  assertEqual(
    dailyTemperatures([30, 40, 50, 60, 70]),
    [1, 1, 1, 1, 0],
    'strictly increasing'
  );
  assertEqual(dailyTemperatures([50]), [0], 'single element');
  assertEqual(
    dailyTemperatures([70, 70, 70, 70]),
    [0, 0, 0, 0],
    'all equal temperatures'
  );
  assertEqual(dailyTemperatures([70, 70, 75]), [2, 1, 0], 'plateau then rise');
}

export { dailyTemperatures };
