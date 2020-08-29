
import babel from '@rollup/plugin-babel';
export default {
  input: 'lib/index',
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: true
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true
    },
    {
      file: 'dist/index.umd.js',
      format: 'umd',
      sourcemap: true,
      name: 'throttleDebounce'
    }
  ],
  plugins: [babel({ babelHelpers: 'bundled' })]
};
