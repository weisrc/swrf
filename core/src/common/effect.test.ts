import { describe, test, expect } from "@jest/globals";
import { EffectSource } from "../types";
import { ctx, effect } from "./effect";

describe("effect", () => {
  test("should add itself to sources", () => {
    const source: EffectSource = {
      fx: new Set(),
      v: 0
    };
    effect(() => {
      ctx?.add(source);
    });
    expect(source.fx.size).toBe(1);
  });

  test("should remove itself from previous sources eventually", (done) => {
    const source: EffectSource = {
      fx: new Set(),
      v: 0
    };
    let dependOnSource = true;
    effect(() => {
      if (dependOnSource) {
        ctx?.add(source);
      }
    });
    expect(source.fx.size).toBe(1);
    dependOnSource = false;
    for (let fn of source.fx) {
      fn();
    }
    expect(source.fx.size).toBe(1);
    setTimeout(() => {
      expect(source.fx.size).toBe(0);
      done();
    });
  });

  test("should remove itself from previous sources immediately", () => {
    const source: EffectSource = {
      fx: new Set(),
      v: 0
    };
    let dependOnSource = true;
    effect(() => {
      if (dependOnSource) {
        ctx?.add(source);
      }
    });
    expect(source.fx.size).toBe(1);
    dependOnSource = false;
    for (let fn of source.fx) {
      fn(true);
    }
    expect(source.fx.size).toBe(0);
  });

  test("should not rerun if inactive despite version changes", () => {
    const source: EffectSource = {
      fx: new Set(),
      v: 0
    };
    let count = 0;
    const control = effect(() => {
      count++;
      ctx?.add(source);
    });
    expect(count).toBe(1);
    control(false);
    source.v++;
    for (let handler of source.fx) handler();
    expect(count).toBe(1);
  });

  test("should not rerun without version changes", () => {
    const source: EffectSource = {
      fx: new Set(),
      v: 0
    };
    let count = 0;
    effect(() => {
      count++;
      ctx?.add(source);
    });
    expect(count).toBe(1);
    for (let handler of source.fx) handler(true);
    expect(count).toBe(1);
  });

  test("should rerun if with version changes", () => {
    const source: EffectSource = {
      fx: new Set(),
      v: 0
    };
    let count = 0;
    effect(() => {
      count++;
      ctx?.add(source);
    });
    expect(count).toBe(1);
    source.v++;
    for (let handler of source.fx) handler(true);
    expect(count).toBe(2);
  });

  test("should rerun if version changed during inactivity on active immediately", () => {
    const source: EffectSource = {
      fx: new Set(),
      v: 0
    };
    let count = 0;
    const control = effect(() => {
      count++;
      ctx?.add(source);
    });
    expect(count).toBe(1);
    control(false);
    source.v++;
    for (let handler of source.fx) handler(true);
    expect(count).toBe(1);
    control(true, true);
    expect(count).toBe(2);
  });
});
