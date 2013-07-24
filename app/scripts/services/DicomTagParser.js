'use strict';

angular.module('dcmreaderApp')
  .factory('DicomTagParser', function (DicomPixelReader, DicomConstants, TagDictionary, ValueRepresentationDictionary) {
    // Service logic
    // extract the name of the tag
    var is_tag_type2 = function(tag_string){
      return (tag_string.substring(0,3) === '0002');
    }
    var read_tag_string = function(dv, offset, is_little_endian){
        var byte0 = dv.getUint16(offset, is_little_endian);
        var byte1 = dv.getUint16(offset+2, is_little_endian);
        var tag_string = ((0xffff+1)| byte0).toString(16).slice(1).toUpperCase() +','+ ((0xffff+1)| byte1).toString(16).slice(1).toUpperCase();
        return tag_string;
    }
    // create a string of characters from Uint8 bytes at a given offset in a given dataview with appropriate endianness
    // dv is dataview, offset is start, length is length, options contains is_little_endian and convert_to_char flag
    var concatenateBytes = function (dv, offset, length, options){
      var concat_output = "";
      for(var i=0; i<length; i++){
        var byte_value = dv.getUint8(offset+i, options.is_little_endian);
        if(options.convert_to_char){
          byte_value = String.fromCharCode(byte_value);
        }
        concat_output+=byte_value;
      }
      return concat_output;
    }

    // read the Value Representation
    var read_vr = function(dv, offset, is_little_endian){
      var vr = concatenateBytes(dv, offset, 2, {is_little_endian:is_little_endian, convert_to_char: true});
      var vr_info = ValueRepresentationDictionary.lookup(vr);
      return {
        code: vr,
        info: vr_info
      }
    }
    // read the Value Length
    var read_vl = function(dv, tag_start_offset, is_little_endian, vr){
      var vl, vl_offset, value_offset;
      if(!vr){
        // implicit will have no vr defined
        vl_offset = tag_start_offset + 4;
        value_offset = vl_offset + 4;
        vl = dv.getUint32(vl_offset, is_little_endian);
      } else {
        if(_.contains(['OB', 'OW', 'OF', 'SQ', 'UT', 'UN'], vr)){
          vl_offset = tag_start_offset + 8;
          value_offset = vl_offset + 4;
          vl = dv.getUint32(vl_offset, is_little_endian);
        } else {
          vl_offset = tag_start_offset + 6;
          value_offset = vl_offset + 2;
          vl = dv.getUint16(vl_offset, is_little_endian);
        }
      }
      return {length: vl, offset: value_offset}
    }
    var read_non_pixel_data = function(dv, tag, is_little_endian){
      var tag_value;
      switch(tag.vr.info.type){
            case 'char string':
              tag_value = concatenateBytes(dv, tag.value_offset, tag.length, {is_little_endian:is_little_endian, convert_to_char: true});
            break;
            case 'Uint16':
              tag_value = dv.getUint16(tag.value_offset, is_little_endian);
            break;
            case 'Uint32':
              tag_value = dv.getUint32(tag.value_offset, is_little_endian);
            break;
            case 'byte string':
              tag_value = concatenateBytes(dv, tag.value_offset, tag.length, {is_little_endian:is_little_endian});
            break;
          }
      return tag_value;
    }

    // Public API here
    return {
      parse_tag: function(dv, offset, is_little_endian){
        // if we can't read 2 bytes, then get out
        if (dv.byteLength<=offset+2){

          // TODO
          // throw and exception
          throw new Error('trying to read too far into data view stream');
          return false;
        }
        var tag_string = read_tag_string(dv, offset, is_little_endian);
        // if the tag string is not found in the dictionary, then exit
        if(!TagDictionary.getTagDescription(tag_string)){
          // TODO
          // throw an exception
          return false;
        }
        if(is_tag_type2(tag_string)){
          // group 2 is little endian explicit
          is_little_endian = true;
        }
        var vr_offset = offset + 4; // 4 bytes for the tag name
        var vr = read_vr(dv, vr_offset, is_little_endian);
        var value_info = read_vl(dv, offset, is_little_endian, vr.code);
        var next_offset = value_info.offset + value_info.length;
        return {
          tag: tag_string,
          data: {
            offset: offset,
            value_offset: value_info.offset,
            tag_description: TagDictionary.getTagDescription(tag_string),
            vr: vr,
            length: value_info.length,
            // value: tag_value,
          },
          next_offset: next_offset
        }
      },
      read_tag_value: function(dv, tag, dicom_hash, is_little_endian){
        var tag_value;
        // if the tag is pixel data, then treat it differently
        if (tag.tag == DicomConstants.PLANAR_CONFIGURATION_TAG){
          console.log(tag, is_little_endian, read_non_pixel_data(dv, tag.data, is_little_endian));
        }
        if (tag.tag == DicomConstants.PIXEL_DATA_TAG){
          console.log(dicom_hash[DicomConstants.PLANAR_CONFIGURATION_TAG])
          var options = {
            is_little_endian: is_little_endian,
            is_planar_configuration: dicom_hash[DicomConstants.PLANAR_CONFIGURATION_TAG].value
          }
          tag_value = DicomPixelReader.read(dv, tag.data, options);
        } else {
          tag_value = read_non_pixel_data(dv, tag.data, is_little_endian);
        }
        return tag_value;
      }
    };
  });