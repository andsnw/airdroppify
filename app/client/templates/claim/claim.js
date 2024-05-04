import { getIdVerificationStatus } from "../../../imports/client/WorldIdWrapper";

Template.claim.helpers({
    isWalletConnected: () => {
        return Session.get('connectedStatus');
    },

    getCurrentAirdrop: () => {
        return Airdrops.findOne({ contractAddress: Router.current().params.airdropContractAddress })
    },

    isIdVerified: () => {
        return getIdVerificationStatus();
    },
})