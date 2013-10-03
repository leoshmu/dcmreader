'use strict';

angular.module('dcmreaderApp')
  .directive('slidingDrawer', function () {
    return {
      templateUrl: 'views/sliding_drawer.html',
      restrict: 'E',
      transclude:true,
      link: function postLink(scope, element, attrs) {
      scope.is_slide_out = false;
        scope.slide = function(){
          if(!scope.is_slide_out){
            element.find('.sidebar-inner').css('left', 0);
          } else {
            element.find('.sidebar-inner').css('left', '97.5%');
            element.css('z-index', '10');
          }
          scope.is_slide_out = !scope.is_slide_out;
        }

      }
    };
  });
