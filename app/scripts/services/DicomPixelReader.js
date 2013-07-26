'use strict';

angular.module('dcmreaderApp')
  .factory('DicomPixelReader', function () {
    // Service logic
    var pixel_start_offset, total_pixels;
    
    var iterate_pixel_data = function(dv,options){
      var rgb_method;
      switch(options.is_planar_configuration){
        case 0:
          rgb_method = nonplanar_rgb;
        break;
        case 1:
          rgb_method = planar_rgb
        break;
        default:          
          throw new Error('is_planar_configuration not set!');
        break;
      }

      // TODO:
      // support different byte allocation settings and rgb vs grayscale settings
      var pixel_array = [];
      var pixel_clamped_array = new Uint8ClampedArray(total_pixels*4); // rgb+alpha per pixel
      
      var rgb_offset, offsetCounter = 0;
      if (dv.byteLength<total_pixels*3+pixel_start_offset){
        throw new Error('pixel iteration will take us beyond the size of the data view')
      }

      for (var i=0; i<total_pixels; i++){
        rgb_offset = rgb_method(i);
        pixel_clamped_array.set([
              dv.getUint8(rgb_offset[0], options.is_little_endian),
              dv.getUint8(rgb_offset[1], options.is_little_endian),
              dv.getUint8(rgb_offset[2], options.is_little_endian),
              255
            ], offsetCounter);
        offsetCounter+=4;
      }
      return pixel_clamped_array;
    }
    var nonplanar_rgb = function(pixel_index){
      // pixels look like
      // RGBRGBRGB...  
      var r_pixel = pixel_start_offset + pixel_index*3;
      var g_pixel = r_pixel+1;
      var b_pixel = r_pixel+2;
      return [r_pixel, g_pixel, b_pixel];
    }
    var planar_rgb = function(pixel_index){
      // if planar configuration 1, then the pixels are ordered
      // RRRR....GGGG...BBBB
      var r_pixel = pixel_start_offset + pixel_index;
      var g_pixel = r_pixel + total_pixels;
      var b_pixel = g_pixel + total_pixels;
      return [r_pixel, g_pixel, b_pixel];
    }

    // Public API here
    return {
      read : function(dv, tag_data, options){
        options = _.defaults(options||{}, {
          is_little_endian: false,
          is_planar_configuration: 0
        })
        pixel_start_offset = tag_data.value_offset;
        total_pixels = tag_data.length/3; // 3 values per pixel
        // TODO:
        // support different byte allocation settings and rgb vs grayscale settings
        return iterate_pixel_data(dv,options);
      }
    };
  });
