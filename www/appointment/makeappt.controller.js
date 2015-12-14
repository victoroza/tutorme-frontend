(function () {
	'use strict';

	angular
	.module('app')
	.controller('MakeApptController', MakeApptController);

MakeApptController.$inject = ['$location', 'AuthenticationService', '$scope', '$http', '$routeParams'];
function MakeApptController($location, AuthenticationService, $scope, $http, $routeParams) {
	var vm = this;

	vm.makeAppt = makeAppt;

	(function initController() {
        $http.get('http://tutorme-backend.herokuapp.com/tutor_api/users/' + $routeParams.tutorId +'?format=json').then(function(data) {
            console.log(data.data);
            $scope.user = data.data;
        });
	})();
        function makeAppt() {
             console.log(vm.date);
        //     vm.dataLoading = true;
        //     console.log(vm);
        //     $http.post('http://tutorme-backend.herokuapp.com/tutor_api/appointment/', {
        //         aClass : $routeParams.classId,
        //         tutee : localStorage.username,
        //         tutor: $routeParams.tutorId,
        //         location : vm.location_in,
        //         notes : vm.notes,
        //         times : vm.date
        //     })
        //         .then(function(response) {
        //             // alert(response.status);
        //             console.log(response);
        //             console.log(response.data);
        //             $location.path('/login');
        //         },
        //         function(response) {
        //             // alert(response.status);
        //         });
        };
    }
})();

