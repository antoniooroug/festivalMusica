// Archivo de Gulp
// --save-dev cuando un paquete no se requiere en producción


// series ejecuta las funciones en el orden en el cual se declaran (secuencial)
// parallel inicia todas las tareas al mismo tiempo y se van a ir completando de acuerdo a la cantidad que tengan que hacer

// Cuando hay llaves es que hay multiples paquetes
const { series, src, dest, watch, parallel } = require('gulp'); // require para importar

// npm install sass gulp-sass --save-dev
// npm install node-sass
const sass = require('gulp-sass')(require('sass'));
// npm i --save-dev gulp-imagenmin para añadir dependencia de gulp para hacer menos pesadas las imagenes
const imagemin = require('gulp-imagemin');
// npm i --save-dev gulp-notify
const notify = require('gulp-notify');
// npm i --save-dev gulp-webp
const webp = require('gulp-webp');
// npm i --save-dev gulp-concat
const concat = require('gulp-concat');

// Utilidades CSS
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

// Utilidades JS
const terser = require('gulp-terser-js');
const rename = require('gulp-rename');

const paths = {
    imagenes: 'src/img/**/*',
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js'
}

// Función que compila SASS
function css() {
    return src(paths.scss)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./build/css'));
}

function javascript() {
    return src(paths.js)
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('./build/js'));
}

function imagenes() {
    return src(paths.imagenes)
        .pipe(imagemin())
        .pipe(dest('./build/img'))
        .pipe(notify({ message: 'Imagenes minificadas', sound: true, onLast: true, wait: true })); // sound: true, onLast: true, wait: true hace que no se muestre una notificacón por cada imagen minificada si no al terminar de pipear todas las imagenes
}

function versionWebp() {
    return src(paths.imagenes)
        .pipe(webp())
        .pipe(dest('./build/img'))
        .pipe(notify({ message: 'Version webp lista', sound: true, onLast: true, wait: true }));
}

function watchArchivos() {
    watch(paths.scss, css); //* = Carpeta actual ** = Todos los archivos con esa extension
    watch(paths.js, javascript);
}

exports.css = css;
exports.imagenes = imagenes;
exports.watchArchivos = watchArchivos;

exports.default = series(css, javascript, imagenes, versionWebp, watchArchivos);