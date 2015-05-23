describe('angularCombine behavior', function() {

	var $templateCache, $httpBackend, $templateRequest;

	var templates = [//
	'<div>content for template 1</div>', //
	'<div>content for template 2</div>', //
	'<div>content for template 3</div>', //
	];
	var getDummmyTemplate = function(i) {
		return '<script id="/woot/dummy' + i + '.html" type="text/ng-template">' + templates[i] + '</script>';
	};
	var combinedTemplates = getDummmyTemplate(0) + getDummmyTemplate(1) + getDummmyTemplate(2);
	var combinedTemplatesUrl = '/combined/combinedTemplates.html';

	var dependenciesInjection = function(_$httpBackend_, _$templateCache_, _$templateRequest_, _$http_) {
		$httpBackend = _$httpBackend_;
		$templateCache = _$templateCache_;
		$templateRequest = _$templateRequest_;
		$http = _$http_;
	};

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
			var template0Url = '/woot/dummy0.html';
			var template1Url = '/woot/dummy1.html';
			var template2Url = '/woot/dummy2.html';
			$httpBackend.expectGET(template0Url).respond(templates[0]);
			$httpBackend.expectGET(template1Url).respond(templates[1]);
			$httpBackend.expectGET(template2Url).respond(templates[2]);
			$templateRequest(template0Url).then(function(retrievedTemplate) {
				expect(retrievedTemplate).toBe(templates[0]);
			});
			$templateRequest(template1Url).then(function(retrievedTemplate) {
				expect(retrievedTemplate).toBe(templates[1]);
			});
			$templateRequest(template2Url).then(function(retrievedTemplate) {
				expect(retrievedTemplate).toBe(templates[2]);
			});
			$httpBackend.flush();
		});
	});

	describe('angularCombine behavior : with angularCombine configured', function() {
		beforeEach(function() {
			var angularCombineModule = angular.module('testAngularCombine', function() {
				// empty module just to set our provider config
			});
			module('angularCombine', 'testAngularCombine');
			angularCombineModule.config(function(angularCombineConfigProvider) {
				angularCombineConfigProvider.addConf(/^\/woot\//, combinedTemplatesUrl);
			});
			inject(dependenciesInjection);
		});

		it('should load the combine template only once', function() {
			var template0Url = '/woot/dummy0.html';
			var template1Url = '/woot/dummy1.html';
			var template2Url = '/woot/dummy2.html';
			$httpBackend.expectGET(combinedTemplatesUrl).respond(combinedTemplates);
			$templateRequest(template0Url).then(function(retrievedTemplate) {
				expect(retrievedTemplate).toBe(templates[0]);
			});
			$templateRequest(template1Url).then(function(retrievedTemplate) {
				expect(retrievedTemplate).toBe(templates[1]);
			});
			$templateRequest(template2Url).then(function(retrievedTemplate) {
				expect(retrievedTemplate).toBe(templates[2]);
			});
			$httpBackend.flush();
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
