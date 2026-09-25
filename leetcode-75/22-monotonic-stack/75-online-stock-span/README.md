# 75. Online Stock Span

- **LeetCode:** [901. Online Stock Span](https://leetcode.com/problems/online-stock-span/)
- **Difficulty:** Medium
- **Category:** Monotonic Stack
- **Pattern:** Monotonic non-increasing stack of (price, span) pairs

## Problem

Design an algorithm that collects daily price quotes for a stock and
returns the **span** of that stock's price for the current day.

The span of the stock's price today is defined as the maximum number of
consecutive days (starting from today and going backward) for which the
price of the stock was less than or equal to today's price.

- For example, if the price of a stock over the next 7 days were
  `[100,80,60,70,60,75,85]`, then the stock spans would be
  `[1,1,1,2,1,4,6]`.

Implement the `StockSpanner` class:

- `StockSpanner()` Initializes the object of the class.
- `int next(int price)` Returns the span of the stock's price given that
  today's price is `price`.

**Example**
```
Input:
  ["StockSpanner", "next", "next", "next", "next", "next", "next", "next"]
  [[], [100], [80], [60], [70], [60], [75], [85]]
Output:
  [null, 1, 1, 1, 2, 1, 4, 6]

Explanation:
StockSpanner spanner = new StockSpanner();
spanner.next(100); // return 1
spanner.next(80);  // return 1
spanner.next(60);  // return 1
spanner.next(70);  // return 2
spanner.next(60);  // return 1
spanner.next(75);  // return 4
spanner.next(85);  // return 6
```

**Constraints**
- `1 <= price <= 10^5`
- At most `10^4` calls will be made to `next`.

## Approach

Brute force would rescan backward through all previous prices on every
call, giving `O(n)` per call and `O(n²)` overall. Instead, use a
monotonic stack that stores `[price, span]` pairs, keeping prices
**non-increasing** from bottom to top, and collapse runs of
smaller-or-equal prices into the current entry's span.

On each `next(price)` call:
1. Start `span = 1` (today counts as 1 day by itself).
2. While the stack is non-empty **and** the price on top of the stack is
   `<= price`: pop `[prevPrice, prevSpan]` off the stack and add
   `prevSpan` to `span` — that whole run of smaller-or-equal days is
   now "absorbed" into today's span, since today's price also covers
   whatever days those absorbed prices covered.
3. Push `[price, span]` onto the stack.
4. Return `span`.

This works because once a price gets absorbed into a later, larger (or
equal) price's span, it can never contribute to any future day's span
on its own again — any future price that would have reached back past
it will also reach back past the absorbing price, so it's safe to
collapse them into one entry.

## Complexity

- **Time:** `O(1)` amortized per `next` call — each `[price, span]`
  entry is pushed once and popped at most once across the whole
  sequence of calls, so total work across `n` calls is `O(n)` overall.
  Brute force would be `O(n)` per call, `O(n²)` overall.
- **Space:** `O(n)` for the stack in the worst case (e.g. strictly
  decreasing prices, where every call pushes without ever popping).

## Edge Cases

| `next(price)` calls | Expected spans | Why it matters |
|---|---|---|
| `10, 20, 30, 40` | `1, 2, 3, 4` | Strictly increasing prices — every call absorbs everything pushed so far, so spans grow by exactly one each time. |
| `40, 30, 20, 10` | `1, 1, 1, 1` | Strictly decreasing prices — nothing is ever absorbed, so every span stays `1`. |
| `50, 50, 50` | `1, 2, 3` | All-equal prices — the pop condition is `<=`, so an equal price *is* absorbed, not just a strictly smaller one. |
| `100` (single call, fresh spanner) | `1` | Minimum case: the very first call always returns `1`. |
| `50, 30, 50` | `1, 1, 3` | Down then back up to match the earlier price exactly — the third call must pop through *two* stack levels (the `30` entry, then the `50` entry) in one call. |
