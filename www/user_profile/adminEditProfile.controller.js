(function () {
    'use strict';

    angular
        .module('app')
        .controller('AdminEditProfileController', AdminEditProfileController);

    AdminEditProfileController.$inject = ['$location', 'AuthenticationService', '$scope', '$http', '$routeParams'];
    function AdminEditProfileController($location, AuthenticationService, $scope, $http, $routeParams) {
        var config = { 'headers': {'Authorization': 'Token ' + localStorage.token}};
        var vm = this;
        vm.update = update;
        console.log("Admin editing profile");
        (function initController() {
             $http.get('http://tutorme-backend.herokuapp.com/tutor_api/users/'+ $routeParams.userId +'?format=json', config).then(function(data) {
                $scope.user = data.data;
                console.log($scope.user);
                if($scope.user.is_superuser == true){
                  $('#is_superuser').attr('checked', 'true');
                }
                if($scope.user.is_active == true){
                  console.log("is active");
                  $('#is_active').attr('checked', 'true');
                }
                if($scope.user.is_staff == true){
                  $('#is_staff').attr('checked', 'true');
                }
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
          if($('#is_active').attr('checked') == "checked"){
            vm.is_active = 'true';
          }else{
            vm.is_active = 'false';
          }
          if($('#is_staff').attr('checked') == "checked"){
            vm.is_staff = 'true';
          }else{
            vm.is_staff = 'false';
          }
          if($('#is_superuser').attr('checked') == "checked"){
            vm.is_superuser = 'true';
          }else{
            vm.is_superuser = 'false';
          }
          $http.put('http://tutorme-backend.herokuapp.com/tutor_api/users/' + $routeParams.userId, {
              first_name: vm.first_name,
              last_name: vm.last_name,
              email: vm.email,
              phone: vm.phone,
              is_staff: vm.is_staff,
              is_superuser: vm.is_superuser,
              is_active: vm.is_active,
              password: vm.password,
              username: $scope.user.username
            }).then(function(response){
                console.log(response.status);
                if(response.status==200){

                }
            }, function(response){
              console.log(response.data);
              var data = response.data;
              var error = "";
              $.each(data, function(k, v) {
                error = error + k + " is input incorrectly " + v[0] +'\n';
              });
              alert(error);
              vm.dataLoading = false;
              // response.data
            }
          );
        };
    }

})();
