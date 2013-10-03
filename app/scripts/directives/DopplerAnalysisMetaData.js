'use strict';

angular.module('dcmreaderApp')
  .directive('dopplerAnalysisMetaData', [function () {
    return {
      templateUrl: 'views/doppler_metadata.html',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
      }
    };
  }]);
