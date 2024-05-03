Template.home.events({
    'click .viewAirdrop': (event) => {
        Router.go('claim', { airdropContractAddress: 'asf' })
    },
});