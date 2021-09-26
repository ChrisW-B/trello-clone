module.exports = {
  extends: ['eslint:recommended', 'prettier'],
  env: { es2020: true, node: true, browser: true },
  settings: { 'import/resolver': { webpack: { config: 'webpack.development.js' } } },
};
