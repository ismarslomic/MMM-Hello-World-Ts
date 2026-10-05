# Magic Mirror module: Hello world

[![CodeQL](https://github.com/ismarslomic/MMM-Hello-World-Ts/actions/workflows/codeql.yml/badge.svg)](https://github.com/ismarslomic/MMM-Hello-World-Ts/actions/workflows/codeql.yml)
[![ESLint](https://github.com/ismarslomic/MMM-Hello-World-Ts/actions/workflows/eslint.yml/badge.svg)](https://github.com/ismarslomic/MMM-Hello-World-Ts/actions/workflows/eslint.yml)
[![ESLint](https://github.com/ismarslomic/MMM-Hello-World-Ts/actions/workflows/build.yml/badge.svg)](https://github.com/ismarslomic/MMM-Hello-World-Ts/actions/workflows/build.yml)
[![E2E tests](https://github.com/ismarslomic/MMM-Hello-World-Ts/actions/workflows/e2e-tests.yml/badge.svg)](https://github.com/ismarslomic/MMM-Hello-World-Ts/actions/workflows/e2e-tests.yml)
[![Unit tests](https://codecov.io/gh/ismarslomic/MMM-Hello-World-Ts/branch/main/graph/badge.svg?token=MQPHY294KB)](https://codecov.io/gh/ismarslomic/MMM-Hello-World-Ts)

> Simple Magic Mirror module written in Typescript demonstrating use of
> the [core module file ](https://docs.magicmirror.builders/development/core-module-file.html#available-module-instance-properties) (
> frontend)
> and [node helper](https://docs.magicmirror.builders/development/node-helper.html) (backend) in addition to using
> the [nunjucks](https://mozilla.github.io/nunjucks/) templates for rendering data.
>
> The transpiled JavaScript files should work in the same way as the original JavaScript
> module [MMM-Hello-World](https://github.com/ismarslomic/MMM-Hello-World).

## Example screenshot

![Screenshot](screenshot.png)

## Installing the module

1. Navigate to the `MagicMirror/modules` directory and execute the following command

   ```sh
   git clone https://github.com/ismarslomic/MMM-Hello-World-Ts.git
   ```

2. Change into the `MMM-Hello-World-Ts` module folder and install runtime dependencies with
   ```sh
   cd MMM-Hello-World-Ts
   npm run install:dep
   ```

## Using the module

To use this module, add the following configuration block to the modules array in
the `config/config.js` file:

```js
var config = {
  modules: [
    {
      module: 'MMM-Hello-World-Ts',
      position: 'top_left',
      config: {
        text: 'Hello world Ismar!',
      },
    },
  ],
}
```

### Polling options

| Option            | Default | Behavior                                                                                     |
| ----------------- | ------- | -------------------------------------------------------------------------------------------- |
| `updateInterval`  | `10000` | Milliseconds between requests. Invalid values fall back to the default.                      |
| `pauseWhenHidden` | `false` | Set to `true` to stop polling in `suspend()` and fetch fresh data immediately in `resume()`. |

The default continues polling while hidden, preserving existing behavior. Repeated start or resume calls never create duplicate timers.

## Development

1. Clone the repository and select Node.js 24 (`nvm use` reads `.nvmrc`)
2. Install the dependencies with `npm ci`
3. Automatically recompile the _TypeScript_ files when they are changed with `npm run dev:watch` or run
   explicitly with `npm run build`

The `pre-commit` hook only lints and formats staged files. It hides unstaged edits while rebuilding and staging the JavaScript bundles for TypeScript changes. Hooks are skipped in CI and production installs without development dependencies.

Note! `pre-commit` hook is configured to run _eslint_, _prettier_ and _build_ before committing the changes to git,
see [lint-staged](lint-staged.config.mjs) and [husky pre-commit](.husky/pre-commit) configuration files.

### Temporary dependency overrides

A scoped npm override keeps deprecated packages out of the development install while preserving SARIF reporting:

- `@microsoft/eslint-formatter-sarif` uses the project's ESLint version through `$eslint` instead of installing end-of-life ESLint 8. Remove this override when the formatter supports the project's ESLint version in its dependency or peer dependency range.

When changing the override, run `npm ci`, lint reporting, and unit tests with coverage. Check that the lockfile contains no deprecated packages and that coverage still includes the same source files. See [issue #792](https://github.com/ismarslomic/MMM-Hello-World-Ts/issues/792) for the investigation.

### Linting and formatting

```bash
npm run lint
npm run lint:css
npm run prettier
```

### Verify distributed JavaScript

The bundles and sourcemaps are checked in so users can install without development tools. Run `npm run build` and commit the generated files with TypeScript changes. `npm run check:generated` rebuilds and fails if the checked-in output is stale; CI runs the same check.

Rollup emits readable JavaScript without Terser minification so module authors can inspect the installed code and runtime stack traces. The frontend remains a UMD bundle using MagicMirror's `Log` global, the helper remains CommonJS with external `node_helper` and `logger` dependencies, and both keep sourcemaps.

For this module, removing minification increases the frontend from 3,084 to 6,391 bytes and the helper from 1,711 to 3,268 bytes. Together that adds 4,864 bytes (1,081 bytes when gzip-compressed), a small absolute cost for readable example code and one fewer build dependency. These measurements cover the JavaScript bundles only and do not assume that MagicMirror enables compression.

### Run unit tests locally

```bash
npm run test:unit
npm run test:unit:coverage
```

Unit tests use Vitest with explicit imports, TypeScript module aliases for MagicMirror mocks, and V8 coverage. This replaces Jest and ts-jest without a separate test compiler configuration. The built CommonJS helper is also executed with mocked MagicMirror dependencies to catch bundler interop errors. Separate `npm run typecheck` remains required because Vitest does not typecheck tests.

Coverage includes `src/**/*.ts` and produces `coverage/lcov.info` for Codecov. The built-in GitHub Actions reporter annotates failures, and the JUnit report is uploaded as an Actions artifact. The Jest-specific coverage override is no longer needed.

### Run e2e tests locally

E2E tests run the newly built module against MagicMirror 2.38.0 using Node.js 24 and Playwright Chromium. The fixture uses two instances to verify socket isolation and subsequent polling updates. Playwright starts the server, waits for readiness, and stops it after the tests; locally it can reuse a running server.

To run locally, place a MagicMirror 2.38.0 checkout in `MagicMirror/`, install its server dependencies with `npm ci --omit=dev --omit=optional`, build and install this module in `MagicMirror/modules/MMM-Hello-World-Ts`, and copy `__tests__/e2e/mm/config.js` to `MagicMirror/config/config.js`. Then install the test browser and run:

```bash
npx playwright install chromium
npm run test:e2e
```

Use `npx playwright show-report` to open the HTML results. CI uploads the report and retains traces and screenshots for failed tests. This replaces the Cypress-specific CI action with the same npm command used locally.

### Codecov integration in Github actions

Add **Repository secret** in your Github repository with name `CODECOV_TOKEN` and a
secret value from your [codecov.io](https://app.codecov.io/gh) account.
