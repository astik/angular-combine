'use strict';

angular.module('angularCombineViewApp', [ 'ngRoute', 'angularCombine' ]);

angular.module('angularCombineViewApp').config(function (angularCombineConfigProvider) {
	angularCombineConfigProvider.addConf(/^views\/admin\//, 'views/admin.html');
	angularCombineConfigProvider.addConf(/^scripts\/components\//, 'views/components.html');
	angularCombineConfigProvider.addConf(/^scripts\/directives\//, 'views/directives.html');
});
