# 65. Best Time to Buy and Sell Stock with Transaction Fee

- **LeetCode:** [714. Best Time to Buy and Sell Stock with Transaction Fee](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/)
- **Difficulty:** Medium
- **Category:** Dynamic Programming (Multidimensional)
- **Pattern:** Two-state rolling DP (hold / not-hold)

## Problem

You are given an array `prices` where `prices[i]` is the price of a
given stock on the `i`th day, and an integer `fee` representing a
transaction fee.

Find the maximum profit you can achieve. You may complete as many
transactions as you like, but you need to pay the transaction fee for
each transaction.

Note: you may not engage in multiple transactions simultaneously (i.e.
you must sell the stock before you buy again).

**Example 1**
```
Input:  prices = [1,3,2,8,4,9], fee = 2
Output: 8
Explanation: The maximum profit can be achieved by:
- Buying at prices[0] = 1
- Selling at prices[3] = 8
- Buying at prices[4] = 4
- Selling at prices[5] = 9
The total profit is ((8 - 1) - 2) + ((9 - 4) - 2) = 5 + 3 = 8.
```

**Example 2**
```
Input:  prices = [1,3,7,5,10,3], fee = 3
Output: 6
```

**Constraints**
- `1 <= prices.length <= 5 * 10^4`
- `1 <= prices[i] < 5 * 10^4`
- `0 <= fee < 5 * 10^4`

## Approach

This is naturally a 2D DP over `(day, holding-state)`, but because each
day's values only depend on the immediately preceding day, it collapses
to two rolling variables — the same trick used for the other 1D-DP
problems, here applied to a two-state machine instead of a single
sequence.

**State:** on each day `i`, track two quantities:
- `cash[i]` = max profit achievable by day `i` **not holding** any
  stock.
- `hold[i]` = max profit achievable by day `i` **holding** one share of
  stock.

**Base cases:** `cash[0] = 0` (no stock, no profit yet), `hold[0] =
-prices[0]` (bought on day 0, profit is negative the purchase price).

**Transition:** for each day `i >= 1`, two decisions to consider from
each state:
- To be in `cash` on day `i`: either you were already in `cash` on day
  `i-1` and did nothing, or you were `hold`ing and sold today (pay the
  fee once, at sell time):
  ```
  cash[i] = max(cash[i-1], hold[i-1] + prices[i] - fee)
  ```
- To be `hold`ing on day `i`: either you were already `hold`ing and did
  nothing, or you were in `cash` and bought today:
  ```
  hold[i] = max(hold[i-1], cash[i-1] - prices[i])
  ```

**Answer:** `cash[n-1]` — ending while holding a share can never be
better than having sold it, so the max profit is always achieved not
holding stock at the end.

Since day `i` only depends on day `i-1`, roll `cash` and `hold` forward
in two scalar variables instead of two arrays:

1. `cash = 0`, `hold = -prices[0]`.
2. For each subsequent price `p` in `prices[1:]`:
   `newCash = max(cash, hold + p - fee)`;
   `newHold = max(hold, cash - p)`;
   update `cash = newCash`, `hold = newHold` (compute both from the old
   values before overwriting either).
3. Return `cash`.

## Complexity

- **Time:** `O(n)` — one pass over the prices, updating both states
  once per day.
- **Space:** `O(1)` — two rolling variables (`cash`, `hold`) instead of
  two `O(n)` arrays.
