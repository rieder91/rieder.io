/**
 * Created by Thomas on 03.03.2016.
 */
module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                stripBanners: true
            },
            dist: {
                /* this is needed to ensure the proper order (bootstrap requires jquery first) */
                src: [
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'bower_components/Bootflat/bootflat/js/*',
                    'js/*.js'
                ],
                dest: 'prod/homepage.js'
            }
        },
        uglify: {
            options: {
                stripBanners: true
            },
            build: {
                src: 'prod/homepage.js',
                dest: 'prod/homepage.min.js'
            }
        },
        concat_css: {
            all: {
                /* sadly this is needed to ensure the proper order */
                src: [
                    'css/*',
                    'bower_components/bootstrap/dist/css/bootstrap.min.css',
                    'bower_components/Bootflat/bootflat/css/bootflat.min.css',
                    'bower_components/font-awesome/css/font-awesome.min.css'
                ],
                dest: 'prod/homepage.css'
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'prod',
                    src: ['homepage.css'],
                    dest: 'prod',
                    ext: '.min.css'
                }]
            }
        },
        watch: {
            css: {
                files: 'css/*',
                tasks: ['concat_css', 'cssmin']
            },
            js: {
                files: 'js/*',
                tasks: ['concat', 'uglify']
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['bower_components/bootstrap/dist/fonts/*'],
                        dest: 'fonts',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['bower_components/font-awesome/fonts/*'],
                        dest: 'fonts',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        src: ['bower_components/Bootflat/bootflat/img/*'],
                        dest: 'img',
                        filter: 'isFile'
                    }
                ]
            }
        }
    });

    /* for css */
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    /* for js */
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    /* for live reload */
    grunt.loadNpmTasks('grunt-contrib-watch');

    /* for copying fonts */
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', [
        'concat',
        'uglify',
        'concat_css',
        'cssmin',
        'copy']
    );
};