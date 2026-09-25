# LeetCode 75 — Offline Practice Set

All 75 problems from LeetCode's official ["LeetCode 75"](https://leetcode.com/studyplan/leetcode-75/)
study plan, organized by topic. Every problem folder is fully self-contained
(problem statement + approach + complexity + working TypeScript and Python
solutions) so it can be read and worked through with **no internet access**.

## How to use this offline

- Each problem folder has three files:
  - `README.md` — problem statement (paraphrased, with constraints and examples), approach walkthrough, and time/space complexity.
  - `solution.ts` — an optimal TypeScript solution using LeetCode's actual function/class signature, paste-ready.
  - `solution.py` — an optimal Python solution as a `class Solution` (or the required class API), paste-ready, with a runnable `__main__` demo.
- Suggested workflow: read the `## Problem` section only, try to solve it from scratch on paper or in a scratch file, *then* open `## Approach` to check your reasoning, then compare against the code.
- Python files run standalone: `python3 solution.py`. TypeScript files need a TS runtime (`ts-node solution.ts`) — if you don't have one on the ship, just read/trace them by hand, which is good practice anyway.
- All solutions were verified (type-checked under `tsc --strict` / executed against the worked examples) before being committed.

## Suggested 3-day pace

75 problems over 3 days ≈ 25/day. A reasonable split that keeps easier warm-up
topics earlier each day and mixes in a couple of harder DP/graph problems
once you're warmed up:

| Day | Categories | Problems |
|---|---|---|
| 1 | Array/String, Two Pointers, Sliding Window, Prefix Sum, Hash Map/Set, Stack, Queue | 1–28 |
| 2 | Linked List, Binary Tree DFS/BFS, Binary Search Tree, Graphs DFS/BFS, Heap, Binary Search | 29–56 |
| 3 | Backtracking, DP (1D + Multidimensional), Bit Manipulation, Trie, Intervals, Monotonic Stack | 57–75 |

## Index

### [01. Array / String](01-array-string)
| # | Problem | Difficulty |
|---|---|---|
| 1 | [Merge Strings Alternately](01-array-string/01-merge-strings-alternately) | Easy |
| 2 | [Greatest Common Divisor of Strings](01-array-string/02-greatest-common-divisor-of-strings) | Easy |
| 3 | [Kids With the Greatest Number of Candies](01-array-string/03-kids-with-the-greatest-number-of-candies) | Easy |
| 4 | [Can Place Flowers](01-array-string/04-can-place-flowers) | Easy |
| 5 | [Reverse Vowels of a String](01-array-string/05-reverse-vowels-of-a-string) | Easy |
| 6 | [Reverse Words in a String](01-array-string/06-reverse-words-in-a-string) | Medium |
| 7 | [Product of Array Except Self](01-array-string/07-product-of-array-except-self) | Medium |
| 8 | [Increasing Triplet Subsequence](01-array-string/08-increasing-triplet-subsequence) | Medium |
| 9 | [String Compression](01-array-string/09-string-compression) | Medium |

### [02. Two Pointers](02-two-pointers)
| # | Problem | Difficulty |
|---|---|---|
| 10 | [Move Zeroes](02-two-pointers/10-move-zeroes) | Easy |
| 11 | [Is Subsequence](02-two-pointers/11-is-subsequence) | Easy |
| 12 | [Container With Most Water](02-two-pointers/12-container-with-most-water) | Medium |
| 13 | [Max Number of K-Sum Pairs](02-two-pointers/13-max-number-of-k-sum-pairs) | Medium |

