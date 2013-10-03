'use strict';

describe('Service: PDFAnalysis', function () {

  // load the service's module
  beforeEach(module('dcmreaderApp'));

  // instantiate service
  var PDFAnalysis;
  beforeEach(inject(function(_PDFAnalysis_) {
    PDFAnalysis = _PDFAnalysis_;
  }));

  it('should do something', function () {
    expect(!!PDFAnalysis).toBe(true);
  });

});
