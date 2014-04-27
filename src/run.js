ngFirewall.run(['$rootScope', '$auth', '$user', '$location', function($rootScope, $auth, $user, $location) {

    $rootScope.$on('$locationChangeStart', function(event, next) {

        var resource = /[^#]#(.*)$/.exec(next);
        resource = resource === null ? '' : resource.pop();

        if (isResourceDenied($user, resource, _routeFirewall)) {

            $user.eraseRoles();
            $location.path(_logoutPath);
        }
    });
}]);