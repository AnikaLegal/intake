# Anika Client Intake Frontend

This is the Anika client intake form frontend.

It is a React/Redux single page app, deployed as a static site which is hosted on AWS S3 at [intake.anikalegal.com](https://intake.anikalegal.com/repairs).
The app depends on a backend API at [clerk.anikalegal.com](https://clerk.anikalegal.com).

Clients visit the webapp from the Anika [website](https://anikalegal.com), looking to get help with their rental repairs issue.
They have to answer a bunch of questions so that we can begin their case. When they submit their answers, the webapp sends them to the backend,
which then stores their case info and alerts Anika staff.

## Local Development

If you are using Windows ensure that git is setup to use LF not CLRF

```
git config core.autocrlf false
git rm --cached -r .
git reset --hard
```

Envars are stored in .env and encrypted using transcrypt. You can see encryoted files with `transcrypt --list`.

To intialise the repository on cloning run

```bash
transcrypt -c aes-256-cbc -p $TRANSCRYPT_PASSWORD
```

The values of these secrets will be provided to you if you need them. They should be available in the Tech team Bitwarden account.

You will need Node (prefer v11+) and [yarn](https://yarnpkg.com/en/) installed locally.

```bash
yarn install
```

You can then start the development server and webpack compilation:

```bash
yarn html  # Build HTML from Handlebars template
yarn dev  # Run dev server on http://localhost:3000
```

## Environments

There are two environments, each of which has a corresponding backend:

- [test frontend](https://test-intake.anikalegal.com), talks to [test backend](http://test-clerk.anikalegal.com)
- [prod frontend](https://intake.anikalegal.com), talks to [prod backend](http://clerk.anikalegal.com)

Each of these environments correspond to a similarly named S3 bucket in the Anika AWS account.
DNS is managed using Anika's CloudFlare account.

## Deployment

These branches are used for deployment:

- `develop` deploys to the test
- `master` deploys to prod

When making a change or bugfix, you should:

- create a feature branch from `develop` called feature/my-branch-name and test it locally
- merge the branch into `develop` and push to GitHub to trigger a release to the test environment
- check your changes in the test environment
- merge the `develop` into `master` and push to GitHub to release your change to prod

Deployment is run on demand via GitHub Actions using the bash scripts in
`/scripts`. Deployment can also be run manually using the bash scripts in
`/scripts/release/`.

## Errors and Logging

Errors logged using Sentry can be viewed [here](https://sentry.io/organizations/anika-legal/projects/).

Sentry is used via `@sentry/browser`. The `ErrorBoundary` component is used to catch and handle these errors.
The `logException` utilities method can be used in both dev and prod to handle errors and report them to Sentry.

## Project Structure

The general idea is that the root app `App` renders the routes from `routes/`. Each route, defined in `routes/routes.js` renders a view, which can then render components and containers.

```
├── .circleci               CircleCI config
├── .storybook              Storybook config
├── dist                    build artifacts (not in version control)
├── public                  static files to be deployed (in version control)
│   └── static
│       ├── fonts           fonts
│       ├── images          images
│       ...
├── scripts                 Bash scripts for deployment
└── src
    ├── analytics           analytics setup and events
    ├── api                 interface for all HTTP API calls
    ├── consts              constants
    ├── containers          "smart" React components (older way of organising code)
    ├── features            components split up by feature (newer way of organising code)
    |   ├── form            components for the questionnaire form
    |   └── generic         generic, resuable components
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

## Type Checking

This project use [FlowJS](https://flow.org/) for type checking.
See more details in `.flowconfig`.

You can run a type check as follows:

```bash
yarn flow check src # Typecheck JS code
```

You can setup FlowJS support in VSCode, which is much better than using the CLI.

## Linting

Linting is done with [Prettier](https://prettier.io/). Config lives in `.prettierrc`. We also use [eslint](https://eslint.org) in addition to Prettier, config lives in `.eslintrc.js`. ESlint is not used in CI builds - it's just for developer convenience.

```bash
yarn format  # Format JS code (recommended)
yarn lint  # Lint JS code (run in CI jobs)
```

You can setup VSCode to auto-format files on save. This is recommended.

There are no unit tests or integration tests.

## Storybook

Ths project has [Storybook](https://storybook.js.org/docs/basics/introduction/) setup to allow us to build components independently of their UI.
Config lives in `.storybook`.

View the prod storybook [here](https://storybook.anikalegal.com/?).

Run storybook on `http://localhost:3001` with

```
yarn story
```

It's OK to break stories and fix them later.
