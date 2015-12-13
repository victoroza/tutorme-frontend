(function () {
    'use strict';

    angular
        .module('app')
        .controller('UserController', UserController);

    UserController.$inject = ['$location', 'AuthenticationService', '$scope', '$http'];
    function UserController($location, AuthenticationService, $scope, $http) {
        var config = { 'headers': {'Authorization': 'Token ' + localStorage.token}};
        var vm = this;
        console.log("getting user profiles");
        (function initController() {
            $http.get('http://tutorme-backend.herokuapp.com/tutor_api/users/?format=json', config).then(function(data) {
                $scope.users = data.data;
                console.log(data.data);
            });
        })();

        function populateData() {
            vm.dataLoading = true;
            $http.get('http://tutorme-backend.herokuapp.com/tutor_api/users/?format=json', config).then(function(data) {
                $scope.users = data.data;
            });
        };

    }

})();
