// this test checks that without doing anything, except loading the module, we don't break basic Angular behavior.
describe('native behavior', function() {

	var $templateCache, $httpBackend, $templateRequest;
	var template = '<div>test</div>';

	beforeEach(function() {
		module('angularCombine');
		inject(function(_$httpBackend_, _$templateCache_, _$templateRequest_, _$http_) {
			$httpBackend = _$httpBackend_;
			$templateCache = _$templateCache_;
			$templateRequest = _$templateRequest_;
			$http = _$http_;
		});
	});

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it('should cache the given value at the given key', function() {
		var templateUrl = 'simpleTest.html';
		$templateCache.put(templateUrl, template);
		expect($templateCache.get(templateUrl)).toBe(template);
	});

	it('should not make a web request if put template found', function() {
		var templateUrl = 'testRightIntoTheCache.html';
		$templateCache.put(templateUrl, template);
		$templateRequest(templateUrl);
		$httpBackend.verifyNoOutstandingRequest();
		expect($templateCache.get(templateUrl)).toBe(template);
	});

	it('should make a web request if template is not found', function() {
		var templateUrl = 'testNotInTheCacheAtFirst.html';
		$httpBackend.expectGET(templateUrl).respond(template);
		$templateRequest(templateUrl).then(function(retrievedTemplate) {
			expect(retrievedTemplate).toBe(template);
		});
		$httpBackend.flush();
	});

	it('should not make an additional web request if template already loaded in cache', function() {
		var templateUrl = 'testRightIntoTheCache.html';
		$httpBackend.expectGET(templateUrl).respond(template);
		$templateRequest(templateUrl);
		$templateRequest(templateUrl).then(function(retrievedTemplate) {
			expect(retrievedTemplate).toBe(template);
		});
		$httpBackend.flush();
		$httpBackend.verifyNoOutstandingRequest();
	});
});
