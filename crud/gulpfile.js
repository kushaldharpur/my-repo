var gulp = require('gulp'),
    nodemone = require('gulp-nodemon');

gulp.task('default', function() {
    nodemone({
            script: 'index.js',
            est: 'js',
            env: {
                port: 8000
            },
            ignore: ['./node_modules/**']
        })
        .on('restart', function() {
            console.log('restarting...')
        });
});