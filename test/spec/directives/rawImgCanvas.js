'use strict';

describe('Directive: rawImgCanvas', function () {
  beforeEach(module('dcmreaderApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<raw-img-canvas></raw-img-canvas>');
    element = $compile(element)($rootScope);

  }));
});
