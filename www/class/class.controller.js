(function () {
	'use strict';

	angular
		.module('app')
		.controller('ClassController', ClassController);

	ClassController.$inject = ['$location', 'AuthenticationService', '$scope', '$http', '$routeParams', 'classGetService', '$route'];
	function ClassController($location, AuthenticationService, $scope, $http, $routeParams, classGetService, $route) {
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

		$scope.open = function open(){
			$('#modal1').openModal();
		}

		$scope.addClass = function(){
			$('#modal1').closeModal();
			vm.dataLoading = true;
			console.log("sup");
			console.log($routeParams);
			getSchoolId($routeParams.schoolId);
		}

		function getSchoolId(schoolName) {
			$http.get('http://tutorme-backend.herokuapp.com/tutor_api/schools/?name=' + schoolName + '&format=json')
				.then(function(response) {
					var schoolNumber = (response.data)[0].id;
					getMajorNumber(schoolNumber);
				});
		}

		function getMajorNumber(schoolNumber) {
			$http.get('http://tutorme-backend.herokuapp.com/tutor_api/departments/?shortName=' + vm.major + '&format=json')
				.then(function(response) {
					var majorNumber = (response.data)[0].id;
					postNewClass(schoolNumber, majorNumber);
				});
		}

		function postNewClass(s, m) {
			$http.post("http://tutorme-backend.herokuapp.com/tutor_api/classes/", {
				number: vm.classNumber,
				major: m,
				school: s
			}).then(function(r) { $route.reload() });
		}

	}

})();
