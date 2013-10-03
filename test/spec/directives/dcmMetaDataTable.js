'use strict';

describe('Directive: dcmMetaDataTable', function () {

  // load the directive's module
  beforeEach(module('dcmreaderApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<dcm-meta-data-table></dcm-meta-data-table>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the dcmMetaDataTable directive');
  }));
});
