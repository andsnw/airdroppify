Router.configure({
    layoutTemplate: 'layout',
})

Router.route('/', {
    name: 'home'
});

Router.route('/claim/:airdropContractAddress', {
    name: 'claim'
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

