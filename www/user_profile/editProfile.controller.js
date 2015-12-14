(function () {
	'use strict';

	angular
		.module('app')
		.controller('EditProfileController', EditProfileController);

	EditProfileController.$inject = ['$location', 'AuthenticationService', '$scope', '$http', '$routeParams'];
	function EditProfileController($location, AuthenticationService, $scope, $http, $routeParams) {
		var config = { 'headers': {'Authorization': 'Token ' + localStorage.token}};
		var vm = this;
		var classes = [];
		console.log("editing profile");
		(function initController() {
			$http.get('http://tutorme-backend.herokuapp.com/tutor_api/users/'+ $routeParams.userId +'?format=json', config).then(function(data) {
				$scope.user = data.data;
				$scope.classes = classes;
				getTutorClasses(data.data);
			});

			function getTutorClasses(user) {
				$http.get('http://tutorme-backend.herokuapp.com/tutor_api/tutor/?user__username=' + user.username + '&format=json')
				.then(function(response) {
					loopClasses(response.data);
				});
			}

			function loopClasses(classList) {
				$.each(classList, function(i, c) {
					$http.get('http://tutorme-backend.herokuapp.com/tutor_api/classes/?id=' + c.aClass + '&format=json')
					.then(function(response) {
						setClassInfo(response.data);
					});
				});
			}

			function setClassInfo(classInfo) {
				classes.push(classInfo[0]);
			}
		})();

		function populateData() {
			vm.dataLoading = true;
			$http.get('http://tutorme-backend.herokuapp.com/tutor_api/users/'+ $routeParams.userId +'?format=json', config).then(function(data) {
				console.log("got to populateData editProfile");
				$scope.user = data.data;
			});
		};

		function update() {
			vm.dataLoading = true;
			console.log(vm);
			$http.put('http://tutorme-backend.herokuapp.com/tutor_api/users/' + $routeParams.userId, {
					first_name: vm.first_name,
					last_name: vm.last_name,
					email: vm.email,
					phone: vm.phone,
					password: vm.password,
					username: localStorage.username,
					picture: vm.picture
				}).then(function(response){
						console.log(response.status);
						if(response.status==200){

						}
			}, function(response){
					console.log(response.data);
					var data = response.data;
					var error = "";
					$.each(data, function(k, v) {
						error = error + k + " is input incorrectly " + v[0] +'\n';
					});
					alert(error);

					vm.dataLoading = false;
					// response.data
				}
			);
		};

		$scope.stopTutoring = function(id) {
			$http.get('http://tutorme-backend.herokuapp.com/tutor_api/tutor/?aClass__id=' + id + '&user__username=' + localStorage.username + '&format=json')
				.then(function(response) {
					deleteTutor(response.data);
				});
		}

		function deleteTutor(tutor) {
			$http.delete('http://tutorme-backend.herokuapp.com/tutor_api/tutor/' + tutor[0].id);
		};
	}
})();
