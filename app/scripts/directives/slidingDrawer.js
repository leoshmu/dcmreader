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
            element.find('.sidebar-inner').removeClass('left-sidebar-closed').addClass('left-sidebar-opened')
            element.css('z-index', '9001');
          } else {
            element.find('.sidebar-inner').addClass('left-sidebar-closed').removeClass('left-sidebar-opened')

            element.css('z-index', '8999');
          }
          scope.is_slide_out = !scope.is_slide_out;
        }

      }
    };
  });
