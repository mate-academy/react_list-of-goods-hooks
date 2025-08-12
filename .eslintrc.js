module.exports = {
  parser: '@typescript-eslint/parser', // usa parser do TS
  parserOptions: {
    ecmaVersion: 2020, // suporta sintaxe moderna
    sourceType: 'module', // permite import/export
    ecmaFeatures: {
      jsx: true, // habilita JSX
    },
  },
  settings: {
    react: {
      version: 'detect', // detecta versão do React automaticamente
    },
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',         // regras para React
    'plugin:@typescript-eslint/recommended', // regras para TS
    'plugin:react-hooks/recommended',   // regras hooks React
    'plugin:prettier/recommended',      // integração ESLint + Prettier
  ],
  plugins: ['react', '@typescript-eslint'],
  rules: {
    // regras personalizadas aqui (exemplo:)
    'react/react-in-jsx-scope': 'off', // React 17+ não precisa importar React no JSX
    '@typescript-eslint/explicit-function-return-type': 'off', // pode ativar se quiser
  },
};
