'use strict';

angular.module('dcmreaderApp')
  .directive('rawImgCanvas', ['FileManager', function (FileManager) {
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

						var file_analysis = scope.fileManager.getActive().analysis;
						// draw the active region
						// var doppler_baseline = file_analysis.doppler_baseline;
						// var doppler_region = file_analysis.doppler_region;
						// // draw bounding area for PW data
						// context.rect(doppler_region['x0'], doppler_region['y0'], doppler_region['width'], doppler_region['height']);
						// context.strokeStyle="green";

						// // draw zero line
						// context.moveTo(doppler_baseline['x0'], doppler_baseline['y0']);
						// context.lineTo(doppler_baseline['x1'], doppler_baseline['y1']);
						// context.lineWidth=5;
						// context.stroke();

						// scope.fileManager.getActive().data.pngStream = canvas.toDataURL('image/png');
						// console.log(scope.fileManager.getActive().data.pngStream)
						// context.clearRect(0,0, image_width, image_height);
						// imgData = [];
						// scope.img_data = {};

						// console.log(scope.png_stream);
					}
      	}
				scope.$watch('fileManager.getActiveIndex()', function(newVal, oldVal){
					console.log(newVal)
					if(newVal!=oldVal){
						var img_data = scope.fileManager.getActive().data.get_image_data();
						// console.log(img_data)
				    	render_image_from_pixel_array(img_data.pixels, img_data.width, img_data.height, false);
					}
				});
  	}
  }
  }]);
