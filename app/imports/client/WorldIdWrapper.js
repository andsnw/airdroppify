
const doInitWorldId = (callback) => {
    // TODO: Implement begin worldID verification function
    // Have to callback to our backend to save data

    console.log('beginning world id verify')
    
    const worldIdAppUrl = `${Meteor.settings.public.WORLDID_APP_URL}/?callbackUrl=${Meteor.absoluteUrl('/api/verifyWorldProof')}`
    window.open(worldIdAppUrl)
};

const doUpdateWorldId = (callback) => {

}

const getIdVerificationStatus = () => {
    // TODO: implement worldcoin ID verification
    // maybe we call backend here ?

    return false;
}

export {
    doInitWorldId,
    doUpdateWorldId,
    getIdVerificationStatus,
};