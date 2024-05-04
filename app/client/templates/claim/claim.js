import moment from 'moment';
import { getIdVerificationStatus } from "../../../imports/client/WorldIdWrapper";
import { errorToast } from '../../../imports/client/Toaster';

Template.claim.helpers({
    getReadableDate: (date) => {
        return moment(date).fromNow();
    },

    isWalletConnected: () => {
        return Session.get('connectedStatus');
    },

    getCurrentAirdrop: () => {
        return Airdrops.findOne({ contractAddress: Router.current().params.airdropContractAddress })
    },

    isIdVerified: () => {
        return getIdVerificationStatus();
    },

    existingClaim: () => {
        return Claims.findOne({
            contractAddress: Router.current().params.airdropContractAddress,
            address: Session.get('connectedAddress'),
        });
    }
})

Template.claim.onRendered(() => {
    const airdrop = Airdrops.findOne();
    if (!airdrop) {
        errorToast('Airdrop not found');
        Router.go('home');
    }
})