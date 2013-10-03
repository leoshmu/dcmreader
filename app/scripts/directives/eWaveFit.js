'use strict';

angular.module('dcmreaderApp')
  .directive('eWaveFit', function () {
    return {
      restrict: 'EA',
      scope: {
      	analysis:'='
      },
      link: function postLink(scope, element, attrs) {

        var svg = d3.select('svg');
        var line_data =[];
        var up_slope = svg
        	.append("svg:line")
        	.style("stroke", "rgb(6,120,155)");;
        var down_slope = svg
        	.append("svg:line")
        	.style("stroke", "rgb(6,120,155)");;
					// //This is the accessor function we talked about above
				var lineFunction = d3.svg
														.line()
															.x(function(d) { return d.x; })
															.y(function(d) { return d.y; })
															.interpolate("linear");
				var colorFunction = function(type){
					switch(type){
						case 'underdamped':
							return 'green';
						break;
						case 'overdamped':
							return 'red';
						break;
						case 'underdamped_critical':
							return 'orange';
						break;
						default:
							return 'white';
						break;
					}
				}


        scope.$watch('analysis.e_wave.pixel_data',function(newVal, oldVal){
			    if(!oldVal || !_.isEqual(newVal.start, oldVal.start)){
				    up_slope
				    	.attr("x1", newVal.start.x)
				    	.attr("y1", newVal.start.y)
			    }
			    if(!oldVal || !_.isEqual(newVal.peak, oldVal.peak)){
				    up_slope
				    	.attr("x2", newVal.peak.x)
				    	.attr("y2", newVal.peak.y)
				    down_slope
			    	.attr("x1", newVal.peak.x)
			    	.attr("y1", newVal.peak.y)
			    }
			    if(!oldVal || !_.isEqual(newVal.end, oldVal.end)){
				    down_slope
				    	.attr("x2", newVal.end.x)
				    	.attr("y2", newVal.end.y)
			    }
			    svg.select("path").remove();
			    line_data = scope.analysis.update_e_wave(newVal);

			    var lineGraph = svg.append("path")
	                            .attr("d", lineFunction(line_data.data))
	                            .attr("stroke", colorFunction(line_data.type))
	                            .attr("stroke-width", 2)
	                            .attr("fill", "none");
        }, true)


			  scope.$on('$destroy',function(){
        		d3.select('svg').select('svg:line').remove();
        });
      }
    };
  });
