var ngFirewall = angular.module('ngFirewall', []);

var _logoutPath  = '/login';
var _routeVoters = [];
var _httpVoters  = [];

ngFirewall.provider('$auth', function() {

    var self = this;

    this.setLogoutPath = function(path) {

        _logoutPath = path;

        return self;
    };

    this.addRouteVoter = function(voter) {

        if (voter instanceof VoterInterface) {

            _routeVoters.push(voter);

            return self;
        }

        throw 'Voters must extend VoterInterface.';
    };

    this.addHTTPVoter = function(voter) {

        if (voter instanceof VoterInterface) {

            _httpVoters.push(voter);

            return self;
        }

        throw 'Voters must extend VoterInterface.';
    };

    this.addRouteFirewall = function(firewall) {

        self.addRouteVoter(new FirewallVoter(firewall));
    };

    this.addHTTPFirewall = function(firewall) {

        self.addHTTPVoter(new FirewallVoter(firewall));
    };

    this.$get = [function() {}];
});

ngFirewall.service('$user', function() {

    var _roles = [];

    this.setRoles = function(roles) {

        _roles = roles;
    };

    this.hasRole = function(role) {

        return _roles.indexOf(role) > -1;
    };

    this.eraseRoles = function() {

        _roles = [];
    };
});

ngFirewall.run(function($rootScope, $auth, $user, $location) {

    $rootScope.$on('$locationChangeStart', function(event, next) {

        var resource = /[^#]#(.*)$/.exec(next);
        resource = resource === null ? '' : resource.pop();

        var denied = _routeVoters
            .some(function(voter) {

                return voter.vote($user, resource) === voter.denied();
            });

        if (denied) {

            $user.eraseRoles();
            $location.path(_logoutPath);
        }
    });
});