import { assert, assertEquals } from "@std/assert";
import { init } from "./node.ts";

Deno.test("tsdoc example", async () => {
  const { Context } = await init();
  const { Solver, Int, isIntVal } = /*new*/ Context("main");

  const x = Int.const("x");
  const y = Int.const("y");

  const solver = new Solver();
  solver.add(x.add(2).le(y.sub(10))); // x + 2 <= y - 10

  assertEquals(await solver.check(), "sat");

  const model = solver.model();
  const vx = model.get(x);
  const vy = model.get(y);
  assert(isIntVal(vx));
  assert(isIntVal(vy));
  const diff = vy.value() - vx.value();
  assertEquals(diff, 12n);
});
