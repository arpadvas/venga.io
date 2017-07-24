const gulp = require('gulp');
const ts = require('gulp-typescript');
const tslint = require("gulp-tslint");
const JSON_FILES = ['src/*.json', 'src/**/*.json'];

// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json');

// gulp tasks
gulp.task('default', [
    'tslint',
    'development'
]);

gulp.task('watch', [
    'watch-development'
]);

gulp.task('development', function(cb) {
    return tsProject.src()
        .pipe(tsProject())
        .js
        .pipe(gulp.dest('dist'));
});

gulp.task("tslint", function() {
    return gulp.src([ "src/**/*.ts" ])
        .pipe(tslint({
            configuration: "tslint.json",
            formatter: "prose"
        }))
        .pipe(tslint.report({emitError: true}));
});

gulp.task('watch-development', function() {
    gulp.watch([
        './src/**/*.ts',
        './src/*.ts'
    ], ['default']);
});