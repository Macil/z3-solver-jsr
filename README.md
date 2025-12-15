# @macil/z3-solver [![JSR](https://jsr.io/badges/@macil/z3-solver)](https://jsr.io/@macil/z3-solver)

This project is a JSR package that wraps the
[z3-solver](https://www.npmjs.com/package/z3-solver) npm package to add
compatibility with Deno. This package works around
[issues](https://github.com/denoland/deno/issues/17171) preventing the direct
use of the original package in Deno.

## Example

```ts
import { init } from "@macil/z3-solver";

const { Context } = await init();
const { Solver, Int } = new Context("main");

const x = Int.const("x");
const y = Int.const("y");

const solver = new Solver();
solver.add(x.add(2).le(y.sub(10))); // x + 2 <= y - 10

if (await solver.check() !== "sat") {
  throw new Error("couldn't find a solution");
}
const model = solver.model();

console.log(`x=${model.get(x)}, y=${model.get(y)}`);
// x=0, y=12
```

## Compatibility

This package uses
[source phase imports](https://github.com/tc39/proposal-source-phase-imports)
which are currently only supported in Deno and not in Node.js or Bun. Node.js
users should use the original
[z3-solver](https://www.npmjs.com/package/z3-solver) package instead of this.
