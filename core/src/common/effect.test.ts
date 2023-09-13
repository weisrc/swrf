import { describe, test, expect } from "@jest/globals";
import { EffectSource } from "../types";
import { ctx, effect } from "./effect";

function createSource(): EffectSource {
  return {
    fx: new Set(),
    v: 0
  };
}

function readSource(source: EffectSource) {
  ctx?.add(source);
}

function runSource(source: EffectSource, immediate?: boolean) {
  for (let handler of source.fx) {
    handler(immediate);
  }
}

function updateSource(source: EffectSource) {
  source.v++;
  runSource(source);
}

function immediateUpdateSource(source: EffectSource) {
  source.v++;
  runSource(source, true);
}

describe("effect", () => {
  test("should add itself to sources", () => {
    const source = createSource();
    effect(() => {
      readSource(source);
    });
    expect(source.fx.size).toBe(1);
  });

  test("should remove itself from previous sources eventually", (done) => {
    const source = createSource();
    let dependOnSource = true;
    effect(() => {
      if (dependOnSource) {
        readSource(source);
      }
    });
    expect(source.fx.size).toBe(1);
    dependOnSource = false;
    updateSource(source);
    expect(source.fx.size).toBe(1);
    setTimeout(() => {
      expect(source.fx.size).toBe(0);
      done();
    });
  });

  test("should remove itself from previous sources immediately", () => {
    const source = createSource();
    let dependOnSource = true;
    effect(() => {
      if (dependOnSource) {
        readSource(source);
      }
    });
    expect(source.fx.size).toBe(1);
    dependOnSource = false;
    immediateUpdateSource(source);
    expect(source.fx.size).toBe(0);
  });

  test("should not rerun if inactive despite version changes", () => {
    const source = createSource();
    let count = 0;
    const control = effect(() => {
      count++;
      readSource(source);
    });
    expect(count).toBe(1);
    control(false);
    updateSource(source);
    expect(count).toBe(1);
  });

  test("should not rerun without version changes", () => {
    const source = createSource();
    let count = 0;
    effect(() => {
      count++;
      readSource(source);
    });
    expect(count).toBe(1);
    runSource(source);
    expect(count).toBe(1);
  });

  test("should eventually rerun if version changes", (done) => {
    const source: EffectSource = {
      fx: new Set(),
      v: 0
    };
    let count = 0;
    effect(() => {
      count++;
      readSource(source);
    });
    expect(count).toBe(1);
    updateSource(source);
    setTimeout(() => {
      expect(count).toBe(2);
      done();
    });
  });

  test("should immediately rerun if version changed during inactivity on active", () => {
    const source = createSource();
    let count = 0;
    const control = effect(() => {
      count++;
      readSource(source);
    });
    expect(count).toBe(1);
    control(false);
    immediateUpdateSource(source);
    expect(count).toBe(1);
    control(true, true);
    expect(count).toBe(2);
  });
});
