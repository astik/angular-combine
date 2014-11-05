'use strict';

module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	var config = {
		app : 'app',
		dist : 'dist',
		tmp : '.tmp'
	};
	grunt.initConfig({
		yeoman : config,
		watch : {
			styles : {
				files : [ '<%= yeoman.app %>/styles/{,*/}*.css' ],
				tasks : [ 'copy:styles', 'autoprefixer' ]
			},
			html : {
				files : [ '<%= yeoman.app %>/views/**/*.html' ],
				tasks : [ 'angularCombine:server' ]
			},
			livereload : {
				options : {
					livereload : '<%= connect.options.livereload %>'
				},
				files : [ '<%= yeoman.app %>/*.html', '<%= yeoman.tmp %>/views/*.html', '<%= yeoman.tmp %>/styles/*.css', '<%= yeoman.app %>/scripts/**/*.js',
						'<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}' ]
			}
		},
		autoprefixer : {
			options : [ 'last 1 version' ],
			dist : {
				files : [ {
					expand : true,
					cwd : '<%= yeoman.tmp %>/styles/',
					src : '{,*/}*.css',
					dest : '<%= yeoman.tmp %>/styles/'
				} ]
			}
		},
		connect : {
			options : {
				port : 9000,
				// Change this to '0.0.0.0' to access the server from outside.
				hostname : '0.0.0.0',
				livereload : 35729
			},
			livereload : {
				options : {
					open : true,
					middleware : function (connect, options) {
						var middlewares = [];
						middlewares.push(connect().use('/angular-combine/dist', connect.static('../dist')));
						middlewares.push(connect.static(config.tmp));
						middlewares.push(connect.static(config.app));
						return middlewares;
					}
				}
			},
		},
		clean : {
			server : '<%= yeoman.tmp %>'
		},
		jshint : {
			options : {
				jshintrc : '.jshintrc'
			},
			all : [ 'Gruntfile.js', '<%= yeoman.app %>/scripts/{,*/}*.js' ]
		},
		copy : {
			styles : {
				expand : true,
				cwd : '<%= yeoman.app %>/styles',
				dest : '<%= yeoman.tmp %>/styles/',
				src : '{,*/}*.css'
			}
		},
		concurrent : {
			server : [ 'copy:styles', 'angularCombine:server' ]
		},
		angularCombine : {
			server : {
				files : [ {
					expand : true,
					cwd : '<%= yeoman.app %>',
					src : 'views/*',
					dest : '<%= yeoman.tmp %>/',
					filter : 'isDirectory'
				} ]
			}
		}
	});

	grunt.registerTask('server', function () {
		grunt.task.run([ 'clean:server', 'concurrent:server', 'autoprefixer', 'connect:livereload', 'watch' ]);
	});
};
