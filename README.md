# Anika Client Intake Frontend

This is the Anika client intake form frontend.

It is a React/Redux single page app, deployed as a static site which is hosted on AWS S3 at [repairs.anikalegal.com](https://repairs.anikalegal.com)
. The app depends on a backend API at [clerk.anikalegal.com](https://clerk.anikalegal.com).

TODO SHORT TERM

    - actually document this project
    - fix yucky loading transition on submit

TODO MEDIUM TERM

    - add analytics + funnel tracking
    - setup Storybook properly
    - eventually move to a feature-based folder structure
    - eventually write some end-to-end tests with cypress to run on staging server
    - setup Sentry logging + releases + sourcemaps + errors to Slack

TODO LONG TERM

    - ??

## Project Structure

```
├── dist                    build artifacts (not in version control)
├── public                  static files to be deployed (in version control)
│   └── static
│       ├── fonts           fonts
│       ├── images          images
│       ...
├── scripts                 bash scripts
└── src
    ├── api                 interface for all HTTP API calls
    ├── components          "dumb" presentational React components
    ├── consts              constants
    ├── containers          "smart" React components
    ├── questions           form question definitions
    ├── routes              routes and utilities for React Router
    ├── state               Redux stuff (state / actions / reducers)
    ├── styles              global SCSS stylesheets
    ├── utils               "helpful", reusable tools
    ├── views               view React components
    ├── app.js              root React component
    ├── globals.js          global FlowJS type definitions
    ├── index.js            app entry point
    ├── index.hbs           Handlebars HTML template
    ├── types.js            FlowJS type definitions
    ...
```

The general idea is that the root app `App` renders the routes from `routes/`. Each route, defined in `routes/routes.js` renders a view, which can then render components and containers.

## System Setup

You will need Node (prefer v11) and [yarn](https://yarnpkg.com/en/) installed locally.

```bash
yarn install
```

### Type Checking

This project use [FlowJS](https://flow.org/) for type checking and `flow-typed` to get types for some 3rd party libraries.
See more details in `.flowconfig`.

You can run a type check as follows:

```bash
yarn flow check src # Typecheck JS code
```

You can setup FlowJS support in VSCode, which is much better than using the CLI.

### Linting

Linting is done with [Prettier](https://prettier.io/). Config lives in `.prettierrc`. We also use [eslint](https://eslint.org) in addition to Prettier, config lives in `.eslintrc.js`. ESlint is not used in CI builds - it's just for developer convenience.

```bash
yarn format  # Format JS code (recommended)
yarn lint  # Lint JS code (run in CI jobs)
```

You can setup VSCode to auto-format files on save. This is recommended.

There are no unit tests or integration tests.

## Development

Run the development server and webpack compilation:

```bash
yarn html  # Build HTML from Handlebars template
yarn serve  # Run dev server
```

## Storybook

Ths project has [Storybook](https://storybook.js.org/docs/basics/introduction/) setup to allow us to build components independently of their UI.
Config lives in `.storybook`.

Run storybook on `http://localhost:3001` with

```
yarn story
```

It's OK to break stories and fix them later.

## Environments

There are two environments, each of which has a corresponding backend:

- [test](https://test-repairs.anikalegal.com)
- [prod](https://repairs.anikalegal.com)

## Errors

Sentry is used via `@sentry/browser` on QA to report errors. The `ErrorBoundary` component is used to catch and handle these errors.
The `logError` utilities method can be used in both dev and prod to handle errors and report them to Sentry.

## Deployment

Some branches are used for deployment:

- `develop` deploys to test
- `master` deploys to prod

Deployment is run manually using the bash scripts in `/scripts/release/`
