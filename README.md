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

### Linting and formatting

```bash
npm run lint
npm run lint:css
npm run prettier
```

### Verify distributed JavaScript

The bundles and sourcemaps are checked in so users can install without development tools. Run `npm run build` and commit the generated files with TypeScript changes. `npm run check:generated` rebuilds and fails if the checked-in output is stale; CI runs the same check.

### Run unit tests locally

```bash
npm run test:unit
```

### Run e2e tests locally

E2E CI tests newly built module code against MagicMirror 2.38.0 using Node.js 24 and Cypress. To run locally, build the module, install it in that MagicMirror release, copy `__tests__/e2e/mm/config.js` to `MagicMirror/config/config.js`, and start `npm run server` in MagicMirror. The fixture uses two instances to verify socket isolation and subsequent polling updates.

```bash
npm run test:e2e
```

### Codecov integration in Github actions

Add **Repository secret** in your Github repository with name `CODECOV_TOKEN` and a
secret value from your [codecov.io](https://app.codecov.io/gh) account.
