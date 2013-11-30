define(['angular', 'services/services', 'services/harAdapterFactory'], function(angular, services, HarAdapter) {
	'use strict';
	services.factory('HarAdapterList', ['HarAdapter', function (HarAdapter) {

		return function(harObjectArray) {
	        var harAdapterList = [];
	        for (var i=0; i<harObjectArray.length; i++) {
	        	harAdapterList.push( HarAdapter(harObjectArray[i]) );
	        }
	        
	        var _calculate = function(list, calculationType) {
	        	if (calculationType == "AVG") {
	        		var total = _calculate(list, "SUM");
	        		return total/list.length;
	        	} else if (calculationType == "SUM") {
	        		var total = 0;
	        		for (var i=0; i<list.length; i++) {
	        			total += list[i];
	        		}
	        		return total;
	        	}
	        };
	    
	        
	        /**
	         * Public methods
	         */
			return {
				getTotalRequestTime: function(calculationType) {
					var allTotalRequestTimes = [];
					for (var i=0;i<harAdapterList.length;i++) {
						allTotalRequestTimes.push(harAdapterList[i].getTotalRequestTime());
					}
					return _calculate(allTotalRequestTimes, calculationType);
				},
				
				getContentList: function() {
					var contentList = [];
					for (var i=0; i<harAdapterList.length; i++) {
						var currentContentTypeList = harAdapterList[i].getListOfContentTypes();
						for (var j=0; j<currentContentTypeList.length; j++) {
							var contentType = currentContentTypeList[j];
							if (contentList.toString().indexOf(contentType) == -1) contentList.push(contentType);
						};
					}
					return contentList;
				},
			
				getTotalBytesPerContent: function(calculationType, contentType) {
					var allTotalBytesPerContent = [];
					for (var i=0;i<harAdapterList.length;i++) {
						allTotalBytesPerContent.push(harAdapterList[i].getTotalBytesPerContent(contentType));
					}
					return _calculate(allTotalBytesPerContent, calculationType);
				},
				
				getTotalRequestsPerContent: function(calculationType, contentType) {
					var allTotalRequestsPerContent = [];
					for (var i=0;i<harAdapterList.length;i++) {
						allTotalRequestsPerContent.push(harAdapterList[i].getTotalRequestsPerContent(contentType));
					}
					return _calculate(allTotalRequestsPerContent, calculationType);
				}
			}
	    };
	}]);
});
