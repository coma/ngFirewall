angular
    .module('app', ['ngRoute', 'ngFirewall'])
    .config(['$routeProvider', '$authProvider', function($routeProvider, $authProvider) {

        $routeProvider
            .when('/', {
                controller : 'Main',
                templateUrl: 'view/main.html'
            })
            .when('/login', {
                controller : 'Login',
                templateUrl: 'view/login.html'
            })
            .when('/secure', {
                controller : 'Secure',
                templateUrl: 'view/secure.html'
            })
            .when('/almost', {
                controller : 'Almost',
                templateUrl: 'view/almost.html'
            })
            .otherwise({
                redirectTo: '/'
            });

        $authProvider.addRouteFirewall({
            '^/secure': ['admin'],
            '^/almost': ['admin', 'user']
        });
    }]);
