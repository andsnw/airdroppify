Template.claim.helpers({
    isWalletConnected: () => {
        return Session.get('connectedStatus');
    },

    getCurrentAirdrop: () => {
        return Airdrops.findOne({ contractAddress: Router.current().params.airdropContractAddress })
    }
})