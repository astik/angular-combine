/*! angular-combine - v0.1.3 - 2014-12-19 */
'use strict';

angular.module('angularCombine', []);

'use strict';

angular.module('angularCombine').provider('angularCombineConfig', function () {
	var config = [];

	this.addConf = function (regexp, combinedUrl) {
		
		config.push({
			regexp : regexp,
			combinedUrl : combinedUrl
		});
	};
	this.$get = function () {
		return config;
	};
});

'use strict';

angular.module('angularCombine').config(["$provide", function ($provide) {
	$provide.decorator('$templateCache', [ '$delegate', '$http', '$injector', function ($delegate, $http, $injector) {
		var origGetMethod = $delegate.get;
		var idx, conf;
		var angularCombineConfig = $injector.get('angularCombineConfig');

		var loadCombinedTemplates = function (combinedUrl) {
			var combinedTplPromise;
			return function (url) {
				if (!combinedTplPromise) {
					
					combinedTplPromise = $http.get(combinedUrl).then(function (response) {
						$injector.get('$compile')(response.data);
						return response;
					});
				}
				return combinedTplPromise.then(function (response) {
					return {
						status : response.status,
						data : origGetMethod(url),
						headers: response.headers
					};
				});
			};
		};

		for (idx in angularCombineConfig) {
			conf = angularCombineConfig[idx];
			conf.load = loadCombinedTemplates(conf.combinedUrl);
		}

		$delegate.get = function (url) {
			for (idx in angularCombineConfig) {
				conf = angularCombineConfig[idx];
				if (conf.regexp.test(url)) {
					return conf.load(url);
				}
			}
			return origGetMethod(url);
		};
		return $delegate;
	} ]);
}]);
