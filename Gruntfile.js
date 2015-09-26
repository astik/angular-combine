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
			options : {
				jshintrc : '.jshintrc',
			},
			all : [ 'Gruntfile.js', 'src/*.js' ]
		},

		jscs: {
			options: {
				config: ".jscsrc"
			},
			all: {
				src: [ 'src/*.js' ]
			}
		},

		jsbeautifier: {
			options: {
				config: '.jsbeautifier'
			},
			all: [ 'src/*.js' ]
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
					'dist/angular-combine.js' : [ '.tmp/angular-combine-app.js', '.tmp/angular-combine-config.js', '.tmp/angular-combine-decorator.js' ]
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

		release : {
			options : {
				tagName : 'v<%= version %>'
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
		},

		jasmine : {
			test : {
				src : 'src/*.js',
				options : {
					specs : 'test/spec/*Spec.js',
					vendor : [ //
					"bower_components/angular/angular.js",//
					"bower_components/angular-mocks/angular-mocks.js" //
					]
				}
			}
		},

		watch : {
			test : {
				files : [ 'src/*.js' ],
				tasks : [ 'jasmine' ]
			}
		},
	});

	grunt.registerTask('default', [ 'clean', 'jsbeautifier', 'jshint', 'jscs', 'ngAnnotate', 'concat', 'removelogging', 'uglify', 'usebanner' ]);
	grunt.registerTask('test', [ 'jasmine', 'watch:test' ]);
};
