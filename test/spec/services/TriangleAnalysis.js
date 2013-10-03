'use strict';

describe('Service: TriangleAnalysis', function () {

  // load the service's module
  beforeEach(module('dcmreaderApp'));

  // instantiate service
  var TriangleAnalysis;
  beforeEach(inject(function(_TriangleAnalysis_) {
    TriangleAnalysis = _TriangleAnalysis_;
  }));

  it('should do something', function () {
    expect(!!TriangleAnalysis).toBe(true);
  });

});
