import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import typescript from "rollup-plugin-typescript";
import pkg from "./package.json";
import path from "path";
import babel from "rollup-plugin-babel";
const resloveFile = (_path) => path.resolve(__dirname, _path);
export default {
  input: resloveFile(pkg.source),
  output: [
    {
      file: resloveFile(pkg.main),
      format: "cjs",
    },
    {
      file: resloveFile(pkg.module),
      format: "es",
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    babel({
      exclude: "node_modules/**",
      runtimeHelpers: true,
    }),
  ],
};
