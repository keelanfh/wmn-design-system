const { src, dest, watch, series, parallel } = require('gulp');
const plugins = require('gulp-load-plugins')();
// SASS vars

// JS vars
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');
// HTML vars
require('nunjucks');
const htmlHint = require('gulp-htmlhint');
const access = require('gulp-accessibility');
const nunjucksRender = require('gulp-nunjucks-render');
// Image vars
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');
// svg sprite
const svgStore = require('gulp-svgstore');
// Live-reload server vars
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const gulpHandlebarsFileInclude = require('gulp-handlebars-file-include');
// Other vars
const plumber = require('gulp-plumber');
const replace = require('gulp-replace');
const fs = require('fs');
const rename = require('gulp-rename');
const jsonFormat = require('gulp-json-format');

const json = JSON.parse(fs.readFileSync('./package.json'));

let build = 'local';
// Function that is ran when buildAll is called to determine buildEnv
// This matches the buildDirs in package.json
function determineBuild(done) {
  switch (process.env.npm_config_build) {
    case 'staging':
      build = 'staging';
      break;
    case 'live':
      build = 'live';
      break;
    case 'netlify':
      build = 'netlify';
      break;
    default:
      build = 'local';
      break;
  }
  done();
}

const paths = {
  output: 'build/', // Default output location for code build
  server: {
    port: 8080,
    baseDir: './build/views/njk-wmn-ds-website/',
    root: './build/'
  },
  styles: {
    src: ['src/assets/sass/**/*.scss', 'src/views/**/**/*.scss'], // src of styles to watch
    minifySrc: [
      'src/assets/sass/wmn-ds-components.scss',
      'src/views/wmn-ds-website/wmn-ds-website.scss'
    ], // List of scss file(s) which should be processed, linted & minified
    output: 'build/css/' // output location of minified styles
  },
  scripts: {
    src: [
      'src/assets/**/*.js',
      'src/views/components/**/*.js',
      './src/views/wmn-ds-website/**/*.js'
    ], // Src of JS files to watch
    // List of JS folders to concatenate, lint and minified to one file (DON'T LINT ASSETS AS IT WILL TAKE TOO LONG TO SCAN MINIFIED LIBS)
    minifySrc: [
      {
        src: 'src/views/components/**/*.js',
        minName: 'wmn-ds-components.min.js',
        lint: true
      },
      { src: 'src/assets/vendor/js/**/*.js', minName: 'wmn-ds-vendor.min.js', lint: false },
      {
        src: 'src/views/wmn-ds-website/**/*.js',
        minName: 'wmn-ds-website.min.js',
        lint: false
      }
    ],
    output: 'build/js/' // Output location of minified JS files
  },
  templates: {
    src: 'src/views/**/*.html',
    output: 'build/views/'
  },
  nunjucks: {
    src: 'src/views/**/*.njk',
    output: 'build/views/'
  },
  svgs: {
    src: 'src/assets/img/svgs/*.svg',
    dest: 'build/img/'
  },
  images: {
    src: ['src/assets/img/**/*'],
    dest: 'build/img/'
  },
  config: {
    src: 'src/assets/config/**/*',
    output: 'build/config/'
  },
  components: {
    src: 'build/views/components/**/*.html'
  },
  logs: {
    sourcemaps: '_sourcemaps/',
    accessibility: './_accessibility-logs/'
  }
};

const getRoot = path => '../'.repeat(path.match(/\//gi).length); // Function which takes in a path and back counts slashes to get to baseRoot dir

// Clean the current build & _sourcemaps dir
const cleanBuild = require('./gulp-tasks/clean');

const buildStyles = require('./gulp-tasks/build-styles');

// Minify, and concatenate scripts
const buildScripts = require('./gulp-tasks/build-scripts');

// Lint scripts/JS
const lintScripts = require('./gulp-tasks/lint-scripts');

// Lint Templates/HTML
const lintTemplates = require('./gulp-tasks/lint-templates');

// build nunjucks
function nunjucks() {
  return src(paths.nunjucks.src)
    .pipe(
      nunjucksRender({
        path: 'src',
        watch: true
      })
    )
    .pipe(replace('$*cdn', json.buildDirs[build].cdn))
    .pipe(dest(paths.nunjucks.output));
}

function buildTemplates() {
  return (
    src(paths.templates.src)
      // .pipe(gulpHandlebarsFileInclude('', { maxRecursion: 50 }))
      .pipe(replace('$*cdn', json.buildDirs[build].cdn))
      .pipe(dest(paths.templates.output))
  );
}

// move config files to build
function buildConfig() {
  return src(paths.config.src).pipe(dest(paths.config.output));
}

// svg sprite
function spriteSvgs() {
  return src(paths.svgs.src)
    .pipe(rename({ prefix: 'wmn-' }))
    .pipe(svgStore())
    .pipe(rename({ basename: 'svg-sprite' }))
    .pipe(dest(paths.svgs.dest));
}

// Optimise images
function minImages() {
  return src(paths.images.src)
    .pipe(changed(paths.images.dest))
    .pipe(
      imagemin({
        verbose: true
      })
    )
    .pipe(dest(paths.images.dest));
}

// This function checks index.html for cb=123 and replaces with current dateTime to bust cache
function cacheBust() {
  const cbString = new Date().getTime();
  return src([paths.server.baseDir])
    .pipe(replace(/\?cb=[0-9]*/gm, `?cb=${cbString}`))
    .pipe(dest('.'));
}

// Server
function server(done) {
  browserSync.init({
    server: {
      baseDir: paths.server.baseDir,
      routes: {
        '/build': './build/',
        '/_sourcemaps': './_sourcemaps/',
        '/components': './build/components/',
        '/njk-components': './build/njk-components/'
      }
    },
    port: paths.server.port
  });
  done();
}

function reload(done) {
  browserSync.reload();
  done();
}
const buildAll = series(
  determineBuild,
  cleanBuild,
  spriteSvgs,
  minImages,
  buildStyles,
  buildScripts,
  nunjucks,
  buildTemplates,
  buildConfig,
  lintScripts,
  lintTemplates
);
// Watch files for changes
function watchFiles() {
  // Lint, concat, minify JS then reload server
  watch(paths.scripts.src, series(lintScripts, buildScripts, cacheBust, reload));
  watch(
    [paths.templates.src, paths.nunjucks.src],
    series(lintTemplates, buildTemplates, nunjucks, reload)
  ); // Reload when html changes
  watch(paths.images.src, minImages);
  watch(paths.svgs.src, spriteSvgs);
  watch(paths.styles.src, series(buildStyles, reload)); // run buildStyles function on scss change(s)
  watch(paths.config.src, series(buildConfig, reload)); // Reload when config folder changes
}
const dev = series(
  lintScripts,
  lintTemplates,
  parallel(buildStyles, buildScripts, nunjucks, buildTemplates, buildConfig, spriteSvgs, minImages),
  cacheBust,
  parallel(watchFiles, server)
); // run buildStyles & minifyJS on start, series so () => run in an order and parallel so () => can run at same time
// Export items to be used in terminal
exports.default = dev;
exports.lintScripts = lintScripts;
exports.lintTemplates = lintTemplates;
exports.clean = cleanBuild;
exports.buildScripts = series(buildScripts, lintScripts);
exports.buildStyles = buildStyles;
exports.buildNunjucks = series(nunjucks, lintTemplates);
exports.buildTemplates = series(buildTemplates, lintTemplates);
exports.buildConfig = buildConfig;
exports.spriteSvgs = spriteSvgs;
exports.minImages = minImages;
exports.buildAll = buildAll;
