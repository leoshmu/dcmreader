'use strict';

describe('Service: DopplerFileAnalyzer', function () {

  // load the service's module
  beforeEach(module('dcmreaderApp'));

  // instantiate service
  var DopplerFileAnalyzer;
  beforeEach(inject(function(_DopplerFileAnalyzer_) {
    DopplerFileAnalyzer = _DopplerFileAnalyzer_;
  }));

  it('should do something', function () {
    expect(!!DopplerFileAnalyzer).toBe(true);
  });

});
