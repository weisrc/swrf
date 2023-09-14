import { defineConfig } from "rollup";
import { minify, transform } from "@swc/core";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import bundleSize from "rollup-plugin-bundle-size";

const formats = ["cjs", "es", "umd", "iife"];
const extensions = [".js", ".ts"];
const output = "dist";

export default defineConfig([
  bundle("src/browser"),
  bundle("src/browser/slim", "-slim"),
  bundle("src/browser/dev", "-dev")
]);

function bundle(input, suffix = "", minify = true) {
  const plugins = [bundleSize(), swcTransform(), nodeResolve({ extensions })];
  if (minify) {
    plugins.push(swcMinify());
  }
  return {
    input,
    output: formats.map((format) => ({
      file: `${output}/swrf${suffix}.${format}.js`,
      format,
      name: "swrf"
    })),
    plugins
  };
}

function swcTransform() {
  return {
    name: "swc-transform",
    transform(code) {
      return transform(code, {
        jsc: {
          parser: {
            syntax: "typescript"
          },
          target: "es2022"
        }
      });
    }
  };
}

function swcMinify() {
  return {
    name: "swc-minify",
    renderChunk(code) {
      return minify(code, {
        compress: {
          arguments: true,
          booleans_as_integers: true,
          dead_code: true,
          hoist_funs: true,
          hoist_vars: true,
          unsafe: true,
          unsafe_arrows: true,
          unsafe_comps: true,
          unsafe_Function: true,
          unsafe_symbols: true,
          unsafe_math: true,
          unsafe_methods: true,
          unsafe_proto: true,
          unsafe_regexp: true,
          unsafe_undefined: true
        },
        mangle: {
          toplevel: true
        }
      });
    }
  };
}
