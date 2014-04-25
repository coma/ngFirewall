ngFirewall.provider('$auth', function() {

    var self = this;

    this.setLogoutPath = function(path) {

        _logoutPath = path;

        return self;
    };

    this.setRouteFirewall = function(firewall) {

        _routeFirewall = firewall;

        return self;
    };

    this.setHTTPFirewall = function(firewall) {

        _httpFirewall = firewall;

        return self;
    };

    this.$get = [function() {}];
});