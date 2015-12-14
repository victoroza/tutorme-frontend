(function () {
    'use strict';

    angular
        .module('app')
        .controller('SchoolController', SchoolController);

    SchoolController.$inject = ['$location', 'AuthenticationService', '$scope', '$http'];
    function SchoolController($location, AuthenticationService, $scope, $http) {
        var vm = this;
        (function initController() {
          $http.get("http://tutorme-backend.herokuapp.com/tutor_api/appointments/?tutor__username=" + localStorage.username + "&confirmed_tutor=False&format=json")
                .then(function(response) {
                  console.log("here!");
                  var data = response.data.length;
                  if(data > 0){
                    console.log("hello");
                    $('.badge').text(data);
                  }else{
                    console.log("your love is so toxic");
                    $('.badge').attr('display', 'none');
                  }
                });
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
