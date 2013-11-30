define(['angular', 'services/services'], function(angular, services) {
	'use strict';
		
	services.factory('HarAdapter', function () {
	
		return function(harObject) {
	        // the start time that network happened
			var _initialStartTime = new Date(harObject.log.pages[0].startedDateTime).getTime();
	        
			// this is the last request made and the amount of time it takes
	        var _getLastRequestFinalTime = function() {
	        	var lastEntry = harObject.log.entries[harObject.log.entries.length - 1];
				var lastRequestTime = 0;
				for (var timeKey in lastEntry.timings) {
					lastRequestTime = lastEntry.timings[timeKey] + lastRequestTime;
				}
				var endTime = new Date(lastEntry.startedDateTime).getTime() + lastRequestTime;
				return endTime;
	        };
	        
	        var _getContentBreakdownObjectOfEntries = function() {
	        	var contentBreakdown = {};
	        	var entries = harObject.log.entries;
	        	for (var i=0; i<entries.length; i++) {
					var entry = entries[i];
					try {
						var contentType = entry.response.content.mimeType;
						if (!contentBreakdown[contentType]) contentBreakdown[contentType] = [];
						contentBreakdown[contentType].push(entry);
						
					} catch (e) {
						if (!contentBreakdown["unknown"]) contentBreakdown["unknown"] = [];
						contentBreakdown.push(entry);
					}
				}
	        	
	        	return contentBreakdown;
	        };
	        
	        
	        /**
	         * Public methods
	         */
			return {
				getTotalRequestTime: function() {
					return _getLastRequestFinalTime() - _initialStartTime;
				},
				
				getListOfContentTypes: function() {
					var listOfContentTypes = [];
					angular.forEach(_getContentBreakdownObjectOfEntries(), function(value, key){
						this.push(key);
					}, listOfContentTypes);
					return listOfContentTypes;
				},
				
				getTotalBytesPerContent: function(contentType) {
					var listOfContentType = _getContentBreakdownObjectOfEntries()[contentType];
					var totalBytes = 0;
					for (var i=0;i<listOfContentType.length;i++) {
						var totalBytes =+ listOfContentType[i].response.content.size;
					}
					return totalBytes;
				},
				
				getTotalRequestsPerContent: function(contentType) {
					return _getContentBreakdownObjectOfEntries()[contentType].length;
				}
			}
	    };
	});
});