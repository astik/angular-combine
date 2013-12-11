'use strict';

angular.module('angularCombine').provider('angularCombineConfig', function () {
	var config = [];

	this.addConf = function (regexp, combinedUrl) {
		console.log("Add conf to angularCombine", regexp, combinedUrl);
		config.push({
			regexp : regexp,
			combinedUrl : combinedUrl
		});
	};
	this.$get = function () {
		return config;
	};
});
