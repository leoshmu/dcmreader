'use strict';

describe('Service: DicomFile', function () {

  // load the service's module
  beforeEach(module('dcmreaderApp'));

  // instantiate service
  var DicomFile;

  // create method for loading data into array buffer
  var load_data = function(url){

  }

  beforeEach(inject(function (_DicomFile_) {
    DicomFile = _DicomFile_;
  }));

  describe('Parsing File with Undefined Length Sequence Element', function(){
    var dicom;
    beforeEach(function(){
      var req = new XMLHttpRequest();
      var url = '/base/samples/LVPPP050/IM_0043'
      req.open('GET', url, true);
      req.responseType = 'arraybuffer';
      var arraybuffer;
      var dicom_loaded = false;
      req.onload = function(e){
        arraybuffer = req.response;
        dicom = new DicomFile(req.response)
        dicom_loaded = true;
      }
      req.send(null);
      waitsFor(function(){
        return dicom_loaded;
      }, 'Never retrieved, 3000');
    });

    it('should parse SQ tag', function () {
      expect(dicom['0008,1111'].vr).toBe('SQ')
      expect(dicom['0018,6011'].vr).toBe('SQ')
    });
    it('should parse 2 undefined length SQ tags', function(){
      expect(dicom['0008,1111'].value_length).toBe(undefined)
      expect(dicom['0018,6011'].value_length).toBe(undefined)
    });
    it('should parse pixel data tag', function(){
      expect(dicom['7FE0,0010']).toNotBe(undefined);
    })
  })




});
