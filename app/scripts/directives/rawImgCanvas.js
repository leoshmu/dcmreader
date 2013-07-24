'use strict';

angular.module('dcmreaderApp')
  .directive('rawImgCanvas', function () {
    return {
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
        var canvas = element[0];

		var render_image_from_pixel_array = function(pixel_array, image_width, image_height, rgb_bool){

		  	if (canvas.getContext){
		  		element.attr('height', image_height+'px');
		  		element.attr('width', image_width+'px');
			    var context = canvas.getContext('2d');
			    // Put canvas drawing stuff here, e.g. context.fillStyle
				var imgData=context.createImageData(image_width, image_height);
				imgData.data.set(pixel_array);

				context.putImageData(imgData,0,0);
				scope.png_stream = canvas.toDataURL('image/png');
				context.clearRect(0,0, image_width, image_height);
				// imgData = [];
				// scope.img_data = {};

				// console.log(scope.png_stream);
			}
      	}
		scope.$watch('image_ready_to_render', function(newVal){
			if(newVal){
				var img_data = scope.dicom_object.get_image_data();
		    	render_image_from_pixel_array(img_data.pixels, img_data.width, img_data.height, true);
		    	scope.image_ready_to_render = false;
			}
		});
  	}
  }
  });
