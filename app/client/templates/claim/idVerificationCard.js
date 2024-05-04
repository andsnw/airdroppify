import { errorToast } from '../../../imports/client/Toaster';
import { getIdVerificationStatus, doInitWorldId } from '/imports/client/WorldIdWrapper';

Template.idVerificationCard.helpers({
    isIdVerified: () => {
        return getIdVerificationStatus();
    },
})

Template.idVerificationCard.events({
    'click #verificationLink': (event) => {
        
        console.log('Starting ID verify');

        if (!Session.get('connectedStatus')) {
            errorToast('Please connect your wallet first');
            return;
        }

        doInitWorldId();
    }
})
