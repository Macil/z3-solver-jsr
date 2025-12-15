// based on https://raw.githubusercontent.com/Z3Prover/z3/refs/tags/z3-4.15.4/src/api/js/src/node.ts

import initModule from "./z3-built-wrapper.ts";

import {
  createApi,
  type Z3HighLevel,
} from "z3-solver/build/high-level/index.js";
import {
  init as initWrapper,
  type Z3LowLevel,
} from "z3-solver/build/low-level/index.js";
export * from "z3-solver/build/high-level/types.js";
export type { Z3Core, Z3LowLevel } from "z3-solver/build/low-level/index.js";
export * from "z3-solver/build/low-level/types.__GENERATED__.js";

/**
 * The main entry point to the Z3 API
 *
 * ```typescript
 * import { init } from 'z3-solver';
 *
 * const { Context } = await init();
 * const { Solver, Int } = new Context('main');
 *
 * const x = Int.const('x');
 * const y = Int.const('y');
 *
 * const solver = new Solver();
 * solver.add(x.add(2).le(y.sub(10))); // x + 2 <= y - 10
 *
 * if (await solver.check() !== 'sat') {
 *   throw new Error("couldn't find a solution")
 * }
 * const model = solver.model();
 *
 * console.log(`x=${model.get(x)}, y=${model.get(y)}`);
 * // x=0, y=12
 * ```
 * @category Global */
export async function init(): Promise<Z3HighLevel & Z3LowLevel> {
  const lowLevel = await initWrapper(initModule);
  const highLevel = createApi(lowLevel.Z3);
  return { ...lowLevel, ...highLevel };
}
