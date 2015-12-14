(function () {
    'use strict';

    angular
        .module('app')
        .controller('AppointmentController', AppointmentController);

    AppointmentController.$inject = ['$location', 'AuthenticationService', '$scope', '$http'];
    function AppointmentController($location, AuthenticationService, $scope, $http) {
        var vm = this;
        console.log("Getting appointments");
        (function initController() {
            var month = new Array();
            month[0] = "January";
            month[1] = "February";
            month[2] = "March";
            month[3] = "April";
            month[4] = "May";
            month[5] = "June";
            month[6] = "July";
            month[7] = "August";
            month[8] = "September";
            month[9] = "October";
            month[10] = "November";
            month[11] = "December";
            $http.get('http://tutorme-backend.herokuapp.com/tutor_api/appointments/?tutor__username=' + localStorage.username + '&format=json').then(function(data) {
                $scope.appointments_as_tutor= data.data;
                for(var i = 0; i < data.data.length; i++){
                    console.log(i);
                    var date_split = data.data[i]['time'].split("T");
                    var date_split_data = date_split[0].split("-");
                    var time_split_data = date_split[1].split(":");
                    $scope.appointments_as_tutor[i].appointments_as_tutor_time = month[(date_split_data[1]-1)] + ' ' + date_split_data[2] + ', ' + date_split_data[0] + ' at ' + time_split_data[0] + ':' + time_split_data[1];
                }
                // $scope.appointments_as_tutor_time = month[(date_split_data[1]-1)] + ' ' + date_split_data[2] + ', ' + date_split_data[0] + ' at ' + time_split_data[0] + ':' + time_split_data[1];


            });
            $http.get('http://tutorme-backend.herokuapp.com/tutor_api/appointments/?tutee__username=' + localStorage.username + '&format=json').then(function(data1) {
                $scope.appointments_as_tutee= data1.data;
                for(var i = 0; i < data1.data.length; i++){
                    console.log(i);
                    var date_split = data1.data[i]['time'].split("T");
                    var date_split_data = date_split[0].split("-");
                    var time_split_data = date_split[1].split(":");
                    $scope.appointments_as_tutee[i].appointments_as_tutor_time = month[(date_split_data[1]-1)] + ' ' + date_split_data[2] + ', ' + date_split_data[0] + ' at ' + time_split_data[0] + ':' + time_split_data[1];
                }
            });
        })();

        function populateData() {
            vm.dataLoading = true;
            $http.get('http://tutorme-backend.herokuapp.com/tutor_api/appointments/?format=json').then(function(data) {
                $scope.appointments= data.data;
            });
        };
    }

})();
