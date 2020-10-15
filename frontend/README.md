# frontend

## Setting up and running
_Note: Requires that [yarn](https://classic.yarnpkg.com/en/) be installed._

- `yarn install` to download all required dependencies
- `yarn start` to start the development server running at https://localhost:3000 by default

## Linting/code style

There are some pre-commit hooks configured to ensure that all code checked in is styled properly. Most warnings and errors can be fixed automatically using the following two commands:

- `yarn prettier:write` to format all HTML, CSS, and TypeScript files
- `yarn eslint:fix` to fix auto-fixable linting issues (like import sorting or potential bug patterns)
