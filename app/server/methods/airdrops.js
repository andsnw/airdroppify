Meteor.methods({
    'airdrops/create': ({
        name,
        description,
        amount,
        contractAddress,
        ownerAddress,
        sessionId,
    }) => {
        check(name, String);
        check(description, String);
        check(amount, String);
        check(contractAddress, String);
        check(ownerAddress, String);
        check(sessionId, String);

        // Validate owner
        const owner = Claimers.findOne({
            address: ownerAddress,
            sessionId,
        });

        if (!owner) {
            throw new Meteor.Error('Unauthorized');
        }

        const existingContractAirdrop = Airdrops.findOne({
            contractAddress,
            isLive: true,
        });
        if (existingContractAirdrop) {
            throw new Meteor.Error('An airdrop is already running for this contract');
        }

        Airdrops.insert({
            name,
            description,
            amount,
            contractAddress,
            ownerAddress,
            sessionId,
            isLive: true,
        })

        return 'Done';
    },
})