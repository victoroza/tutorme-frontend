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
            var months = {
                'January' : '01',
                'February' : '02',
                'March' : '03',
                'April' : '04',
                'May' : '05',
                'June' : '06',
                'July' : '07',
                'August' : '08',
                'September' : '09',
                'October' : '10',
                'November' : '11',
                'December' : '12'
            }

             console.log(vm.date);
             console.log(vm.time);
             var date_array = vm.date.split(/[\s,]+/);
             var time_array = vm.time.split(":");
             console.log(months[(date_array[1])]);
             console.log(time_array);
             console.log(date_array);
             vm.fullDate = date_array[2] + '-' + months[(date_array[1])] + '-' + date_array[0] + 'T' + vm.time + ':00Z';
            vm.dataLoading = true;
            $http.get('http://tutorme-backend.herokuapp.com/tutor_api/users/' + $routeParams.tutorId).then(function(data) {
                $scope.appointments_as_tutor= data.data;
                postAppt(data.data['id']);
            });
        };

        function postAppt(tutor_id) {
            $http.post('http://tutorme-backend.herokuapp.com/tutor_api/appointments/', {
                aClass : $routeParams.classId,
                tutee : localStorage.id,
                tutor: tutor_id,
                location : vm.location_in,
                notes : vm.notes,
                time : vm.fullDate
            })
                .then(function(response) {
                    // alert(response.status);
                    console.log(response);
                    console.log(response.data);
                    $location.path('/appointment');
                },
                function(response) {
                    alert("There is an error in the input");
                    // alert(response.status);
                });
        };
    }
})();

