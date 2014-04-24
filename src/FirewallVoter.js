var FirewallVoter = function(firewall) {

    this._firewall = firewall;
};

FirewallVoter.prototype = new VoterInterface;

FirewallVoter.prototype.vote = function(user, resource) {

    var pattern, roles;

    for (pattern in this._firewall) {

        if ((new RegExp(pattern)).test(resource)) {

            roles = this._firewall[pattern];
            break;
        }
    }

    if (roles) {

        var granted = roles
            .some(function(role) {

                return user.hasRole(role);
            });

        return granted
            ? this.granted()
            : this.denied();
    }

    return this.abstain();
};
