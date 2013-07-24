'use strict';

angular.module('dcmreaderApp')
  .factory('DicomPixelReader', function () {
    // Service logic


    // Public API here
    return {
      read : function(dv, tag_data, options){
      options = _.defaults(options||{}, {
        is_little_endian: false,
        is_planar_configuration: 0
      })
      // TODO:
      // support different byte allocation settings and rgb vs grayscale settings
      var pixel_array = [];
      var pixel_clamped_array = new Uint8ClampedArray(tag_data.length*4/3);

      // if planar configuration 1, then the pixels are ordered
      // RRRR....GGGG...BBBB
      // otherwise the order is
      // RGBRGBRGB...
      var rgb_offset, offsetCounter = 0;
      for(var i = tag_data.value_offset; i<tag_data.value_offset+tag_data.length/3; i++){
        if (dv.byteLength>i){
          switch(options.is_planar_configuration){
            case 0:
              rgb_offset = [i, i+1, i+2];
            break;
            case 1:
              rgb_offset = [i, i+tag_data.length/3, i+2*tag_data.length/3];
            break;
            default:
              // throw an exception here
              throw new Error('is_planar_configuration not set!');
            break;
          }
          pixel_clamped_array.set([
                dv.getUint8(rgb_offset[0], options.is_little_endian),
                dv.getUint8(rgb_offset[1], options.is_little_endian),
                dv.getUint8(rgb_offset[2], options.is_little_endian),
                255
              ], offsetCounter);
          offsetCounter+=4;
        }
      }
      return pixel_clamped_array;
    }
    };
  });
