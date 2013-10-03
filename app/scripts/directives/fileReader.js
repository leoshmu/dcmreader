'use strict';

angular.module('dcmreaderApp')
  .directive('ngFileReader', [
    'FileManager',
    '$q',
    '$timeout',
    'DicomConstants',
    'DicomFile',
    'DopplerFileAnalyzer',
    'ValueRepresentationDictionary',
    'TagDictionary',
    function (FileManager, $q, $timeout, DicomConstants, DicomFile, DopplerFileAnalyzer, ValueRepresentationDictionary, TagDictionary) {
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
          templateUrl: 'views/file_upload.html',
          transclude: true,

          link: function postLink(scope, element, attrs) {
            scope.click_input = function(){
                element.find('input[type="file"]').click();
            }
            element.find('input[type="file"]').bind('change', function(ev){
            	var file = ev.target.files[0];
        		processFileByReader(file, 'buffer').then(
                    function(result){
                        var dicom_file, file_analyze;
                        dicom_file = new DicomFile(result);

                        // if there is a sequence of ultrasound regions
                        // then do some image analysis
                        // TODO: make the Analysis step more general and handle type
                        // of analysis inside that more general Analysis service
                        if (dicom_file[DicomConstants.SEQUENCE_OF_ULTRASOUND_REGIONS_TAG]){
                            var file_analyze = new DopplerFileAnalyzer(dicom_file);
                        }
                        var newFile = {
                            id: _.uniqueId('file_'),
                            lastModifiedDate: file.lastModifiedDate,
                            name: file.name,
                            type: file.type,
                            size: file.size,
                            data: dicom_file,
                            analysis: file_analyze
                        }

                        FileManager.add(newFile);
        			});
                })
          }
        };
    }
]);
