import initModule_ from "./z3-built.cjs";

// @ts-types="./wasmModule.d.ts"
import { wasmModule } from "./wasmModule.js";

export default function initModuleWrapper(
  moduleArg?: unknown,
): Promise<unknown> {
  return initModule_({
    // deno-lint-ignore no-explicit-any
    ...(moduleArg as any),
    async instantiateWasm(
      imports: WebAssembly.Imports,
      receiveInstance: (
        instance: WebAssembly.Instance,
        module: WebAssembly.Module,
      ) => void,
    ) {
      const wasmInstance = await WebAssembly.instantiate(wasmModule, imports);
      receiveInstance(wasmInstance, wasmModule);
    },
  });
}
