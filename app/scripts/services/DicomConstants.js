'use strict';

angular.module('dcmreaderApp')
  .factory('DicomConstants', function () {

    // Public API here
    return {
      "HEADER_ZERO_OFFSET":128,
      "POST_HEADER_TAG_OFFSET":132,
      "DICM_START_TAG":'4944,4D43',
      "TRANSFER_SYNTAX_UID_TAG": '0002,0010',
      "RAW_EXPLICIT_BIG": '1.2.840.10008.1.2.2',
      "RAW_EXPLICIT_LITTLE": '1.2.840.10008.1.2.1',
      "RAW_IMPLICIT_LITTLE": '1.2.840.10008.1.2',
      "PIXEL_DATA_TAG": '7FE0,0010',
      "IMAGE_WIDTH_TAG": '0028,0011',
      "IMAGE_HEIGHT_TAG": '0028,0010',
      "PLANAR_CONFIGURATION_TAG": '0028,0006',
      "PHOTOMETRIC_INTERPRETATION_TAG": '0028,0004',
      'IMPLICIT_TAGS':['FFFE,E000','FFFE,E00D', 'FFFE,E0DD'],
      'ITEM':'FFFE,E000',
      'ITEM_DELIMITATION_ITEM':'FFFE,E00D',
      'SEQUENCE_DELIMITATION_ITEM':'FFFE,E0DD',
      'UNDEFINED_LENGTH':'FFFF,FFFF',
      'SEQUENCE_VR':'SQ',
      "VR_32BIT_CODES":['OB', 'OW', 'OF', 'SQ', 'UT', 'UN']

    };
  });
