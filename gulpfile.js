'use strict';

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

// Launch server in  DEV
gulp.task('start', () => {
    nodemon({
        script: 'api/app.js',
        watch: ['api/**/*.*'],
        env: {'NODE_ENV': 'development'}
    });
});