import commonjs from "rollup-plugin-commonjs";
import nodeResolve from "rollup-plugin-node-resolve";
import vue from "rollup-plugin-vue";

export default {
  input: "src/index.js",
  output: {
    file: "dist/scoop-form.js",
    format: "esm"
  },
  external: ["vue", "lodash/merge"],
  plugins: [
    nodeResolve({ jsnext: true }),
    commonjs(),
    vue()
  ]
};