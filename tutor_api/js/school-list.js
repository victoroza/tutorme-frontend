var app = angular.module('SchoolApp', []).controller('SchoolCtrl', function($scope, $http) {
	$http.get('http://tutorme-backend.herokuapp.com/tutor_api/schools/?format=json').then(function(data) {
		$scope.schools = data.data;
	});
});
