'use strict';

describe('Service: ValueRepresentationDictionary', function () {

  // load the service's module
  beforeEach(module('dcmreaderApp'));

  // instantiate service
  var ValueRepresentationDictionary;
  beforeEach(inject(function (_ValueRepresentationDictionary_) {
    ValueRepresentationDictionary = _ValueRepresentationDictionary_;
  }));

  it('should do something', function () {
    expect(!!ValueRepresentationDictionary).toBe(true);
  });

});
