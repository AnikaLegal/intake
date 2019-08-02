module.exports = {
  parser: 'babel-eslint',
  plugins: ['react', 'flowtype'],
  env: {
    browser: true,
    es6: true,
  },
  settings: {
    flowtype: {
      onlyFilesWithFlowAnnotation: false,
    },
  },
  rules: {
    // Ensure linted understands React style JSX
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    // There should never be unused variables.
    // 'no-unused-vars': [
    //   'error',
    //   {
    //     vars: 'all',
    //     args: 'after-used',
    //     ignoreRestSiblings: false,
    //     varsIgnorePattern: 'React',
    //   },
    // ],
  },
}
