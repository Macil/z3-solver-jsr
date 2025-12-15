# @macil/z3-solver [![JSR](https://jsr.io/badges/@macil/z3-solver)](https://jsr.io/@macil/z3-solver)

This project is a JSR package that wraps the
[z3-solver](https://www.npmjs.com/package/z3-solver) npm package to add
compatibility with Deno. This package works around
[issues](https://github.com/denoland/deno/issues/17171) preventing the direct
use of the original package in Deno.

## Compatibility

This package uses
[source phase imports](https://github.com/tc39/proposal-source-phase-imports)
which are currently only supported in Deno and not in Node.js or Bun. Node.js
users should use the original
[z3-solver](https://www.npmjs.com/package/z3-solver) package instead of this.
