Template.connect.helpers({
    isWalletConnected: () => {
        return true;
    },
    getWalletAddress: () => {
        return '0xabc';
    },
});

Template.connect.events({
    'click #connectButton': (event) => {
        console.log('button clicked')
    },
});