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
        return Meteor.subscribe('airdrops/getByContractAddress', this.params.airdropContractAddress);
    }
});

Router.route('/host', {
    name: 'host'
});

Router.route('/api/verifyWorldProof', {
    where: 'server'
}).post(function () {
    // get the request body
    var requestBody = this.request.body;

    console.log(requestBody);

    this.response.setHeader('Content-Type', 'application/json');
    this.response.end('Success!');
});

