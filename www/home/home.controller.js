(function () {
    'use strict';

    angular
        .module('app')
        .controller('RenameController', RenameController);

    RenameController.$inject = ['$location', 'AuthenticationService'];
    function RenameController($location, AuthenticationService) {
        var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.status==200) {
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    $location.path('/users');
                } else {
                    console.log(response);
                    // FlashService.Error(response.message);
                    vm.dataLoading = false;
                    $location.path('/login');
                }
            });
        };
    }

})();
