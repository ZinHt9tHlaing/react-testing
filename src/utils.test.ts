import { describe, expect, it } from "vitest";
import { cube, subtract, sum } from "./utils/calculateTest";

describe("utils", () => {
  it("check 1 equal 1", () => {
    expect(1).toEqual(1);
  });

  it("check sum result", () => {
    const result = sum(1, 2);
    expect(result).toEqual(3);
  });

  it("check cube result", () => {
    const result = cube(2);
    expect(result).toEqual(8);
  });
});
