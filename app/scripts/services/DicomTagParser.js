'use strict';

angular.module('dcmreaderApp')
  .factory('DicomTagParser', function (DicomPixelReader, DicomConstants, TagDictionary, ValueRepresentationDictionary) {
    // Service logic
    // extract the name of the tag
    var is_tag_group2 = function(tag_string, is_little_endian){
      var group_string = tag_string.substring(0,4);
      if(tag_string=="0200,1200"){
        // debugger
      }
      if(is_little_endian){
        return (group_string === '0002');
      } else {
        return (group_string === '0200');
      }
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
    var get_implicit_vr = function(tag){
      var vr = TagDictionary.getTagVR(tag);
      var vr_info = ValueRepresentationDictionary.lookup(vr);
      return {
        code: vr,
        info: vr_info
      }
    }

    var read_non_pixel_data = function(dv, value_offset, value_length, vr_type, FILE_SETTINGS){
      var is_little_endian = FILE_SETTINGS.is_little_endian;
      var tag_value;
      switch(vr_type){
            case 'char string':
              tag_value = concatenateBytes(dv, value_offset, value_length, {is_little_endian:is_little_endian, convert_to_char: true});
            break;
            case 'Uint16':
              tag_value = dv.getUint16(value_offset, is_little_endian);
            break;
            case 'Uint32':
              tag_value = dv.getUint32(value_offset, is_little_endian);
            break;
            case 'byte string':
              tag_value = concatenateBytes(dv, value_offset, value_length, {is_little_endian:is_little_endian});
            break;
            case 'signed int32':
              tag_value = dv.getInt32(value_offset, is_little_endian);
            break;
            case 'signed int16':
              tag_value = dv.getInt16(value_offset, is_little_endian);
            break;
            case 'Float64':
              tag_value = dv.getFloat64(value_offset, is_little_endian);
            break;
            case 'Float32':
              tag_value = dv.getFloat32(value_offset, is_little_endian);
            break;
            case 'Float16':
              tag_value = dv.getFloat16(value_offset, is_little_endian);
            break;
            default:
              // console.log(tag)
            break;
          }
      return tag_value;
    }
    var is_tag_implicit = function(tag){
      return _.contains(DicomConstants.IMPLICIT_TAGS, tag);
    };
    var parse_undefined_length_item_value = function(dv, offset, FILE_SETTINGS){
        // ends with the ITEM DELIMITER TAG
      var is_item_end_found = false;
      var item_value = [];
      while(!is_item_end_found){
        var data_element = parse_data_element(dv, offset, FILE_SETTINGS);
        item_value.push(data_element);
        offset = data_element.next_offset;

        if (data_element.tag == DicomConstants.ITEM_DELIMITATION_ITEM){

          is_item_end_found = true;
        }
      }
      return {value: item_value, next_offset: offset};
    };

    var parse_data_element = function(dv, data_element_offset, FILE_SETTINGS){
      // ALL Data Elements have the following structure
      // 4 byte tag string (2 bytes Group Number + 2 bytes Element Number)
      // 0, 2, or 4 byte VR (2 bytes + 2reserved bytes 0000H). 0 is if the data is implicit. 2 vs 4 depends on type of VR
      // 2 or 4 bytes for Value Length depending on VR length ( VR 2 VL 2, VR 0||4 VL 4)
      // VL length or undefined length
      //
      //
      var
        tag,
        vr,
        vr_type,
        value_length,
        vl_tag,
        value_length_bytes,

        value_length_offset,
        value_field,
        value_field_offset,
        next_offset;
      var is_little_endian = FILE_SETTINGS.is_little_endian;
      var is_implicit = FILE_SETTINGS.is_implicit;
      // first read the tag of the data element
      tag = read_tag_string(dv, data_element_offset, is_little_endian);
      // if the tag is group 2, then reread the tag with little endian
      if(!is_little_endian && is_tag_group2(tag, is_little_endian)){
        // group 2 is little endian explicit
        is_little_endian = true;
        is_implicit = false;
        tag = read_tag_string(dv, data_element_offset, is_little_endian);
      } else {
        if(is_implicit && is_tag_group2(tag, is_little_endian)){
          is_implicit = false;
        }
      }
      // next, read the vr, unless if we have implicit encoding, or if the tag implies implicit encoding

      value_length_bytes = 32;
      if(is_implicit || is_tag_implicit(tag)){
        var vr_object = get_implicit_vr(tag);
        vr_type = (vr_object.info) ? vr_object.info.type : false;
        value_length_offset = data_element_offset + 4; // tag is 4 bytes, and vr is not present
      } else {
        var vr_object = read_vr(dv, data_element_offset + 4, is_little_endian);
        vr = vr_object.code;
        vr_type = vr_object.info.type;
        // value length is 32 bytes unless specific explicit non 32 bit vr!
        if(!_.contains(DicomConstants.VR_32BIT_CODES,vr)){
          value_length_bytes = 16;
          value_length_offset = data_element_offset + 6; // tag is 4 bytes, and vr is 2 bytes
        } else {
          value_length_offset = data_element_offset + 8; // tag is 4 bytes, and vr is 4 bytes (2 bytes of vr plus 2 bytes reserved)
        }
      }
      // next, read the value length
      // value llength is 16 bit if vr is explicit and not OB, OW, OF, SQ, UT, UN
      if(value_length_bytes==16){
        value_length = dv.getUint16(value_length_offset, is_little_endian);
        value_field_offset = value_length_offset + 2;
      } else {
        value_length = dv.getUint32(value_length_offset, is_little_endian);
        value_field_offset = value_length_offset + 4;
        vl_tag = read_tag_string(dv, value_length_offset, is_little_endian);
        if(vl_tag == DicomConstants.UNDEFINED_LENGTH){
          value_length = undefined;
        }
      }
      // finally, read the value field
      // if we have a vr of SQ, then we need special code to unpack
      // data elements inside the VALUE of a SEQUENCE
      if(vr == DicomConstants.SEQUENCE_VR){
        // read a sequence
        var info = read_sequence_data_elements(dv, value_field_offset, value_length, FILE_SETTINGS)
        value_field = info.value;
        next_offset = info.next_offset;
      } else {

        // if the value length is undefined, then we need to read an undefined value
        if(value_length==undefined){
          var parsed_item = parse_undefined_length_item_value(dv, value_field_offset, FILE_SETTINGS);
          value_field = parsed_item.value;
          next_offset = parsed_item.next_offset;
        } else {
          if(tag == DicomConstants.PIXEL_DATA_TAG){
            //read pixel data
            console.log('pixel data time', tag, vr_object, FILE_SETTINGS)
            value_field = DicomPixelReader.read(dv, value_field_offset, value_length, FILE_SETTINGS);
          } else {
            value_field = read_non_pixel_data(dv, value_field_offset, value_length, vr_type, FILE_SETTINGS);
          }
          next_offset = value_field_offset + value_length;
        }
      }
      return {
        tag: tag,
        vr: vr,
        vr_object: vr_object,
        value_length: value_length,
        tag_description : TagDictionary.getTagDescription(tag),
        value_length_offset : value_length_offset,
        value_field_offset: value_field_offset,
        value_field:value_field,
        offset: data_element_offset,
        next_offset : next_offset
      }
    };

    var read_sequence_data_elements = function(dv, value_offset, value_length, FILE_SETTINGS){
      var offset = value_offset;
      var data_element_value_array = [];
      var parsed_data_element;
      if(value_length){
        // parse sequence of known length
      } else {
        var is_sequence_end_found = false;
        var tag_string;
        var next_offset;
        while(!is_sequence_end_found){
          parsed_data_element = parse_data_element(dv, offset, FILE_SETTINGS);
          data_element_value_array.push(parsed_data_element);
          offset = parsed_data_element.next_offset;

          if(parsed_data_element.tag == DicomConstants.SEQUENCE_DELIMITATION_ITEM){
            is_sequence_end_found = true;
          }
        }
      }
      return {value: data_element_value_array, next_offset: offset}
    };


    // Public API here
    return {
      check_start_tag: function(dv){
        // the dicm standard dictates that the start shall be
        // 128 bytes of 0, followed by letters DICM
        var start_offset = DicomConstants.HEADER_ZERO_OFFSET;
        var is_little_endian = true;
        var tag_string = read_tag_string(dv,start_offset, is_little_endian);
        if (tag_string == DicomConstants.DICM_START_TAG){
          return true;
        } else {
          return false;
        }
      },

      parse_data_element: function(dv, offset, FILE_SETTINGS){

        return parse_data_element(dv, offset, FILE_SETTINGS);
      }

      // read the value of a tag at a certain position
      // and return the offset after the value

    };
  });