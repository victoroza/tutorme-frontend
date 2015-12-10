(function () {
    'use strict';

    angular
        .module('app')
        .controller('SchoolController', SchoolController);

    SchoolController.$inject = ['$location', 'AuthenticationService', '$scope', '$http'];
    function SchoolController($location, AuthenticationService, $scope, $http) {
        var vm = this;
        (function initController() {
            $http.get('http://tutorme-backend.herokuapp.com/tutor_api/schools/?format=json').then(function(data) {
                $scope.schools = data.data;
            });
        })();

        function populateData() {
            vm.dataLoading = true;
            $http.get('http://tutorme-backend.herokuapp.com/tutor_api/schools/?format=json').then(function(data) {
                $scope.schools = data.data;
            });
        };
    }

})();