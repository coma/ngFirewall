var ngFirewall = angular.module('ngFirewall', []);

var _logoutPath    = '/login';
var _routeFirewall = {};
var _httpFirewall  = {};

var isResourceDenied = function(user, resource, firewall) {

    var pattern, test = null;

    for (pattern in firewall) {

        if ((new RegExp(pattern)).test(resource)) {

            test = firewall[pattern];
            break;
        }
    }

    if (test === null) {

        return false;
    }

    if (test.constructor === String) {

        test = [test];
    }

    if (test.constructor === Array) {

        return !test.some(function(role) {

                return user.hasRole(role);
            });
    }

    if (test.constructor === Function) {

        return !test(user, resource);
    }

    return false;
};