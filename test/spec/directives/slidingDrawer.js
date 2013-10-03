'use strict';

describe('Directive: slidingDrawer', function () {
  beforeEach(module('dcmreaderApp'));
	beforeEach(module('app/views/sliding_drawer.html'));
  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<sliding-drawer></sliding-drawer>');
    // element = $compile(element)($rootScope);
    // expect(element.text()).toBe('this is the slidingDrawer directive');
  }));
});
