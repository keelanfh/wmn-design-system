/* eslint-disable import/no-extraneous-dependencies */
const { src, dest } = require('gulp');
const plugins = require('gulp-load-plugins')();

const paths = require('./config.js');

const getRoot = path => '../'.repeat(path.match(/\//gi).length); // Function which takes in a path and back counts slashes to get to baseRoot dir

const build = 'local';

// Process, lint, and minify Sass files
module.exports = () => {
  console.log('hit');
  return src(paths.styles.minifySrc)
    .pipe(
      plugins.plumber({
        errorHandler(error) {
          console.log(error.message);
          this.emit('end');
        }
      })
    )
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass().on('error', plugins.sass.logError)) // Compile Sass
    .pipe(plugins.autoprefixer()) // Prefix css with older browser support
    .pipe(plugins.cleanCss({ level: 2 })) // Minify css
    .pipe(plugins.sourcemaps.write(getRoot(paths.styles.output) + paths.logs.sourcemaps))
    .pipe(dest(paths.styles.output))
    .pipe(plugins.replace('$*cdn', build))
    .pipe(dest(paths.styles.output));
  // Push new CSS to server without reload
};
