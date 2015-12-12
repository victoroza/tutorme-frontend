// var app = angular.module('app', []);
// app.service('classGetService', function ($http, $q, $routeParams){
//     var defferer = $q.defer();

//     $http.get('http://tutorme-backend.herokuapp.com/tutor_api/classes/?school__name=' + $routeParams.schoolId +'&format=json').then(function(data) {
//         defferer.resolve(data);
//         console.log(data.data);
//     });

//     return defferer.promise;
// });

(function () {
    'use strict';

    angular
        .module('app')
        .factory('classGetService', classGetService);

    classGetService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout', '$q', '$routeParams'];
    function classGetService($http, $cookieStore, $rootScope, $timeout, $q, $routeParams) {
        var defferer = $q.defer();
        $http.get('http://tutorme-backend.herokuapp.com/tutor_api/classes/?school__name=' + $routeParams.schoolId +'&format=json').then(function(data) {
            defferer.resolve(data);
            console.log(data.data);
            $rootScope.classData = data.data;
            console.log($rootScope.classData.length);
        });
        // for (var i = 0; i < $rootScope.classData.length; i++) {
        //         $http.get($rootScope.classData[i].major).then(function(dataMajor) {
        //             console.log(dataMajor);
        //         });
        //     }
        console.log(defferer.promise);
        return defferer.promise;
     }
})();

(function () {
    'use strict';

    angular
        .module('app')
        .factory('classGetService_school', classGetService_school);

    classGetService_school.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout', '$q', '$routeParams'];
    function classGetService_school($http, $cookieStore, $rootScope, $timeout, $q, $routeParams, $scope) {
        var defferer = $q.defer();
        $http.get('http://tutorme-backend.herokuapp.com/tutor_api/classes/?school__name=' + $routeParams.schoolId +'&format=json').then(function(data) {
            defferer.resolve(data);
            console.log(data.data);
            console.log($scope.classes1)
        });
        return defferer.promise;
    }
})();