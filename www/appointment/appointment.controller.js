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
            $http.get('http://tutorme-backend.herokuapp.com/tutor_api/appointments/?format=json').then(function(data) {
                $scope.appointments= data.data;
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
