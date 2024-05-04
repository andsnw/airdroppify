Meteor.publish('claims/getClaimsByAddress', ({ address, contractAddress }) => {
    check(address, String);
    check(contractAddress, String);

    return Claims.find({
        address,
        contractAddress,
    });
});