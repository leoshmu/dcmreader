'use strict';

describe('Directive: fileReader', function () {
  beforeEach(module('dcmreaderApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<file-reader></file-reader>');
    element = $compile(element)($rootScope);
    // expect(element.text()).toBe('this is the fileReader directive');
  }));
});
