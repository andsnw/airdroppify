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

    'claimers/updateVerificationStatus': ({ address, sessionId, worldcoinResponse }) => {
        check(address, String);
        check(sessionId, String);


        const claimer = Claimers.findOne({
            address,
            sessionId,
        });

        if (!claimer) {
            console.error('Unable to find claimer for verification')
            throw new Meteor.Error('Claimer not found')
        }

        try {
            const worldcoinResponse = JSON.parse(worldcoinResponse);
            Claimers.update({
                address,
                sessionId,
            }, {
                $set: {
                    idVerified: true,
                    worldcoinId: worldcoinResponse,
                    verifiedAt: new Date(),
                }
            })
        } catch (error) {
            console.error(error)
            throw new Meteor.Error('Failed to store worldcoin proof');
        }


    },
})