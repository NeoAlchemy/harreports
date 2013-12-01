define(['controllers/controllers', 'services/harAdapterListFactory'], function(controllers, HarAdapterList) {
	controllers.controller('totalRequestsPerAjaxContentCtrl', ['$scope', 'HarAdapterList', function($scope, HarAdapterList) {
		$scope.$watch('harList', function(newValue, oldValue) {
			var visualizationData = [];
			visualizationData.push([ 'content', 'total requests' ]);

			var contentTypeList = HarAdapterList($scope.harList).getAjaxContentList();
			for ( var i = 0; i < contentTypeList.length; i++) {
				var contentType = contentTypeList[i];
				visualizationData.push([
					contentType,
					 HarAdapterList($scope.harList).getTotalRequestsPerAjaxContent("AVG", contentType) 
				]);
			}

			var data = google.visualization.arrayToDataTable(visualizationData);

			var options = {
				title : 'Total Requests per Content Type',
				chartArea: {
					height: "100%"
				}
			};

			var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
			chart.draw(data, options);
		});
	
		//$scope.averageBytes = _calculateAverageBytes();
		//$scope.averageRequests = _calculateAverageRequests();
	}]);
});