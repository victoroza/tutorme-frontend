(function () {
    'use strict';

    angular
        .module('app')
        .controller('TutorController', TutorController);

    TutorController.$inject = ['$location', 'AuthenticationService', '$scope', '$http', '$routeParams'];
    function TutorController($location, AuthenticationService, $scope, $http, $routeParams) {
        var vm = this;
        (function initController() {
            // $scope.classes1 = null;
            $scope.dataMajor = null;
            var dataM = null;
            $http.get('http://tutorme-backend.herokuapp.com/tutor_api/tutor/?aClass__number=' + $routeParams.classNumber +'&format=json').then(function(data) {
                console.log(data.data);
                $scope.tutors = data.data;
                $scope.schoolId = $routeParams.schoolId;
                $scope.classMajor = $routeParams.classMajor;
                $scope.classNumber = $routeParams.classNumber;
            });
        })();

        function populateData() {
            vm.dataLoading = true;
            $http.get('http://tutorme-backend.herokuapp.com/tutor_api/classes/?aClass__number=' + $routeParams.classNumber + '&format=json').then(function(data) {
                $scope.tutors = data.data;
            });
        };
    }

})();