### [03. Sliding Window](03-sliding-window)
| # | Problem | Difficulty |
|---|---|---|
| 14 | [Maximum Average Subarray I](03-sliding-window/14-maximum-average-subarray-i) | Easy |
| 15 | [Maximum Number of Vowels in a Substring of Given Length](03-sliding-window/15-maximum-number-of-vowels-in-a-substring-of-given-length) | Medium |
| 16 | [Max Consecutive Ones III](03-sliding-window/16-max-consecutive-ones-iii) | Medium |
| 17 | [Longest Subarray of 1's After Deleting One Element](03-sliding-window/17-longest-subarray-of-1s-after-deleting-one-element) | Medium |

### [04. Prefix Sum](04-prefix-sum)
| # | Problem | Difficulty |
|---|---|---|
| 18 | [Find the Highest Altitude](04-prefix-sum/18-find-the-highest-altitude) | Easy |
| 19 | [Find Pivot Index](04-prefix-sum/19-find-pivot-index) | Easy |

### [05. Hash Map / Hash Set](05-hash-map-set)
| # | Problem | Difficulty |
|---|---|---|
| 20 | [Find the Difference of Two Arrays](05-hash-map-set/20-find-the-difference-of-two-arrays) | Easy |
| 21 | [Unique Number of Occurrences](05-hash-map-set/21-unique-number-of-occurrences) | Easy |
| 22 | [Determine if Two Strings Are Close](05-hash-map-set/22-determine-if-two-strings-are-close) | Medium |
| 23 | [Equal Row and Column Pairs](05-hash-map-set/23-equal-row-and-column-pairs) | Medium |

### [06. Stack](06-stack)
| # | Problem | Difficulty |
|---|---|---|
| 24 | [Removing Stars From a String](06-stack/24-removing-stars-from-a-string) | Medium |
| 25 | [Asteroid Collision](06-stack/25-asteroid-collision) | Medium |
| 26 | [Decode String](06-stack/26-decode-string) | Medium |

### [07. Queue](07-queue)
| # | Problem | Difficulty |
|---|---|---|
| 27 | [Number of Recent Calls](07-queue/27-number-of-recent-calls) | Easy |
| 28 | [Dota2 Senate](07-queue/28-dota2-senate) | Medium |

### [08. Linked List](08-linked-list)
| # | Problem | Difficulty |
|---|---|---|
| 29 | [Delete the Middle Node of a Linked List](08-linked-list/29-delete-the-middle-node-of-a-linked-list) | Medium |
| 30 | [Odd Even Linked List](08-linked-list/30-odd-even-linked-list) | Medium |
| 31 | [Reverse Linked List](08-linked-list/31-reverse-linked-list) | Easy |
| 32 | [Maximum Twin Sum of a Linked List](08-linked-list/32-maximum-twin-sum-of-a-linked-list) | Medium |

### [09. Binary Tree — DFS](09-binary-tree-dfs)
| # | Problem | Difficulty |
|---|---|---|
| 33 | [Maximum Depth of Binary Tree](09-binary-tree-dfs/33-maximum-depth-of-binary-tree) | Easy |
| 34 | [Leaf-Similar Trees](09-binary-tree-dfs/34-leaf-similar-trees) | Easy |
| 35 | [Count Good Nodes in Binary Tree](09-binary-tree-dfs/35-count-good-nodes-in-binary-tree) | Medium |
| 36 | [Path Sum III](09-binary-tree-dfs/36-path-sum-iii) | Medium |
| 37 | [Longest ZigZag Path in a Binary Tree](09-binary-tree-dfs/37-longest-zigzag-path-in-a-binary-tree) | Medium |
| 38 | [Lowest Common Ancestor of a Binary Tree](09-binary-tree-dfs/38-lowest-common-ancestor-of-a-binary-tree) | Medium |

### [10. Binary Tree — BFS](10-binary-tree-bfs)
| # | Problem | Difficulty |
|---|---|---|
| 39 | [Binary Tree Right Side View](10-binary-tree-bfs/39-binary-tree-right-side-view) | Medium |
| 40 | [Maximum Level Sum of a Binary Tree](10-binary-tree-bfs/40-maximum-level-sum-of-a-binary-tree) | Medium |

### [11. Binary Search Tree](11-binary-search-tree)
| # | Problem | Difficulty |
|---|---|---|
| 41 | [Search in a Binary Search Tree](11-binary-search-tree/41-search-in-a-binary-search-tree) | Easy |
| 42 | [Delete Node in a BST](11-binary-search-tree/42-delete-node-in-a-bst) | Medium |

### [12. Graphs — DFS](12-graphs-dfs)
| # | Problem | Difficulty |
|---|---|---|
| 43 | [Keys and Rooms](12-graphs-dfs/43-keys-and-rooms) | Medium |
| 44 | [Number of Provinces](12-graphs-dfs/44-number-of-provinces) | Medium |
| 45 | [Reorder Routes to Make All Paths Lead to the City Zero](12-graphs-dfs/45-reorder-routes-to-make-all-paths-lead-to-the-city-zero) | Medium |
| 46 | [Evaluate Division](12-graphs-dfs/46-evaluate-division) | Medium |

### [13. Graphs — BFS](13-graphs-bfs)
| # | Problem | Difficulty |
|---|---|---|
| 47 | [Nearest Exit from Entrance in Maze](13-graphs-bfs/47-nearest-exit-from-entrance-in-maze) | Medium |
| 48 | [Rotting Oranges](13-graphs-bfs/48-rotting-oranges) | Medium |

### [14. Heap / Priority Queue](14-heap-priority-queue)
| # | Problem | Difficulty |
|---|---|---|
| 49 | [Kth Largest Element in an Array](14-heap-priority-queue/49-kth-largest-element-in-an-array) | Medium |
| 50 | [Smallest Number in Infinite Set](14-heap-priority-queue/50-smallest-number-in-infinite-set) | Medium |
| 51 | [Maximum Subsequence Score](14-heap-priority-queue/51-maximum-subsequence-score) | Medium |
| 52 | [Total Cost to Hire K Workers](14-heap-priority-queue/52-total-cost-to-hire-k-workers) | Medium |

### [15. Binary Search](15-binary-search)
| # | Problem | Difficulty |
|---|---|---|
| 53 | [Guess Number Higher or Lower](15-binary-search/53-guess-number-higher-or-lower) | Easy |
| 54 | [Successful Pairs of Spells and Potions](15-binary-search/54-successful-pairs-of-spells-and-potions) | Medium |
| 55 | [Find Peak Element](15-binary-search/55-find-peak-element) | Medium |
| 56 | [Koko Eating Bananas](15-binary-search/56-koko-eating-bananas) | Medium |

### [16. Backtracking](16-backtracking)
| # | Problem | Difficulty |
|---|---|---|
| 57 | [Letter Combinations of a Phone Number](16-backtracking/57-letter-combinations-of-a-phone-number) | Medium |
| 58 | [Combination Sum III](16-backtracking/58-combination-sum-iii) | Medium |

### [17. Dynamic Programming — 1D](17-dp-1d)
| # | Problem | Difficulty |
|---|---|---|
| 59 | [N-th Tribonacci Number](17-dp-1d/59-n-th-tribonacci-number) | Easy |
| 60 | [Min Cost Climbing Stairs](17-dp-1d/60-min-cost-climbing-stairs) | Easy |
| 61 | [House Robber](17-dp-1d/61-house-robber) | Medium |
| 62 | [Domino and Tromino Tiling](17-dp-1d/62-domino-and-tromino-tiling) | Medium |

### [18. Dynamic Programming — Multidimensional](18-dp-multidimensional)
| # | Problem | Difficulty |
|---|---|---|
| 63 | [Unique Paths](18-dp-multidimensional/63-unique-paths) | Medium |
| 64 | [Longest Common Subsequence](18-dp-multidimensional/64-longest-common-subsequence) | Medium |
| 65 | [Best Time to Buy and Sell Stock with Transaction Fee](18-dp-multidimensional/65-best-time-to-buy-and-sell-stock-with-transaction-fee) | Medium |
| 66 | [Edit Distance](18-dp-multidimensional/66-edit-distance) | Hard |

### [19. Bit Manipulation](19-bit-manipulation)
| # | Problem | Difficulty |
|---|---|---|
| 67 | [Counting Bits](19-bit-manipulation/67-counting-bits) | Easy |
| 68 | [Single Number](19-bit-manipulation/68-single-number) | Easy |
| 69 | [Minimum Flips to Make a OR b Equal to c](19-bit-manipulation/69-minimum-flips-to-make-a-or-b-equal-to-c) | Medium |

### [20. Trie](20-trie)
| # | Problem | Difficulty |
|---|---|---|
| 70 | [Implement Trie (Prefix Tree)](20-trie/70-implement-trie-prefix-tree) | Medium |
| 71 | [Search Suggestions System](20-trie/71-search-suggestions-system) | Medium |

### [21. Intervals](21-intervals)
| # | Problem | Difficulty |
|---|---|---|
| 72 | [Non-overlapping Intervals](21-intervals/72-non-overlapping-intervals) | Medium |
| 73 | [Minimum Number of Arrows to Burst Balloons](21-intervals/73-minimum-number-of-arrows-to-burst-balloons) | Medium |

### [22. Monotonic Stack](22-monotonic-stack)
| # | Problem | Difficulty |
|---|---|---|
| 74 | [Daily Temperatures](22-monotonic-stack/74-daily-temperatures) | Medium |
| 75 | [Online Stock Span](22-monotonic-stack/75-online-stock-span) | Medium |
