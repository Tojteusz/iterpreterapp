module.exports = {
    root:           true,
    env:            {
        browser: true,
        es2020:  true,
    },
    settings:       {
        "import/resolver": {
            typescript: {},
        },
    },
    extends:        ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parser:         "@typescript-eslint/parser",
    plugins:        ["react-refresh"],
};
