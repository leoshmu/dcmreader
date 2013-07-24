'use strict';

describe('Service: DicomTagParser', function () {

  // load the service's module
  beforeEach(module('dcmreaderApp'));

  // instantiate service
  var DicomTagParser;
  beforeEach(inject(function (_DicomTagParser_) {
    DicomTagParser = _DicomTagParser_;
  }));

  it('should do something', function () {
    expect(!!DicomTagParser).toBe(true);
  });

});
