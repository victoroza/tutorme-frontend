(function () {
    'use strict';

    angular
        .module('app')
        .controller('ClassController', ClassController);

    ClassController.$inject = ['$location', 'AuthenticationService', '$scope', '$http', '$routeParams'];
    function ClassController($location, AuthenticationService, $scope, $http, $routeParams) {
        var vm = this;
        (function initController() {
            $http.get('http://tutorme-backend.herokuapp.com/tutor_api/classes/?school__name=' + $routeParams.schoolId +'&format=json').then(function(data) {
                console.log(data.data);
                $scope.classes1 = data.data;
            });
            // $http.get('http://tutorme-backend.herokuapp.com/tutor_api/classes/?school__name=' + $routeParams.schoolId +'&format=json').then(function(data) {
            //     console.log(data.data);
            //     $scope.classes1 = data.data;
            // });
        })();

        function populateData() {
            vm.dataLoading = true;
            $http.get('http://tutorme-backend.herokuapp.com/tutor_api/classes/?school__name=' + $routeParams.schoolId + '&format=json').then(function(data) {
                $scope.classes1 = data.data;
            });
        };
    }

})();