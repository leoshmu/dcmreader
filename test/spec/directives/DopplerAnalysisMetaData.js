'use strict';

describe('Directive: DopplerAnalysisMetaData', function () {

  // load the directive's module
  beforeEach(module('dcmreaderApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<-doppler-analysis-meta-data></-doppler-analysis-meta-data>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the DopplerAnalysisMetaData directive');
  }));
});
