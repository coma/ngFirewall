(function() {

    var app = angular.module('app', ['ngRoute', 'ngFirewall']);

    app.config(['$routeProvider', '$authProvider', function($routeProvider, $authProvider) {

        $routeProvider
            .when('/', {
                controller : 'Main',
                templateUrl: 'main.html'
            })
            .when('/secure', {
                controller : 'Secure',
                templateUrl: 'secure.html'
            })
            .when('/login', {
                controller : 'Login',
                templateUrl: 'login.html'
            })
            .when('/logout', {
                controller : 'Logout',
                templateUrl: 'login.html'
            })
            .otherwise({
                redirectTo: '/'
            });

        $authProvider
            .setRouteFirewall({
                '^/secure': ['user']
            })
            .setHTTPFirewall({
                '^/secret': ['admin']
            });
    }]);

    app.controller('Main', function() {});

    app.controller('Secure', function($scope, $http) {

        $scope.ask = function() {

            $http.get('/secret')
                .success(function(data) {

                    alert('There is no secret...');
                })
                .error(function() {

                    alert('You are not the guy...');
                });
        };
    });

    app.controller('Login', function($scope, $http, $user, $location) {

        $scope.login = function() {

            $http.post('/login', $scope.data)
                .success(function(data) {

                    $user.setRoles(data.roles);
                    $location.path('/secure');
                })
                .error(function() {

                    alert('PSSS... Try user:1234 or admin:1234.');
                });
        };
    });

    app.controller('Logout', function($user, $location) {

        $user.eraseRoles();
        $location.path('/');
    });

})();