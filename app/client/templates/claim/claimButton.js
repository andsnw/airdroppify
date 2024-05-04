import { getIdVerificationStatus, doInitWorldId } from '/imports/client/WorldIdWrapper';

Template.claimButton.helpers({
    isIdVerified: () => {
        return getIdVerificationStatus();
    },
})

Template.claimButton.events({
    'click #verifyId': (event) => {
        console.log('Starting ID verify')
        doInitWorldId((err, res) => {
            console.log(err, res);
        });
    },

    'click #claimAirdrop': (event) => {
        console.log('Claiming airdrop');
    },
})