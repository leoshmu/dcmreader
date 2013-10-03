'use strict';

describe('Directive: ngFitter', function () {

  // load the directive's module
  beforeEach(module('dcmreaderApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ng-fitter></ng-fitter>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ngFitter directive');
  }));
});
