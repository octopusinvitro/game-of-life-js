var
  gulp         = require('gulp'),

  autoprefixer = require('gulp-autoprefixer'),
  babel        = require('gulp-babel'),
  browsersync  = require('browser-sync').create(),
  concat       = require('gulp-concat'),
  del          = require('del'),
  eslint       = require('gulp-eslint'),
  sourcemaps   = require('gulp-sourcemaps'),
  uglify       = require('gulp-uglify'),

  dev = {
    files: [
      './index.html'
    ],
    css: './styles.css',
    js: [
      './js/src/location.js',
      './js/src/grid.js',
      './js/src/starters.js',
      './js/src/display.js',
      './js/src/user-input.js'
    ],
    sounds: [
      './sounds/staying-alive.mp3'
    ],
    babel: {
      plugins: [['@babel/plugin-proposal-class-properties', { 'loose': true }]],
      presets: ['@babel/preset-env']
    }
  },

  dist = {
    root:   './gh-pages/',
    files:  distFiles,
    css:    './gh-pages/',
    js:     './gh-pages/js/',
    sounds: './gh-pages/sounds/'
  };

function distFiles() {
  return dev.files.map((file) => {
    return dist.root + file.substr(2);
  });
}

function uglifyError(error) {
  console.log(
    `Uglify error on ${error.cause.filename} line ${error.cause.line}: ${error.cause.message}`
  );
}

function babelError(error) {
  console.log(
    `Babel error on ${error.fileName} line ${error.loc.line}: ${error.message}`
  );
}

gulp.task('css', async()  =>{
  gulp
    .src(dev.css)
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dist.css));
});

gulp.task('js', async()  =>{
  gulp
    .src(dev.js)
    .pipe(sourcemaps.init())
    .pipe(eslint({configFile: './eslintrc.json'}))
    .pipe(eslint.formatEach('compact', process.stderr))
    .pipe(concat('app.js'))
    .pipe(babel(dev.babel)).on('error', babelError)
    .pipe(uglify()).on('error', uglifyError)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dist.js));
});

gulp.task('clean', async () => {
  del.sync(dist.files());
});

gulp.task('dist', gulp.series(['clean'], async () => {
  gulp
    .src(dev.files)
    .pipe(gulp.dest(dist.root));
}));

gulp.task('sounds', async () => {
  gulp
    .src(dev.sounds)
    .pipe(gulp.dest(dist.sounds));
});

gulp.task('watch', async() => {
  gulp.watch(dev.css,    gulp.series('css'));
  gulp.watch(dev.js,     gulp.series('js'));
  gulp.watch(dev.files,  gulp.series('dist'));
  gulp.watch(dev.sounds, gulp.series('sounds'));

  gulp.watch(dev.css,    browsersync.reload);
  gulp.watch(dev.js,     browsersync.reload);
  gulp.watch(dev.files,  browsersync.reload);
  gulp.watch(dev.sounds, browsersync.reload);
});

gulp.task('server', async() => {
  browsersync.init({
    server: {
      baseDir: './',
      routes: {
        '/site': 'gh-pages/',
        '/test': 'js/tests.html'
      }
    },
    port:   4000,
    notify: false,
    open:   false
  });
});

gulp.task('default', gulp.parallel('css', 'js', 'dist', 'sounds', 'server', 'watch'));
