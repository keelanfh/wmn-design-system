// Gulp requires
const { src, dest } = require('gulp');
const plugins = require('gulp-load-plugins')();
// Local requires
const paths = require('./config.js');
const { packageJson, build } = require('./utils');

module.exports = () => {
  return src(paths.nunjucks.src)
    .pipe(
      plugins.nunjucksRender({
        path: 'src/views/',
        watch: true
      })
    )
    .pipe(plugins.replace('$*cdn', packageJson.buildDirs[build].cdn))
    .pipe(
      plugins.rename({
        extname: '.html'
      })
    )
    .pipe(plugins.htmlmin({ collapseWhitespace: true }))
    .pipe(plugins.formatHtml())
    .pipe(dest(paths.nunjucks.output));
};
