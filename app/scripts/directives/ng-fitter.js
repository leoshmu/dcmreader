'use strict';

angular.module('dcmreaderApp')
  .directive('ngFitter', function () {
  	var initialized = false;
   	return {
      scope: {fit:'='},

      restrict: 'E',
      replace: true,
      link: function(scope, element, attrs){

        var drag = d3.behavior.drag()
          .on("drag", dragmove);

        function dragmove(d) {
          scope.$apply(function(){
          	scope.fit.x = d3.event.x
          	if(!attrs.limitX){
	          	scope.fit.y = d3.event.y
          	}
          });
        }

        var circle = d3.select('svg')
            .append("circle")
            .attr("r", 10)
            .style("fill", 'red')
            .style("opacity", 0.4)
            .call(drag)

        circle.on('mouseenter', function(){
          d3.select(this).classed('active-point', true)
        });

        circle.on('mouseleave', function(){
          var ev = d3.event
          if(ev.which===0){
            d3.select(this).classed('active-point', false);
          }
        });

        circle.on('mouseup', function(){
          d3.select(this).classed('moving-point', false);
          scope.move = false;
        });

        scope.$watch('fit', function (newVal, oldVal) {
        	if(scope.fit && scope.fit.x){
        		circle
            .attr("cx", scope.fit.x)
        	}
          if(scope.fit && scope.fit.y){
          	circle
            .attr("cy", scope.fit.y)
          }
        },true)

        scope.$on('$destroy',function(){
        		d3.select('svg').select('circle').remove();
        });
      }
    }
  });
