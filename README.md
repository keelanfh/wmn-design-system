# WMCA Website Redevelopment
[![Netlify Status](https://api.netlify.com/api/v1/badges/dff99875-8f09-42b9-bb99-3a43f8c0e697/deploy-status)](https://app.netlify.com/sites/wmca/deploys)

- [WMCA Website Redevelopment](#WMCA-Website-Redevelopment)
  - [WMN Styleguide](#WMN-Styleguide)
  - [Quick start](#Quick-start)
  - [Tasks](#Tasks)
    - [`npm start`](#npm-start)
    - [`npm run lint`](#npm-run-lint)
    - [Compilation](#Compilation)
    - [Clean up](#Clean-up)
  - [Troubleshooting](#Troubleshooting)
  - [Contributing to the code base](#Contributing-to-the-code-base)
  - [Got feedback?](#Got-feedback)


## WMN Styleguide

Welcome to the [West Midlands Network Design System](https://wmnetwork.netlify.com/).

The WMN Styleguide is ran at the designated url on startup (usually http://localhost:3000) and is the primary means of viewing your work - it will live update as you make changes.

- Tailored for building West Midlands Network apps and websites: Using the WMN Design System markup and CSS framework results in UIs that reflect the West Midlands Network look and feel.
- Continuously updated: As long as you're using the latest version of the WMN Design System, your pages are always up to date with Salesforce UI changes.

![West Midlands Network Styleguide example](doc/preview.png)

## Quick start

You'll need [Git](https://help.github.com/articles/set-up-git/) and [Node.js](https://nodejs.org/en/) installed to get this project running.

1. Clone the project with `git clone git@bitbucket.org:wmca/west-midlands-network.git`
2. Run `npm install` in the root folder.
3. Run `npm start` to launch the dev environment with hot reloading.
4. Visit http://localhost:3000

Having trouble getting these steps to work on your machine? Follow the [troubleshooting guide](guidelines/TROUBLESHOOTING.md).

## Tasks

For more in-depth information on what each task does, see [tasks guide](doc/TASKS.md).

### `npm start`

Start the WMN Design System web server.

### `npm run lint`

Lint the code base for syntax and stylistic errors.

```bash
# Lint indentation, Sass, JavaScript files, html
npm run lint:all

# Lint languages independently
npm run lint:styles
npm run lint:templates
npm run lint:scripts
```

### Compilation

Build the styleguide for various environments

```bash
# Build Sass, JavaScript, HTML files
npm run build:all
npm run build:staging
npm run build:live

# Build languages/assets independently
npm run build:styles
npm run build:templates
npm run build:scripts
npm run build:images
npm run build:config
```

### Clean up

Delete all built languages/assets
`npm run clean`

Also delete temporary build and local files.

## Troubleshooting

See the [troubleshooting guide](doc/TROUBLESHOOTING.md).

## Contributing to the code base

See the [contributing guide](doc/CONTRIBUTING.md).

## Got feedback?

Please open a new [Bitbucket Issue](https://bitbucket.org/wmca/west-midlands-network/issues?status=new&status=open).
