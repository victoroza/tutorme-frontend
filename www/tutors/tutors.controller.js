(function () {
	'use strict';

	angular
		.module('app')
		.controller('TutorController', TutorController);

	TutorController.$inject = ['$location', 'AuthenticationService', '$scope', '$http', '$routeParams', '$route'];
	function TutorController($location, AuthenticationService, $scope, $http, $routeParams, $route) {
		var vm = this;
		(function initController() {

			$scope.tutors = [];
			$scope.classInfo = $routeParams;
			$scope.classId = $routeParams.classNumber;

			
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
		$scope.addToTutor = function addToTutor(){
				$http.get('http://tutorme-backend.herokuapp.com/tutor_api/tutor/?aClass__number=' + $routeParams.classNumber + '&user__username=' + localStorage.username +'&format=json').then(function(response){
						if(response.data.length > 0){
							$('#modal1').openModal();
						} else {
							postAddToTutor();
						}
					}); //end get
			}
		function postAddToTutor() {
			$http.post('http://tutorme-backend.herokuapp.com/tutor_api/tutor/', {
                aClass : $routeParams.classId,
                user : localStorage.id,
	            })
	                .then(function(response) {
	                    // alert(response.status);
	                    console.log(response);
	                    console.log(response.data);
	                    $route.reload();
	                },
	                function(response) {
	                    alert("There is an error in the input");
	                    // alert(response.status);
	                });
		}
	} //end TutorController

})();
