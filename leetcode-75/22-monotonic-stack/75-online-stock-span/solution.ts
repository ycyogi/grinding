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

// Example usage:
// const spanner = new StockSpanner();
// spanner.next(100); // 1
// spanner.next(80);  // 1
// spanner.next(60);  // 1
// spanner.next(70);  // 2
// spanner.next(60);  // 1
// spanner.next(75);  // 4
// spanner.next(85);  // 6

export { StockSpanner };
