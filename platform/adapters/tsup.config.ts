import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/**/*.ts"],
  format: ["esm"],
  dts: false,
  splitting: false,
  sourcemap: true,
  clean: true,
  outDir: "dist",
  target: "es2022",
  treeshake: false,
});
