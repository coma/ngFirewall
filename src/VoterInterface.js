var VoterInterface = function() {};

VoterInterface.prototype = {

    vote: function(user, resource) {

        throw 'You have to implement this method.';
    },

    granted: function() {

        return 1;
    },

    abstain: function() {

        return 0;
    },

    denied: function() {

        return -1;
    }
};