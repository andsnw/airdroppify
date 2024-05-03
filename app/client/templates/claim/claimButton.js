import { getIdVerificationStatus, doWorldIdVerification } from '/imports/client/WorldIdWrapper';

Template.claimButton.helpers({
    isIdVerified: () => {
        return getIdVerificationStatus();
    },
})

Template.claimButton.events({
    'click #verifyId': (event) => {
        console.log('Starting ID verify')
        doWorldIdVerification();
    },

    'click #claimAirdrop': (event) => {
        console.log('Claiming airdrop');
    },
})