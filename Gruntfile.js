module.exports = function(grunt) {

	grunt.initConfig({
		jshint: {
			jshintrc: '.jshintrc',
			src: ['src/**/*.js']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-jscs-checker');
	grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('default', ['jshint']);

};