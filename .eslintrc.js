module.exports = {
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  ignorePatterns: ['**/*.js', "**/*.d.ts"],
  rules: {
    semi: ['error', 'never'],
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'no-console': 'off',
    'linebreak-style': 'off'
  },
  "globals": {
    "window": true,
    "document": true
  },
  "env": {
    "browser": true
  }        
}