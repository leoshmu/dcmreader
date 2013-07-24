'use strict';

angular.module('dcmreaderApp')
  .directive('ngFileReader', ['$q','$timeout', 'DicomFile', 'ValueRepresentationDictionary','TagDictionary', function ($q, $timeout, DicomFile, ValueRepresentationDictionary, TagDictionary) {
    var processFileByReader = function(file, type){
		var deferred = $q.defer();
  	var fileReader = new FileReader();

    	fileReader.onloadstart = function(){

    	}
    	fileReader.onprogress = function(ev){
			// if(ev.lengthComputable){
			// 	$timeout(function(){
			// 		// console.log('compute', scope.percentLoaded);
			// 		scope.percentLoaded = Math.round(ev.loaded/ev.total * 100)+'%';
			// 	}, 1000);
			// }
    	}
    	fileReader.onloadend = function(){

    	}
    	fileReader.onload = function(e){
    		// console.log(e.target.result)
    		console.log('defer then')
    		$timeout(function(){
	    		deferred.resolve(e.target.result);
    		})
    	}
    	fileReader.onerror = function(e){
    		console.log('error', e);
    		deferred.reject('error loading the file')
    	}
    	fileReader.onabort = function(){

    	}

    	switch(type){
    		case 'text':
				fileReader.readAsText(file);
			break;
			case 'binary':
				fileReader.readAsBinaryString(file);
			break;
			case 'data':
				fileReader.readAsDataURL(file);
			break;
			case 'buffer':
				fileReader.readAsArrayBuffer(file);
			break;
    	}
    	return deferred.promise
    }

    return {
      restrict: 'EA',
      template: '<div>{{percentLoaded}}</div><div ng-transclude></div>',
      replace: false,
      transclude: true,
      link: function postLink(scope, element, attrs) {
        element.find('input').bind('change', function(ev){
        	var file = ev.target.files[0];
    			processFileByReader(file, 'buffer').then(function(result){
            scope.dicom_object = {};
            console.log(result);
            var dicomImage = new DicomFile(result);
            scope.dicom_object = dicomImage;
            scope.image_ready_to_render = true;
            console.log(dicomImage.get_image_data());
    			});
        })
      }
    };
  }]);
