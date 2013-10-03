'use strict';

describe('Directive: eWaveFit', function () {

  // load the directive's module
  beforeEach(module('dcmreaderApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<e-wave-fit></e-wave-fit>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the eWaveFit directive');
  }));
});
