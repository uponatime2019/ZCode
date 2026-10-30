import { describe, expect, it } from "vitest";

import { parseArgs, resolveUnpackedDir } from "../scripts/bundle.mjs";

// --dir 只产出 *-unpacked 目录：CI 手动打包 workflow 依赖它可以跳过安装包直接压缩成 zip。
describe("bundle 脚本的仅目录（--dir）模式", () => {
  it("显式传入 --dir 时只构建 unpacked 目录", () => {
    const options = parseArgs(["--os", "win", "--arch", "x64", "--dir"]);

    expect(options).toMatchObject({ os: "win", arch: "x64", dir: true });
  });

  it("默认仍生成安装包，避免改变既有打包流程", () => {
    const options = parseArgs(["--os", "win", "--arch", "x64"]);

    expect(options.dir).toBe(false);
  });

  it("Windows 目标解析到稳定的 unpacked 目录名", () => {
    expect(resolveUnpackedDir("win", "x64")).toMatch(/win-unpacked$/);
    expect(resolveUnpackedDir("win", "arm64")).toMatch(/win-arm64-unpacked$/);
  });
});
