// Deno doesn't support source phase imports in Typescript yet, so this file is
// in JS with a separate .d.ts file for types.
import source wasmModule from "z3-solver/build/z3-built.wasm";
export { wasmModule };
