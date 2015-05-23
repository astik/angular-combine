/*
 * grunt-angular-combine
 * https://github.com/astik/grunt-angular-combine
 *
 * Copyright (c) 2013 Romain Gonord
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);
	var banner = '/*! <%= pkg.name %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n';

	// Project configuration.
	grunt.initConfig({
		pkg : require('./bower.json'),
		jshint : {
			all : [ 'Gruntfile.js', 'src/*.js' ],
			options : {
				jshintrc : '.jshintrc',
			},
		},

		// Before generating any new files, remove any previously-created files.
		clean : {
			tests : [ 'tmp', 'dist' ],
		},

		ngAnnotate : {
			dist : {
				files : [ {
					expand : true,
					cwd : 'src',
					src : '*.js',
					dest : '.tmp'
				} ]
			}
		},

		concat : {
			dist : {
				files : {
					'dist/angular-combine.js' : [
							'.tmp/angular-combine-app.js',
							'.tmp/angular-combine-config.js',
							'.tmp/angular-combine-decorator.js' ]
				}
			}
		},

		uglify : {
			min : {
				options : {
					mangle : true
				},
				expand : true,
				cwd : 'dist',
				src : '*.js',
				dest : 'dist',
				ext : '.min.js'
			}
		},

		bump : {
			options : {
				files : [ 'package.json', 'bower.json' ],
				commitFiles : [ 'package.json', 'bower.json' ],
				pushTo : 'origin'
			}
		},

		removelogging : {
			dist : {
				src : 'dist/angular-combine.js',
				dest : 'dist/angular-combine-without-console.js'
			}
		},

		usebanner : {
			dist : {
				options : {
					position : 'top',
					banner : banner,
					linebreak : false
				},
				expand : true,
				cwd : 'dist',
				src : '*.js',
				dest : 'dist'
			}
		}
	});

	// By default, lint and run all tests.
	grunt.registerTask('default', [ 'clean', 'jshint', 'ngAnnotate', 'concat', 'removelogging', 'uglify', 'usebanner' ]);
};
