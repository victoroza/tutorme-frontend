(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$location', '$http'];
    function RegisterController($location, $http) {
        var vm = this;

        vm.register = register;

        (function initController() {
            // reset login status
        })();

        function register() {
            vm.dataLoading = true;
            console.log(vm);
            $http.post('http://tutorme-backend.herokuapp.com/tutor_api/users/', {
                first_name: vm.first_name,
                last_name: vm.last_name,
                is_staff: false,
                is_active: true,
                is_superuser: false,
                email: vm.email,
                phone: vm.phone,
                password: vm.password,
                username: vm.username
            })
                .then(function(response) {
                    // alert(response.status);
                    console.log(response);
                    console.log(response.data);
                    $location.path('/login');
                },
                function(response) {
                    // alert(response.status);
                });
        };
    }

})();
