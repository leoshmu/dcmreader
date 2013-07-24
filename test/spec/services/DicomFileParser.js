'use strict';

describe('Service: DicomFileParser', function () {

  // load the service's module
  beforeEach(module('dcmreaderApp'));

  // instantiate service
  var DicomFileParser;
  beforeEach(inject(function (_DicomFileParser_) {
    DicomFileParser = _DicomFileParser_;
  }));

  it('should do something', function () {
    expect(!!DicomFileParser).toBe(true);
  });

});
