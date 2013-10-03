'use strict';

angular.module('dcmreaderApp')
  .directive('dcmMetaDataTable', ['$compile', function ($compile) {
    return {

      restrict: 'EA',
      scope: {'metadata':'='},
      link: function postLink(scope, element, attrs) {
      	var template = '<table class="table table-condensed table-striped">'+
						'	<thead>'+
						'		<tr>'+
						'			<th>Tag</th>'+
						'			<th>Description</th>'+
						'			<th>Value</th>'+
						'		</tr>'+
						'	</thead>'+
						'	<tbody>'+
						'		<tr ng-repeat="(tag,details) in metadata">'+
						'			<td>{{details.tag}}</td>'+
						'			<td>{{details.tag_description}}</td>'+
						'			<td>'+
						'				<div ng-if="details.value_field.push">'+
						'					<dcm-meta-data-table metadata = "details.value_field"></dcm-meta-data-table>'+
						'				</div>'+
						'				<div ng-if="!details.value_field.push">'+
						'					<div ng-if="details.tag_description==\'Pixel Data\'">'+
						'						Pixel Data'+
						'					</div>'+
						'					<div ng-if="details.tag_description!=\'Pixel Data\'">'+
						'						{{details.value_field}}'+
						'					</div>'+
						'				</div>'+
						'			</td>'+
						'		</tr>'+
						'	</tbody>'+
						'</table>';

				var newElement = angular.element(template);
        $compile(newElement)(scope);
        element.replaceWith(newElement);
      }
    };
  }]);
