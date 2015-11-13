var app = angular.module('ClassApp', []).controller('ClassCtrl', function($scope, $http) {
	$http.get('http://tutorme-backend.herokuapp.com/tutor_api/classes/?format=json').then(function(data) {
		$scope.classes = data.data;
	});
});
