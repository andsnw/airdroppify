Router.configure({
    layoutTemplate: 'layout',
})

Router.route('/', {
    name: 'home',
    subscriptions: () => {
        Meteor.subscribe('airdrops/getLiveAirdrops');
    },
});

Router.route('/claim/:airdropContractAddress', {
    name: 'claim',
    waitOn: function () {
        const currentAddress = Session.get('connectedAddress');
        const sessionId = Session.get('connectedSessionId')
        return [
            Meteor.subscribe('airdrops/getByContractAddress', this.params.airdropContractAddress),
            currentAddress && sessionId && Meteor.subscribe('claimers/getCurrentClaimer', {
                address: currentAddress,
                sessionId,
            }),
        ];
    }
});

Router.route('/host', {
    name: 'host'
});

Router.route('/api/verifyWorldProof', {
    where: 'server'
}).post(function () {
    var requestBody = this.request.body;

    const body = JSON.parse(requestBody);

    console.log('Received API req')
    console.log(body);

    Meteor.call('claimers/updateVerificationStatus', body);

    this.response.setHeader('Content-Type', 'application/json');
    this.response.end('Began worldcoin verification!');
});

