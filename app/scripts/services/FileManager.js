'use strict';

angular.module('dcmreaderApp')
  .factory('FileManager', function () {
    // Service logic
    // ...

    var loadedFilesArray = [];
    var activeFileIndex = 0;
    // Public API here
    return {
      get: function () {
        return loadedFilesArray;
      },
      getActive: function(){
        return loadedFilesArray[activeFileIndex];
      },
      getActiveIndex: function(){
        return activeFileIndex;
      },
      setActiveIndex: function(index){
        activeFileIndex = index;
        return this;
      },
      add: function(fileObject){
        fileObject.points = []
        loadedFilesArray.push(fileObject);
        this.setActiveIndex(loadedFilesArray.length-1)
        return loadedFilesArray;
      },
      remove: function(id){
        loadedFilesArray = _.without(loadedFilesArray, _.findWhere(loadedFilesArray, {id: id}))
        this.setActiveIndex(this.getActiveIndex()-1)
        return loadedFilesArray;
      }

    };
  });
