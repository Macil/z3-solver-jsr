// based on https://raw.githubusercontent.com/Z3Prover/z3/refs/tags/z3-4.15.4/src/api/js/src/node.ts

import initModule from "./z3-built-wrapper.ts";

import {
  createApi,
  type Z3HighLevel as Z3HighLevel_,
} from "z3-solver/build/high-level/index.js";
import {
  init as initWrapper,
  type Z3LowLevel,
} from "z3-solver/build/low-level/index.js";
export * from "z3-solver/build/high-level/types.js";
export type { Z3Core, Z3LowLevel } from "z3-solver/build/low-level/index.js";
export * from "z3-solver/build/low-level/types.__GENERATED__.js";

// Include patch to ContextCtor type from https://github.com/Z3Prover/z3/pull/8073
import type { Context } from "z3-solver/build/high-level/index.js";
/** @ignore */
export interface ContextCtor {
  <Name extends string>(
    name: Name,
    // deno-lint-ignore no-explicit-any
    options?: Record<string, any>,
  ): Context<Name>;
  new <Name extends string>(
    name: Name,
    // deno-lint-ignore no-explicit-any
    options?: Record<string, any>,
  ): Context<Name>;
}
/** @ignore */
export interface Z3HighLevel extends Z3HighLevel_ {
  /**
   * Use this to create new contexts
   * @see {@link Context}
   */
  readonly Context: ContextCtor;
}

/**
 * The main entry point to the Z3 API
 *
 * ```typescript
 * import { init } from "@macil/z3-solver";
 *
 * const { Context } = await init();
 * const { Solver, Int } = new Context("main");
 *
 * const x = Int.const("x");
 * const y = Int.const("y");
 *
 * const solver = new Solver();
 * solver.add(x.add(2).le(y.sub(10))); // x + 2 <= y - 10
 *
 * if (await solver.check() !== "sat") {
 *   throw new Error("couldn't find a solution");
 * }
 * const model = solver.model();
 *
 * console.log(`x=${model.get(x)}, y=${model.get(y)}`);
 * // x=0, y=12
 * ```
 * @category Global */
export async function init(): Promise<Z3HighLevel & Z3LowLevel> {
  const lowLevel = await initWrapper(initModule);
  const highLevel = createApi(lowLevel.Z3) as Z3HighLevel;
  return { ...lowLevel, ...highLevel };
}
