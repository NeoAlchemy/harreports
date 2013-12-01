define(['controllers/controllers', 'services/harAdapterListFactory'], function(controllers, HarAdapterList) {
	controllers.controller('totalResponseTimePerContentCtrl', ['$scope', 'HarAdapterList', function($scope, HarAdapterList) {
		$scope.$watch('harList', function(newValue, oldValue) {
			var visualizationData = [];
			visualizationData.push([ 'content', 'total response time' ]);

			var contentTypeList = HarAdapterList($scope.harList).getContentList();
			for ( var i = 0; i < contentTypeList.length; i++) {
				var contentType = contentTypeList[i];
				visualizationData.push([
					contentType,
					 HarAdapterList($scope.harList).getTotalResponseTimePerContent("AVG", contentType) 
				]);
			}

			var data = google.visualization.arrayToDataTable(visualizationData);

			var options = {
				title : 'Total Response Time per Content Type',
				is3D : true,
				legend: {
					position: 'labeled'
				},
				chartArea: {
					height: "100%"
				}
			};

			var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
			chart.draw(data, options);
		});
	
		//$scope.averageBytes = _calculateAverageBytes();
		//$scope.averageRequests = _calculateAverageRequests();
	}]);
});