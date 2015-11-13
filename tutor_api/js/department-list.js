var app = angular.module('DepartmentApp', []).controller('DepartmentCtrl', function($scope, $http) {
	$http.get('http://tutorme-backend.herokuapp.com/tutor_api/departments/?format=json').then(function(data) {
		$scope.departments = data.data;
	});
});
