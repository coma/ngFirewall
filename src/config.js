ngFirewall.config(function($provide, $httpProvider) {

    $provide.factory('firewallInterceptor', function($q, $user) {
        return {
            'request': function(config) {

                if (isResourceDenied($user, config.url, _httpFirewall)) {

                    var canceler = $q.defer();
                    config.timeout = canceler.promise;
                    canceler.resolve();
                }

                return config || $q.when(config);
            }
        }
    });

    $httpProvider.interceptors.push('firewallInterceptor');
});