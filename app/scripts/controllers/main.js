'use strict';

angular.module('dcmreaderApp')
  .controller('MainCtrl', ['$scope', 'FileManager', function ($scope,FileManager) {

    $scope.removeFile = function(id){
      FileManager.remove(id);
    }
    $scope.fileManager = FileManager;

    $scope.tag_hash = {};
    $scope.tag_array = [];
    $scope.img_data = {};

  }]);
