import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("NeuroNest visual rendering contract", () => {
  it("keeps a visible device fallback when WebGL rendering is unavailable", () => {
    const appSource = readFileSync(new URL("./App.jsx", import.meta.url), "utf8");

    expect(appSource).toContain("fallback={<StaticDevicePreview");
  });

  it("guards the narrow layout against viewport overflow", () => {
    const cssSource = readFileSync(new URL("./styles.css", import.meta.url), "utf8");

    expect(cssSource).toContain("overflow-x: hidden");
    expect(cssSource).toContain("max-width: calc(100vw - 36px)");
  });

  it("keeps the device shell and fallback in pink shades", () => {
    const appSource = readFileSync(new URL("./App.jsx", import.meta.url), "utf8");
    const cssSource = readFileSync(new URL("./styles.css", import.meta.url), "utf8");

    expect(appSource).toContain("#b83f78");
    expect(appSource).toContain("#ffbad0");
    expect(cssSource).toContain("#b83f78");
    expect(cssSource).toContain("#fff1f7");
  });
});
