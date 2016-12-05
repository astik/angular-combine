'use strict';

angular.module('angularCombineViewApp').directive('myDirective3', function() {
	return {
		restrict : 'E',
		templateUrl : function() {
			return 'scripts/directives/my-directive3.html'
		}
	};
});
