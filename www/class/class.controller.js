(function () {
	'use strict';

	angular
		.module('app')
		.controller('ClassController', ClassController);

    ClassController.$inject = ['$location', 'AuthenticationService', '$scope', '$http', '$routeParams', 'classGetService'];
    function ClassController($location, AuthenticationService, $scope, $http, $routeParams, classGetService) {
        var vm = this;
        (function initController() {
            // $scope.classes1 = null;
            $scope.dataMajor = null;
            var dataM = null;
            $http.get('http://tutorme-backend.herokuapp.com/tutor_api/classes/?school__name=' + $routeParams.schoolId +'&format=json').then(function(data) {
                console.log(data.data);
                $scope.classes1 = data.data;
                $scope.schoolId = $routeParams.schoolId;
            });
            // classGetService.then(function(data){
            //     console.log(data);
            // });
            // $http.get('http://tutorme-backend.herokuapp.com/tutor_api/classes/?school__name=' + $routeParams.schoolId +'&format=json').then(function(data) {
            //     console.log(data.data);
            //     $scope.classes1 = data.data;
            // });
            // for (var i = 0; i < $scope.classes1.length; i++) {
            //     $http.get($scope.classes1[i].major).then(function(dataMajor) {
            //         alert($scope.classes1[1]);
            //         $scope.dataMajor = dataMajor.data;
            //         console.log(dataMajor.data);
            //         dataM=dataMajor.data;
            //         // console.log($scope.classes1[i]);
            //         // $scope.classes1[i].majorId = dataMajor.data.shortName;
            //         // $scope.classes1[i].majorIdFull = dataMajor.data.name;
            //         // console.log($scope.classes1);
            //     });
            //     console.log(dataM);
            //     console.log($scope.dataMajor);
            //     $scope.classes1[i].majorId = $scope.dataMajor.shortName;
            //     $scope.classes1[i].majorIdFull = $scope.dataMajor.name;
            //     // alert($scope.classes1[i].major);
            //     //Do something
            // }
        })();

		function populateData() {
			vm.dataLoading = true;
			$http.get('http://tutorme-backend.herokuapp.com/tutor_api/classes/?school__name=' + $routeParams.schoolId + '&format=json').then(function(data) {
				$scope.classes1 = data.data;
			});
		};
	}

})();
