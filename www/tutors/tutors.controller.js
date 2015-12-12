(function () {
	'use strict';

	angular
		.module('app')
		.controller('TutorController', TutorController);

	TutorController.$inject = ['$location', 'AuthenticationService', '$scope', '$http', '$routeParams'];
	function TutorController($location, AuthenticationService, $scope, $http, $routeParams) {
		var vm = this;
		(function initController() {

			$scope.tutors = [];
			$scope.classInfo = $routeParams;

			
			$http.get('http://tutorme-backend.herokuapp.com/tutor_api/tutor/?aClass__number=' + $routeParams.classNumber +'&format=json')
				.then(function(response) {
					setTutors(response.data);
				}); //end get
			
			function setTutors(tutorList) {
				$.each(tutorList, function(i, t) {
					$http.get('http://tutorme-backend.herokuapp.com/tutor_api/users/' + t.user + '/?format=json').then(function(response) {
						setTutorInfo(response.data);
					}); //end get
				}); //end foreach
			}

			function setTutorInfo(userInfo) {
				$scope.tutors.push(userInfo);
			}


		})(); //end initController

	} //end TutorController

})();
