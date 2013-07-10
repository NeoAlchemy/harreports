'use strict';

HarReportsServices.factory('HarAdapterList', ['HarAdapter', function (HarAdapter) {

	return function(harObjectArray) {
        var harAdapterList = [];
        for (var i=0; i<harObjectArray.length; i++) {
        	harAdapterList.push( HarAdapter(harObjectArray[i]) );
        }
        
        var _calculate = function(list, type) {
        	if (type == "AVG") {
        		var total = 0;
        		for (var i=0; i<list.length; i++) {
        			total += list[i];
        		}
        		return total/list.length;
        	}
        }
        
        /**
         * Public methods
         */
		return {
			getTotalRequestTime: function(type) {
				var allTotalRequestTimes = [];
				for (var i=0;i<harAdapterList.length;i++) {
					allTotalRequestTimes.push(harAdapterList[i].getTotalRequestTime());
				}
				return _calculate(allTotalRequestTimes, type);
			}
		}
    };
}]);
