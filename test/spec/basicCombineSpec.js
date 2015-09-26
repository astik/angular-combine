describe('angularCombine behavior', function() {

	var $httpBackend, $templateRequest;

	var dependenciesInjection = function(_$httpBackend_, _$templateRequest_) {
		$httpBackend = _$httpBackend_;
		$templateRequest = _$templateRequest_;
	};

	var templates = [//
	'<div>content for template 1</div>', //
	'<div>content for template 2</div>', //
	'<div>content for template 3</div>', //
	];

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	describe('angularCombine behavior : without angularCombine configured', function() {
		beforeEach(function() {
			module('angularCombine');
			inject(dependenciesInjection);
		});

		it('should make as many requests as template needed', function() {
			// 3 template urls
			var template0Url = '/woot/dummy0.html';
			var template1Url = '/woot/dummy1.html';
			var template2Url = '/woot/dummy2.html';
			// 3 HTTP calls are expected
			$httpBackend.expectGET(template0Url).respond(templates[0]);
			$httpBackend.expectGET(template1Url).respond(templates[1]);
			$httpBackend.expectGET(template2Url).respond(templates[2]);
			// each http calls should deliver its own content
			$templateRequest(template0Url).then(function(retrievedTemplate) {
				expect(retrievedTemplate).toBe(templates[0]);
			});
			$templateRequest(template1Url).then(function(retrievedTemplate) {
				expect(retrievedTemplate).toBe(templates[1]);
			});
			$templateRequest(template2Url).then(function(retrievedTemplate) {
				expect(retrievedTemplate).toBe(templates[2]);
			});
			// trigger http calls
			$httpBackend.flush();
			// no more http calls are pending
		});
	});

	describe('angularCombine behavior : with angularCombine configured', function() {
		// let's build a dummy combined templates file
		var getDummmyTemplate = function(i) {
			return '<script id="/woot/dummy' + i + '.html" type="text/ng-template">' + templates[i] + '</script>';
		};
		var combinedTemplates = getDummmyTemplate(0) + getDummmyTemplate(1) + getDummmyTemplate(2);
		var combinedTemplatesUrl = '/combined/combinedTemplates.html';

		beforeEach(function() {
			// create a new module that will use angularCombine in order to be able to configure it
			var angularCombineModule = angular.module('testAngularCombine', ['angularCombine']);
			module('testAngularCombine');
			// provider configuration
			angularCombineModule.config(function(angularCombineConfigProvider) {
				angularCombineConfigProvider.addConf(/^\/woot\//, combinedTemplatesUrl);
			});
			inject(dependenciesInjection);
		});

		it('should load the combine template only once', function() {
			// 3 template urls
			var template0Url = '/woot/dummy0.html';
			var template1Url = '/woot/dummy1.html';
			var template2Url = '/woot/dummy2.html';
			// only 1 HTTP call is expected
			$httpBackend.expectGET(combinedTemplatesUrl).respond(combinedTemplates);
			// the one and only HTTP call should deliver content for the 3 templates
			$templateRequest(template0Url).then(function(retrievedTemplate) {
				expect(retrievedTemplate).toBe(templates[0]);
			});
			$templateRequest(template1Url).then(function(retrievedTemplate) {
				expect(retrievedTemplate).toBe(templates[1]);
			});
			$templateRequest(template2Url).then(function(retrievedTemplate) {
				expect(retrievedTemplate).toBe(templates[2]);
			});
			// trigger http calls
			$httpBackend.flush();
			// no more http calls are pending
		});

		it('should return undefined for missing templates into the combine template', function() {
			var template3Url = '/woot/dummy3.html';
			$httpBackend.expectGET(combinedTemplatesUrl).respond(combinedTemplates);
			$templateRequest(template3Url).then(function(retrievedTemplate) {
				expect(retrievedTemplate).toBe(undefined);
			});
			$httpBackend.flush();
		});
	});
});
