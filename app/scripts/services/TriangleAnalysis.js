'use strict';

angular.module('dcmreaderApp')
  .factory('TriangleAnalysis', [function() {
    // Service logic

    // Public API here
    return {
      update_indexes: function(pixel_data, tsr, vsr) {
        return {
          AT : (pixel_data.peak.x - pixel_data.start.x)*tsr,
          DT : (pixel_data.end.x - pixel_data.peak.x)*tsr,
          MaxV : (pixel_data.end.y - pixel_data.peak.y)*vsr
        }
      }
    };
  }]);
