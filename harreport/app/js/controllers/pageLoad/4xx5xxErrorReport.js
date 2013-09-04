define(['controllers/controllers', 'services/harAdapterListFactory'], function(controllers, HarAdapterList) {
	controllers.controller('4xx5xxErrorReportCtrl', ['$scope', 'HarAdapterList', function($scope, HarAdapterList) {
		$scope.$watch('harList', function(newValue, oldValue) {
			 //HarAdapterList($scope.harList).getTotalRequestTime("AVG");
			 var data = google.visualization.arrayToDataTable([
	    	   ['title', 'Time'],
	    	   ['avg', $scope.averageTime]
	    	 ]);
	    	
	    	 var options = {
	           title: 'Average Page Time',
	         };
	    	 
	    	 var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
	         chart.draw(data, options);
		});
	
		//$scope.averageBytes = _calculateAverageBytes();
		//$scope.averageRequests = _calculateAverageRequests();
	}]);
});