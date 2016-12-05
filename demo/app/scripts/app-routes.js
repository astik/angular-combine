'use strict';

angular.module('angularCombineViewApp').config(function ($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : 'views/main.html',
		controller : 'MainCtrl'
	}).when('/admin/entity1', {
		templateUrl : 'views/admin/entity1.html',
		controller : 'AdminEntity1Ctrl'
	}).when('/admin/entity2', {
		templateUrl : 'views/admin/entity2.html',
		controller : 'AdminEntity2Ctrl'
	}).when('/admin/entity3', {
		templateUrl : 'views/admin/entity3.html',
		controller : 'AdminEntity3Ctrl'
	}).otherwise({
		redirectTo : '/'
	});
});
