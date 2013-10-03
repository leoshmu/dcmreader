'use strict';

describe('Service: FileManager', function () {

  // load the service's module
  beforeEach(module('dcmreaderApp'));

  // instantiate service
  var FileManager;
  beforeEach(inject(function (_FileManager_) {
    FileManager = _FileManager_;
  }));

  it('should do something', function () {
    expect(!!FileManager).toBe(true);
  });

});
