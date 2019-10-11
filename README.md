# WMCA Website Redevelopment

## Table of Contents

- [Quick Start](#quick-start)
- [Usage](#usage)
- [Support](#support)
- [Contributing](#contributing)

## WMN Styleguide [![Netlify Status](https://api.netlify.com/api/v1/badges/dff99875-8f09-42b9-bb99-3a43f8c0e697/deploy-status)](https://app.netlify.com/sites/wmca/deploys)

Welcome to the [West Midlands Network Design System](https://wmnetwork.netlify.com/).

- Tailored for building West Midlands Network apps and websites: Using the WMN Design System markup and CSS framework results in UIs that reflect the West Midlands Network look and feel.
- Continuously updated: As long as you’re using the latest version of the WMN Design System, your pages are always up to date with Salesforce UI changes.

## Quick start

1. Clone the project with `git clone git@bitbucket.org:wmca/west-midlands-network.git`
2. Run `npm install` in the root folder.
3. Run `npm start` to launch the dev enviornment with hotreloading.
4. Visit http://localhost:3000

Having trouble getting these steps to work on your machine? Follow the [troubleshooting guide](guidelines/TROUBLESHOOTING.md).

## Previewer

<img src="docs/previewer.v1.jpg" alt="previewer blueprint/variant/modifier selection" width="600px"/>

The previewer is an interactive tool for creating blueprints.

It runs at the designated url on startup and is the primary means of viewing your work - it will live update as you make changes.

You can choose the blueprint, variant, and modifiers to preview as well as background color and screen size. It also previews the sass docs.

Everything in the design system is driven by [annotations](guidelines/ANNOTATIONS.md) and the previewer is no different. **To see any work in the previewer, you must add annotations to your code.**

## Annotations

See the <a href="guidelines/ANNOTATIONS.md">annotations guide</a>.

## Blueprint Documentation

See the <a href="guidelines/BLUEPRINT_DOCUMENTATION.md">blueprint documentation guide</a>.

## Tasks

### `npm start`

Start the WMN Design System web server.

### `npm run lint`

Lint the code base for syntax and stylistic errors.

```bash
# Lint indentation, Sass, JavaScript files
npm run lint

# Lint languages independently
npm run lint:styles
npm run lint:templates
npm run lint:scripts

# HTML5 validation
npm run gulp -- lint:vnu
# HTML5 validation on comma separated blueprint names
npm run gulp -- lint:vnu --components button,path,trees

# a11y validation
npm run gulp -- lint:a11y
# a11y validation on comma separated blueprint names
npm run gulp -- lint:a11y --components button,path,trees

# Lint examples using vnu, aXe, slds validation, and HTML5 validation
npm run gulp -- lint:examples
```

### Pull Request Checks

To run all the checks a pull request will run in Travis use the following command.

```bash
# To run every check against all blueprints
npm run pr-checks

# To run every check but target certain blueprints for slow checks like aXe and vnu
npm run pr-checks -- --components button,path,trees
```

### Compilation

`npm run build && npm run dist`

Generate the Lightning Design System into the `.dist` directory.

`npm run gulp -- styles`

Compile Sass to CSS into `.assets/styles`.

`npm run gulp -- clean`

Delete temporary build and local files.

### Stats

`npm run gulp -- styles:stats`: Useful stats about the project's deliverables.

### Tests

`npm test`: run all tests

## Troubleshooting

See the <a href="guidelines/TROUBLESHOOTING.md">troubleshooting guide</a>.

## Contributing to the code base

See the <a href="CONTRIBUTING.md">contributing guide</a>.

## Licenses

- Source code is licensed under [BSD 3-Clause](https://git.io/sfdc-license)
- All icons and images are licensed under [Creative Commons Attribution-NoDerivatives 4.0](https://github.com/salesforce-ux/licenses/blob/master/LICENSE-icons-images.txt)
- The Salesforce Sans font is licensed under our [font license](https://github.com/salesforce-ux/licenses/blob/master/LICENSE-font.txt)

## Got feedback?

Please open a new <a href="https://github.com/salesforce-ux/design-system/issues">GitHub Issue</a>.
