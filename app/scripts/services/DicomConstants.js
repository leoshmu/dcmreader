'use strict';

angular.module('dcmreaderApp')
  .factory('DicomConstants', function () {

    // Public API here
    return {
      "TRANSFER_SYNTAX_UID_TAG": '0002,0010',
      "RAW_EXPLICIT_BIG": '1.2.840.10008.1.2.2',
      "RAW_EXPLICIT_LITTLE": '1.2.840.10008.1.2.1',
      "RAW_IMPLICIT_LITTLE": '1.2.840.10008.1.2',
      "PIXEL_DATA_TAG": '7FE0,0010',
      "IMAGE_WIDTH_TAG": '0028,0011',
      "IMAGE_HEIGHT_TAG": '0028,0010',
      "PLANAR_CONFIGURATION_TAG": '0028,0006'
    };
  });
