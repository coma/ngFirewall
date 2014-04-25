var ngFirewall = angular.module('ngFirewall', []);

var _logoutPath    = '/login';
var _routeFirewall = {};
var _httpFirewall  = {};

var isResourceDenied = function(user, resource, firewall) {

    var pattern, roles = null;

    for (pattern in firewall) {

        if ((new RegExp(pattern)).test(resource)) {

            roles = firewall[pattern];
            break;
        }
    }

    return roles !== null && !roles.some(function(role) {

            return user.hasRole(role);
        });
};