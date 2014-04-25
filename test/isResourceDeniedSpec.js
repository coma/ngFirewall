describe('isResourceDenied', function() {

    var firewall, users;
    var user = function(name) {

        return {
            hasRole: function(role) {

                return users[name].indexOf(role) > -1;
            }
        }
    };

    beforeEach(function() {

        firewall = {
            '^/animals' : ['user'],
            '^/pictures': ['admin'],
            '^/foods'   : ['user', 'admin'],
            'gummy/?$'  : ['monkey']
        };

        users = {
            none   : [],
            user   : ['user'],
            admin  : ['user', 'admin'],
            monkey : ['monkey']
        };
    });

    it('should allow the resource if no rule applies', function() {

        expect(isResourceDenied(user('none'), '/rainbow', firewall)).toBe(false);
    });

    it('should allow the resource if the user has one of the needed roles', function() {

        expect(isResourceDenied(user('user'), '/animals', firewall)).toBe(false);
        expect(isResourceDenied(user('admin'), '/animals', firewall)).toBe(false);

        expect(isResourceDenied(user('user'), '/foods', firewall)).toBe(false);
        expect(isResourceDenied(user('admin'), '/foods', firewall)).toBe(false);

        expect(isResourceDenied(user('monkey'), '/something/very/gummy', firewall)).toBe(false);
        expect(isResourceDenied(user('monkey'), '/something/very/gummy/', firewall)).toBe(false);
    });

    it('should denied the resource if the user doesn\'t have at least one of the needed roles', function() {

        expect(isResourceDenied(user('user'), '/something/very/gummy', firewall)).toBe(true);
        expect(isResourceDenied(user('admin'), '/something/very/gummy', firewall)).toBe(true);
        expect(isResourceDenied(user('monkey'), '/foods', firewall)).toBe(true);
    });
});