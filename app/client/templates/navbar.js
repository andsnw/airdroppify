Template.navbar.helpers({
    isWalletConnected: () => {
        return Session.get('connectedStatus');
    },
})