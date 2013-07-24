'use strict';

describe('Service: DicomConstants', function () {

  // load the service's module
  beforeEach(module('dcmreaderApp'));

  // instantiate service
  var DicomConstants;
  beforeEach(inject(function (_DicomConstants_) {
    DicomConstants = _DicomConstants_;
  }));

  it('should do something', function () {
    expect(!!DicomConstants).toBe(true);
  });

});
