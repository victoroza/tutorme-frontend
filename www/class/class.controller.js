(function () {
	'use strict';

	angular
		.module('app')
		.controller('ClassController', ClassController);

	ClassController.$inject = ['$location', 'AuthenticationService', '$scope', '$http', '$routeParams', 'classGetService'];
	function ClassController($location, AuthenticationService, $scope, $http, $routeParams, classGetService) {
		var vm = this;
		(function initController() {
			// $scope.classes1 = null;
			$scope.dataMajor = null;
			var dataM = null;
			$http.get('http://tutorme-backend.herokuapp.com/tutor_api/classes/?school__name=' + $routeParams.schoolId +'&format=json').then(function(data) {
			console.log(data.data);
			$scope.classes1 = data.data;
			$scope.schoolId = $routeParams.schoolId;
		});
		})();

		function populateData() {
			vm.dataLoading = true;
			$http.get('http://tutorme-backend.herokuapp.com/tutor_api/classes/?school__name=' + $routeParams.schoolId + '&format=json').then(function(data) {
				$scope.classes1 = data.data;
			});
		};
	}

})();
