import { makeClaim } from "../../imports/server/Claimer";

Meteor.methods({
    'claims/makeClaim': ({ address, sessionId }) => {
        check(address, String);
        check(sessionId, String);

        const claimer = Claimers.findOne({
            address,
            sessionId,
        });

        if (!claimer) {
            throw new Meteor.Error('Please reconnect your wallet to claim')
        };

        if (!claimer.idVerified) {
            throw new Meteor.Error('Please verify your World ID to claim');
        }

        Async.runSync(function (done) {
            makeClaim(address).then(() => done);
        });
        return 'Claim in progress';
    }
})