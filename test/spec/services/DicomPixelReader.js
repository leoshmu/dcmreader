'use strict';

describe('Service: DicomPixelReader', function () {

  // load the service's module
  beforeEach(module('dcmreaderApp'));

  // instantiate service
  var DicomPixelReader;
  beforeEach(inject(function (_DicomPixelReader_) {
    DicomPixelReader = _DicomPixelReader_;
  }));

  it('should do something', function () {
    expect(!!DicomPixelReader).toBe(true);
  });

});
