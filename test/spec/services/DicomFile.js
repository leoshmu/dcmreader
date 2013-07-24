'use strict';

describe('Service: DicomFile', function () {

  // load the service's module
  beforeEach(module('dcmreaderApp'));

  // instantiate service
  var DicomFile;
  beforeEach(inject(function (_DicomFile_) {
    DicomFile = _DicomFile_;
  }));

  it('should do something', function () {
    expect(!!DicomFile).toBe(true);
  });

});
