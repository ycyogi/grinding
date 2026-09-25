/**
 * LeetCode 901. Online Stock Span
 * https://leetcode.com/problems/online-stock-span/
 *
 * Approach: monotonic non-increasing stack of [price, span] pairs.
 * Each next() call pops every stack entry whose price is <= today's
 * price, folding its span into today's, since those days are now
 * covered by today's larger-or-equal price too.
 *
 * Time:  O(1) amortized per call - each entry pushed once, popped once
 * Space: O(n) for the stack in the worst case
 */
class StockSpanner {
  private stack: Array<[number, number]> = []; // [price, span]

  next(price: number): number {
    let span = 1;

    while (this.stack.length > 0 && this.stack[this.stack.length - 1][0] <= price) {
      const [, prevSpan] = this.stack.pop()!;
      span += prevSpan;
    }

    this.stack.push([price, span]);
    return span;
  }
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
  const spanner = new StockSpanner();
  console.log(spanner.next(100)); // 1
  console.log(spanner.next(80));  // 1
  console.log(spanner.next(60));  // 1
  console.log(spanner.next(70));  // 2
  console.log(spanner.next(60));  // 1
  console.log(spanner.next(75));  // 4
  console.log(spanner.next(85));  // 6

  // Edge cases

  // Scenario: strictly increasing prices
  const s1 = new StockSpanner();
  assertEqual(s1.next(10), 1, 'increasing: day1');
  assertEqual(s1.next(20), 2, 'increasing: day2');
  assertEqual(s1.next(30), 3, 'increasing: day3');
  assertEqual(s1.next(40), 4, 'increasing: day4');

  // Scenario: strictly decreasing prices
  const s2 = new StockSpanner();
  assertEqual(s2.next(40), 1, 'decreasing: day1');
  assertEqual(s2.next(30), 1, 'decreasing: day2');
  assertEqual(s2.next(20), 1, 'decreasing: day3');
  assertEqual(s2.next(10), 1, 'decreasing: day4');

  // Scenario: all-equal prices
  const s3 = new StockSpanner();
  assertEqual(s3.next(50), 1, 'equal prices: day1');
  assertEqual(s3.next(50), 2, 'equal prices: day2');
  assertEqual(s3.next(50), 3, 'equal prices: day3');

  // Scenario: single call on a fresh spanner
  const s4 = new StockSpanner();
  assertEqual(s4.next(100), 1, 'single call');

  // Scenario: down then back up to match the earlier price exactly
  const s5 = new StockSpanner();
  assertEqual(s5.next(50), 1, 'down-up: day1');
  assertEqual(s5.next(30), 1, 'down-up: day2');
  assertEqual(s5.next(50), 3, 'down-up: day3 (two-level absorption)');
}

export { StockSpanner };
