Router.configure({
    layoutTemplate: 'layout',
})

Router.route('/', {
    name: 'home'
});

Router.route('/claim/:airdropContractAddress', {
    name: 'claim'
});

// Router.route('/host', {
//     name: 'host'
// });

