'use strict';

angular.module('angularCombineViewApp').directive('myDirective1', function() {
	return {
		restrict : 'E',
		templateUrl : 'scripts/directives/my-directive1.html'
	};
});
