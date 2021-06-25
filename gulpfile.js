'use strict';

//pacotes necessários
const gulp = require('gulp');
const sass = require('gulp-sass');
//plugin necessário
sass.compiler = require('node-sass');

gulp.task('default', watch);

gulp.task('sass', compilaSass);

gulp.task('icons', function () {
  return gulp
    .src('node_modules/@fortawesome/fontawesome-free/webfonts/*')
    .pipe(gulp.dest('dist/webfonts/'));
});

//Procura todos os arquivos .scss na pasta src/scss bem como nas suas subpastas
function compilaSass() {
  return gulp
    .src('src/scss/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError)) // Converte Sass para CSS mimificado com gulp-sass
    .pipe(gulp.dest('dist/css')); //Diz para onde enviar os arquivos já compilados
}

//responsável por observar qualquer alteração no diretório
function watch() {
  gulp.watch('src/scss/**/*.scss', compilaSass);
}
