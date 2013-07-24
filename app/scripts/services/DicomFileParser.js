'use strict';

angular.module('dcmreaderApp')
  .factory('DicomFileParser', function (DicomTagParser, DicomConstants) {
    // Service logic

    var IS_LITTLE_ENDIAN;


    // Public API here
    return {
      load_from_buffer: function (array_buffer_result) {
        // default little endian with every load of a file
        IS_LITTLE_ENDIAN = true;
        var dicom_hash = {};
        var dicom_dv = new DataView(array_buffer_result);
        var offset = 0;
        //iterate through tag by tag
        while (offset<dicom_dv.byteLength){
          var tag_object = DicomTagParser.parse_tag(dicom_dv, offset, IS_LITTLE_ENDIAN);

          if (tag_object){
            // the transfer syntax tag will set the endianness for other tags


            tag_object.data.value = DicomTagParser.read_tag_value(dicom_dv, tag_object, dicom_hash, IS_LITTLE_ENDIAN);


            if(tag_object.tag == DicomConstants.TRANSFER_SYNTAX_UID_TAG){
              switch(tag_object.data.value.replace(/[^0-9^.]*$/, '')){
                case DicomConstants.RAW_IMPLICIT_LITTLE:
                case DicomConstants.RAW_EXPLICIT_LITTLE:
                  IS_LITTLE_ENDIAN = true;
                break;
                case DicomConstants.RAW_EXPLICIT_BIG:
                  IS_LITTLE_ENDIAN = false;
                break;
                default:
                break;
              }
            }
            offset = tag_object.next_offset;
            dicom_hash[tag_object.tag] = tag_object.data;
          } else {
            offset +=2;
          }
        }
        return dicom_hash;
      }
    };
  });