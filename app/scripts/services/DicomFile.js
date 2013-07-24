'use strict';

angular.module('dcmreaderApp')
  .factory('DicomFile', function (DicomFileParser, DicomConstants) {
    var DicomFile;
    DicomFile = (function(){
      function DicomFile(array_buffer_result){

        var dicom_object = DicomFileParser.load_from_buffer(array_buffer_result);
        console.log(dicom_object);
        _.extend(this, dicom_object);
      }

      DicomFile.prototype.get_image_data = function(){
        return {
          width: this[DicomConstants.IMAGE_WIDTH_TAG].value,
          height: this[DicomConstants.IMAGE_HEIGHT_TAG].value,
          pixels: this[DicomConstants.PIXEL_DATA_TAG].value
        }
      }

      return DicomFile;
    })();
    return DicomFile;
  });



