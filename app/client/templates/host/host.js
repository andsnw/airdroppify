import { errorToast, successToast } from "../../../imports/client/Toaster";

Template.host.helpers({

});

Template.host.events({

    'submit #createAirdrop': (event) => {
        event.preventDefault();

        if (!Session.get('connectedStatus')) {
            errorToast('Please connect your wallet first');
            return;
        }

        document.querySelector('.submitBtn').setAttribute('disabled', 'disabled');

        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const amount = document.getElementById('amount').value;
        const contractAddress = document.getElementById('contractAddress').value;

        Meteor.call('airdrops/create', {
            name, description, amount, contractAddress,
            ownerAddress: Session.get('connectedAddress'),
            sessionId: Session.get('connectedSessionId'),
        }, (err, res) => {
            document.querySelector('.submitBtn').removeAttribute('disabled');
            if (err) {
                errorToast(err.message)
            } else if (res) {
                successToast('Created new airdrop')
                Router.go('claim', { airdropContractAddress: contractAddress })
            }
        })
    }
});