(function () {
    'use strict';

    angular
        .module('app')
        .controller('AdminEditProfileController', AdminEditProfileController);

    AdminEditProfileController.$inject = ['$location', 'AuthenticationService', '$scope', '$http', '$routeParams'];
    function AdminEditProfileController($location, AuthenticationService, $scope, $http, $routeParams) {
        var config = { 'headers': {'Authorization': 'Token ' + localStorage.token}};
        var vm = this;
        console.log("editing profile");
        (function initController() {
             $http.get('http://tutorme-backend.herokuapp.com/tutor_api/users/'+ $routeParams.userId +'?format=json', config).then(function(data) {
                $scope.user = data.data;
            });
        })();

        function populateData() {
            vm.dataLoading = true;
             $http.get('http://tutorme-backend.herokuapp.com/tutor_api/users/'+ $routeParams.userId +'?format=json', config).then(function(data) {
                console.log("got to populateData editProfile");
                $scope.user = data.data;
            });
        };

        function update(){
          vm.dataLoading = true;
          console.log(vm);
          $http.put('http://tutorme-backend.herokuapp.com/tutor_api/users/' + $routeParams.userId, {
              first_name: vm.first_name,
              last_name: vm.last_name,
              email: vm.email,
              phone: vm.phone,
              is_staff: vm.is_staff,
              is_superuser: vm.is_user,
              is_active: vm.is_active,
              password: vm.password,
              username: localStorage.username
            })
        };
    }

})();
