const {src, dest, watch, series} = require('gulp');

// compilacion de CSS
const sass = require('gulp-sass') (require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

// imagenes
const imagemin = require('gulp-imagemin'); 
const webp = require('gulp-webp');
const avif = require('gulp-avif');

// tareas
function css(done) {
    src('src/sass/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss( [autoprefixer()/*, cssnano()*/ ]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'));
    done();
}

function imagenes() {
    return src('src/assets/**/*')
        .pipe(imagemin({ optimizationLevel: 3 }))
        .pipe(dest('build/assets'));
}
function versionWebp() {
    const opciones = {
        quality: 50
    };
    return src('src/assets/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/assets'));
}
function versionAvif() {
    const opciones = {
        quality: 50
    };
    return src('src/assets/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/assets'));
}


function dev() {
    watch('src/sass/**/*.scss', css);
    watch('src/assets/**/*', imagenes);
    watch('src/assets/**/*.{png,jpg}', versionWebp);
    watch('src/assets/**/*.{png,jpg}', versionAvif);
}

// exports
exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series( versionAvif, versionWebp, imagenes, css, dev );
