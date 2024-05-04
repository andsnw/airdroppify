Meteor.methods({
    'claimers/setSession': ({ address, sessionId }) => {
        check(address, String);
        check(sessionId, String);

        const claimer = Claimers.findOne({
            address,
            sessionId,
        });

        if (!claimer) {
            Claimers.insert({
                address,
                sessionId,
            });
            return 'Done';
        }

        Claimers.update({
            address,
            sessionId,
        }, {
            $set: { sessionId },
        });

        return 'Done';
    },
})