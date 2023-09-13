import { describe, test, expect } from "@jest/globals";
import { ctx, setCtx } from "./effect";
import { signal } from "./signal";

describe("signal", () => {

  test("should return the data when called without arguments", () => {
    const data = signal(0);
    expect(data()).toBe(0);
  });

  test("should update the data when called with arguments", () => {
    const data = signal(0);
    data(1);
    expect(data()).toBe(1);
  });

  test("should update the version when called with arguments", () => {
    const data = signal(0);
    data(1);
    expect(data.v).toBe(1);
  });

  test("should not update the version when called with the same data", () => {
    const data = signal(0);
    data(0);
    expect(data.v).toBe(0);
  });

  test("should update version if forced with same data", () => {
    const data = signal(0);
    data(0, true);
    expect(data.v).toBe(1);
  });

  test("should add itself to the context when called without arguments", () => {
    setCtx(new Set());
    const data = signal(0);
    data();
    expect(ctx?.has(data)).toBe(true);
  });

  test("should not add itself to the context when called with arguments", () => {
    setCtx(new Set());
    const data = signal(0);
    data(1);
    expect(ctx?.has(data)).toBe(false);
  });

  test("should call subscribers when called with arguments", () => {
    let called = false;
    const mockFn = () => {
      called = true;
    };
    const data = signal(0);
    data.fx.add(mockFn);
    data(1);
    expect(called).toBe(true);
  });

  test("should not call subscribers when called without arguments", () => {
    let called = false;
    const mockFn = () => {
      called = true;
    };
    const data = signal(0);
    data.fx.add(mockFn);
    data();
    expect(called).toBe(false);
  });
});
