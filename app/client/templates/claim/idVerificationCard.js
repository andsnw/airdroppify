import { getIdVerificationStatus, doWorldIdVerification } from '/imports/client/WorldIdWrapper';

Template .idVerificationCard.helpers({
    isIdVerified: () => {
        return getIdVerificationStatus();
    },
})

Template.idVerificationCard.events({
    'click #verificationLink': (event) => {
        
        console.log('Starting ID verify')
        doWorldIdVerification();
    }
})