module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
        jest: true,
    },
    extends: ['airbnb', 'prettier'],
    parserOptions: {
        ecmaVersion: 12,
    },
    rules: {
        'no-console': 'off',
        'no-use-before-define': 'off',
        'no-underscore-dangle': 'off',
        'no-param-reassign': 'off',
        'consistent-return': 'off',
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
        'react/prop-types': 0,
        'react/react-in-jsx-scope': 0,
    },
    plugins: ['prettier'],
    globals: {
        window: 'writable',
    },
}
