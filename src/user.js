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