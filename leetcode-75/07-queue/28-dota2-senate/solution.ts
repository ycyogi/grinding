/**
 * LeetCode 649. Dota2 Senate
 * https://leetcode.com/problems/dota2-senate/
 *
 * Approach: model each party as a queue of surviving senators' original
 * indices. Repeatedly compare the front of each queue; the smaller index
 * acts first and bans the other, then requeues itself as index + n so
 * its relative turn order across future rounds stays correct without
 * simulating the circle explicitly.
 *
 * Time:  O(n) - each senator is enqueued/dequeued a constant number of
 *        times before being eliminated
 * Space: O(n) for the two queues
 */
function predictPartyVictory(senate: string): string {
  const n = senate.length;
  const radiant: number[] = [];
  const dire: number[] = [];

  for (let i = 0; i < n; i++) {
    if (senate[i] === 'R') radiant.push(i);
    else dire.push(i);
  }

  while (radiant.length > 0 && dire.length > 0) {
    const r = radiant.shift()!;
    const d = dire.shift()!;

    if (r < d) {
      radiant.push(r + n);
    } else {
      dire.push(d + n);
    }
  }

  return radiant.length > 0 ? 'Radiant' : 'Dire';
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
  console.log(predictPartyVictory('RD'));  // "Radiant"
  console.log(predictPartyVictory('RDD')); // "Dire"

  // Edge cases
  assertEqual(predictPartyVictory('R'), 'Radiant', 'n=1 single Radiant senator');
  assertEqual(predictPartyVictory('D'), 'Dire', 'n=1 single Dire senator');
  assertEqual(predictPartyVictory('RRRR'), 'Radiant', 'all one party (Radiant)');
  assertEqual(predictPartyVictory('DR'), 'Dire', 'reversed order of RD example');
  assertEqual(predictPartyVictory('RDRD'), 'Radiant', 'alternating pattern across two rounds');
}

export { predictPartyVictory };
