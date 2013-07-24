'use strict';

angular.module('dcmreaderApp')
  .controller('MainCtrl', ['$scope', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.tag_hash = {};
    $scope.tag_array = [];
    $scope.img_data = {};

  }]);
