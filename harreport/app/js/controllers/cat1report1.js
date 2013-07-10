HarReportsController.controller('cat1report1Ctrl', ['$scope', 'HarAdapterList', function($scope, HarAdapterList) {
	
	$scope.$watch('harList', function(newValue, oldValue) {
		$scope.averageTime = HarAdapterList($scope.harList).getTotalRequestTime("AVG");
	});
	
	//$scope.averageBytes = _calculateAverageBytes();
	//$scope.averageRequests = _calculateAverageRequests();
}]);