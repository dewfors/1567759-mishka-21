const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const del = require("del");

const sync = require("browser-sync").create();


// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")   // берем файл source/sass/style.scss
    .pipe(plumber())                          // прогоняем через plumber (отловщик ошибок) - для обработки возможных ошибок в файле
    .pipe(sourcemap.init())                   // записываем состояние scss-файла
    .pipe(sass())                             // задача, которая превращает scss в css
    .pipe(postcss([                    // обработка css-файла с помощью плагинов, возвращает обработанный css-файл
      autoprefixer(),                         // плагин autoprefixer - проставяем префиксы в css
      csso()                                  // минифицируем css-файл
    ]))
    .pipe(sourcemap.write("."))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))            // минифицированный css-файл кладется в source/css
    .pipe(sync.stream());                     // обновление нашего сервера, чтобы файлы обновлялись
}

exports.styles = styles;


// HTML

const html = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("build"))
}

// Scripts

const scripts = () => {
  return gulp.src("source/js/main.js")
    .pipe(uglify())
    .pipe(rename("main.min.js"))
    .pipe(gulp.dest("build/js"))
    .pipe(sync.stream());
}
exports.scripts = scripts;

// Images
// Хотим минифицировать картинки

const images = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
    .pipe(imagemin([
      imagemin.mozjpeg({progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"))
}
exports.images = images;

// Webp

const createWebp = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"))
}
exports.createWebp = createWebp;

// Sprite

const sprite = () => {
  return gulp.src("source/img/**/*.svg")
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"))
}
exports.sprite = sprite;


// Copy

const copy = () => {
  return gulp.src([
    "source/fonts/*.{woff2,woff}",
    "source/*.ico",
    "source/img/**/*.{jpg,png,svg}"
  ],
    {
      base: "source"
    })
    .pipe(gulp.dest("build"));
}
exports.copy = copy;

// Clean

const clean = () => {
  return del("build")
}
exports.clean = clean;


// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}
exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  //gulp.watch("source/*.html").on("change", sync.reload);

  gulp.watch("source/*.html").on("change", gulp.series(html, sync.reload));



  //gulp.watch("source/*.html", gulp.series(html, sync.reload));
}

// Build
const build = gulp.series(
  clean,
  gulp.parallel(
    styles,
    scripts,
    html,
    sprite,
    copy,
    images,
    createWebp
  )
);
exports.build = build;


// exports.default = gulp.series(
//   styles, server, watcher
// );

exports.default = gulp.series(
  clean,
  gulp.parallel(
    styles,
    scripts,
    html,
    sprite,
    copy,
    createWebp
  ),
  gulp.series(
    styles, server, watcher
  )
)
