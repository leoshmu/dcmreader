'use strict';

describe('Service: TagDictionary', function () {

  // load the service's module
  beforeEach(module('dcmreaderApp'));

  // instantiate service
  var TagDictionary;
  beforeEach(inject(function (_TagDictionary_) {
    TagDictionary = _TagDictionary_;
  }));

  it('should do something', function () {
    expect(!!TagDictionary).toBe(true);
  });

});
