// (function () {
//     'use strict';

//     angular
//         .module('app')
//         .controller('UserController', UserController);

//     UserController.$inject = ['$location'];
//     function UserController($scope, $location) {
//         $http.get('http://tutorme-backend.herokuapp.com/tutor_api/users/?format=json').then(function(data) {
//         $scope.users = data.data;
//     });

// });
// var app = angular.module('app', []).controller('UserController', function($scope, $http) {
//     $http.get('http://tutorme-backend.herokuapp.com/tutor_api/users/?format=json').then(function(data) {
//         $scope.users = data.data;
//     });
// });
(function () {
    'use strict';

    angular
        .module('app')
        .controller('UserController', UserController);

    UserController.$inject = ['$location', 'AuthenticationService', '$scope', '$http'];
    function UserController($location, AuthenticationService, $scope, $http) {
        var vm = this;

        (function initController() {
            $http.get('http://tutorme-backend.herokuapp.com/tutor_api/users/?format=json').then(function(data) {
                $scope.users = data.data;
                console.log(data.data);
            });
        })();

        function populateData() {
            vm.dataLoading = true;
            $http.get('http://tutorme-backend.herokuapp.com/tutor_api/users/?format=json').then(function(data) {
                $scope.users = data.data;
            });
        };
    }

})();