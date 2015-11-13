var app = angular.module('UserApp', []).controller('UserCtrl', function($scope, $http) {
	$http.get('http://tutorme-backend.herokuapp.com/tutor_api/users/?format=json').then(function(data) {
		$scope.users = data.data;
	});
});
