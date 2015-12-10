(function () {
    'use strict';

    angular
        .module('app')
        .controller('UserIdController', UserIdController);

    UserIdController.$inject = ['$location', 'AuthenticationService', '$scope', '$http', '$routeParams'];
    function UserIdController($location, AuthenticationService, $scope, $http, $routeParams) {
        var config = { 'headers': {'Authorization': 'Token ' + localStorage.token}};
        var vm = this;
        console.log("getting user profile");
        (function initController() {
             $http.get('http://tutorme-backend.herokuapp.com/tutor_api/users/'+ $routeParams.userId +'?format=json', config).then(function(data) {
                console.log("getting user profile");
                $scope.user = data.data;
                console.log(data.data);
            });
        })();

        function populateData() {
            console.log("getting user profile");
            vm.dataLoading = true;
             $http.get('http://tutorme-backend.herokuapp.com/tutor_api/users/'+ $routeParams.userId +'?format=json', config).then(function(data) {
                $scope.user = data.data;
            });
        };
    }

})();