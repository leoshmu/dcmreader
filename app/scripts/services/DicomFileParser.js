'use strict';

angular.module('dcmreaderApp')
  .factory('DicomFileParser', function (DicomTagParser, TagDictionary, DicomConstants) {
    // Service logic

    var IS_LITTLE_ENDIAN;
    var IS_IMPLICIT;
    var FILE_SETTINGS;
    // Public API here
    return {
      load_from_buffer: function (array_buffer_result) {
        FILE_SETTINGS = {
          is_little_endian: true,
          is_implicit: false,
          is_planar_configuration: 0
        }
        // default little endian with every load of a file
        IS_LITTLE_ENDIAN = true;
        // start with explicit encoding, that is what is assumed before transfer
        // syntax is set (I THINK)
        IS_IMPLICIT = false;
        var dicom_hash = {};
        var dicom_loading_progress = {
          missing_tags: []
        }
        var dicom_dv = new DataView(array_buffer_result);
        // check that the DICOM file starts correctly
        if (!DicomTagParser.check_start_tag(dicom_dv)){
          return false;
        }
        // the DICOM file starts correctly, start reading real data
        // after the header
        var offset = DicomConstants.POST_HEADER_TAG_OFFSET;
        //iterate through tag by tag
        while (offset< dicom_dv.byteLength){

          var tag_object = DicomTagParser.parse_data_element(dicom_dv, offset, FILE_SETTINGS);
          if(tag_object.vr == 'SQ'){
            console.log(tag_object)
          }
          if (tag_object.error){
            switch(tag_object.type){
              case 'tag_string_missing':
                dicom_loading_progress.missing_tags.push(tag_object.info);
              break;
              case 'invalid_file_offset':
              break;
              default:
              break;
            }
            offset +=2;
          } else {
            // the transfer syntax tag will set the endianness for other tags

            // reading tag_value should reveal the next offset.
            // this is to deal with the case of undefined length tags
            // var tag_value = DicomTagParser.read_tag_value(dicom_dv, tag_object, dicom_hash, IS_LITTLE_ENDIAN);
            // console.log(tag_value)
            // tag_object.value = tag_value.value;

            //offset = tag_value.size


            if(tag_object.tag == "0018,6011"){
              console.log(tag_object);
            }
            if(tag_object.tag == DicomConstants.PLANAR_CONFIGURATION_TAG){
              // console.log('set planar')
              FILE_SETTINGS.is_planar_configuration = tag_object.value_field;
            }

            if(tag_object.tag == DicomConstants.PHOTOMETRIC_INTERPRETATION_TAG){
              // console.log('treu', tag_object.value_field)
              FILE_SETTINGS.photometric_interpretation = tag_object.value_field.replace(/[^0-9^.^[a-z]]*$/, '');
            }

            if(tag_object.tag == DicomConstants.TRANSFER_SYNTAX_UID_TAG){
              FILE_SETTINGS.transfer_syntax_uid = tag_object.value_field.replace(/[^0-9^.]*$/, '');
              switch(tag_object.value_field.replace(/[^0-9^.]*$/, '')){
                case DicomConstants.RAW_IMPLICIT_LITTLE:
                  IS_LITTLE_ENDIAN = true;
                  IS_IMPLICIT = true;
                  FILE_SETTINGS.is_little_endian = true;
                  FILE_SETTINGS.is_implicit = true;
                break;
                case DicomConstants.RAW_EXPLICIT_LITTLE:
                  IS_LITTLE_ENDIAN = true;
                  IS_IMPLICIT = false;
                  FILE_SETTINGS.is_little_endian = true;
                  FILE_SETTINGS.is_implicit = false;
                  // console.log(FILE_SETTINGS)
                break;
                case DicomConstants.RAW_EXPLICIT_BIG:
                  IS_LITTLE_ENDIAN = false;
                  IS_IMPLICIT = false;
                  FILE_SETTINGS.is_little_endian = false;
                  FILE_SETTINGS.is_implicit = false;
                break;
                default:
                break;
              }
            }
            offset = tag_object.next_offset;
            dicom_hash[tag_object.tag] = tag_object;
          }
        }
        console.log(dicom_loading_progress.missing_tags)
        return dicom_hash;
      }
    };
  });