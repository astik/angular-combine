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
	var banner = '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n';

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

		uglify : {
			options : {
				banner : banner
			},
			min : {
				options : {
					mangle : true
				},
				files : {
					'dist/angular-combine.min.js' : [
							'.tmp/angular-combine-app.js',
							'.tmp/angular-combine-config.js',
							'.tmp/angular-combine-decorator.js' ]
				}
			},
			concat : {
				options : {
					mangle : false,
					beautify : true
				},
				files : {
					'dist/angular-combine.js' : [
							'.tmp/angular-combine-app.js',
							'.tmp/angular-combine-config.js',
							'.tmp/angular-combine-decorator.js' ]
				}
			}
		},

		bump : {
			options : {
				files : [ 'package.json', 'bower.json' ],
				commitFiles : [ 'package.json', 'bower.json' ]
			}
		}
	});

	// By default, lint and run all tests.
	grunt.registerTask('default', [ 'clean', 'jshint', 'ngAnnotate', 'uglify' ]);
};
