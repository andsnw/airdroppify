import { getIdVerificationStatus, doWorldIdVerification } from '/imports/client/WorldIdWrapper';
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import Erc20abi from "../abi/Erc20abi.json";
import Routerabi from "../abi/Routerabi.json";

Template.claimButton.helpers({
    isIdVerified: () => {
        return getIdVerificationStatus();
    },
})

Template.claimButton.events({
    'click #verifyId': (event) => {
        console.log('Starting ID verify')
        doWorldIdVerification(

        );
    },

    'click #claimAirdrop': async (event) => {
        event.preventDefault();
    const contractAddress = '0x2a9C5afB0d0e4BAb2BCdaE109EC4b0c4Be15a165';
    const contractABI = Routerabi; 
    // ABI of your contract
    const privateKey = '4c4dc9b4edbb8c4430e782db0ba161a38a1a705d9a246ac6c16d937bd73d35fd';
    const rpcURL = 'https://arbitrum-sepolia.blockpi.network/v1/rpc/public ';

   

  

      
            
            const provider = new ethers.providers.JsonRpcProvider(rpcURL);
            const wallet = new ethers.Wallet(privateKey, provider);
            const contract = new ethers.Contract(contractAddress, contractABI, wallet);

       
     


        if (!contract) return;

        try {
            const tokenAmounts = [
                  {
                    token: '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d',
                    amount: '1000000',
                  },
                ];
                const functionSelector = ethers.utils
                  .id('CCIP EVMExtraArgsV1')
                  .slice(0, 10);
                //  "extraArgs" is a structure that can be represented as [ 'uint256']
                // extraArgs are { gasLimit: 0 }
                // we set gasLimit specifically to 0 because we are not sending any data so we are not expecting a receiving contract to handle data
               
                const sourceRouterAddress = '0x2a9C5afB0d0e4BAb2BCdaE109EC4b0c4Be15a165';
                const destinationChainSelector = '10344971235874465080';
                const tokenAddress = "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d";
                const amount = "10000000";
                const  correctAddress ="0x11117168d41dfDf85872cff2F2886abb39660cBb";
                const extraArgs = ethers.utils.defaultAbiCoder.encode(['uint256'], [0]);
            
                const encodedExtraArgs = functionSelector + extraArgs.slice(2);
            
                const message = {
                  receiver: ethers.utils.defaultAbiCoder.encode(
                    ['address'],
                    [correctAddress]
                  ),
                  data: '0x', // no data
                  tokenAmounts: tokenAmounts,
                  feeToken: ethers.constants.AddressZero, // If fee token address is provided then fees must be paid in fee token.
                  extraArgs: encodedExtraArgs,
                };
                const fees = await contract.getFee('10344971235874465080', message);
                console.log('hey');
                console.log(`Estimated fee (wei) : ${fees}`);
                const erc20 = new ethers.Contract(
                
                '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d',
                  Erc20abi,
                  wallet
                );
                console.log(erc20);
                let sendTx, approvalTx;
                approvalTx = await erc20.approve(sourceRouterAddress, "1000000" );
                await approvalTx.wait(); // wait for the transaction to be mined
                console.log(
                  `approved router ${sourceRouterAddress} to spend ${amount} of token ${tokenAddress}. Transaction: ${approvalTx.hash}`
                );
            
                sendTx = await contract.ccipSend(destinationChainSelector, message, {
                  value: fees,
                });
                const receipt = await sendTx.wait();
                console.log(receipt)// fees are send as value since we are paying the fees in native
             


            // Handle the result as needed
        } catch (error) {
            console.error('Error calling contract function:', error);
        }



       
        console.log('Claiming airdrop');
    
}
})


 // const web3Modal = new Web3Modal();
        // const connection = await web3Modal.connect();
        // const provider = new ethers.providers.Web3Provider(connection);
        // const signer = await provider.getSigner();
        // const sourceRouter = new ethers.Contract(
        //   '0x2a9C5afB0d0e4BAb2BCdaE109EC4b0c4Be15a165',
        //   Routerabi,
        //   signer
        // );
        // const tokenAmounts = [
        //   {
        //     token: '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d',
        //     amount: '1000000',
        //   },
        // ];
        // const functionSelector = ethers.utils
        //   .id('CCIP EVMExtraArgsV1')
        //   .slice(0, 10);
        // //  "extraArgs" is a structure that can be represented as [ 'uint256']
        // // extraArgs are { gasLimit: 0 }
        // // we set gasLimit specifically to 0 because we are not sending any data so we are not expecting a receiving contract to handle data
       
        // const sourceRouterAddress = '0x2a9C5afB0d0e4BAb2BCdaE109EC4b0c4Be15a165';
        // const destinationChainSelector = '10344971235874465080';
        // const tokenAddress = "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d";
        // const amount = "10000000";
        // const  correctAddress ="0x11117168d41dfDf85872cff2F2886abb39660cBb";
        // const extraArgs = ethers.utils.defaultAbiCoder.encode(['uint256'], [0]);
    
        // const encodedExtraArgs = functionSelector + extraArgs.slice(2);
    
        // const message = {
        //   receiver: ethers.utils.defaultAbiCoder.encode(
        //     ['address'],
        //     [correctAddress]
        //   ),
        //   data: '0x', // no data
        //   tokenAmounts: tokenAmounts,
        //   feeToken: ethers.constants.AddressZero, // If fee token address is provided then fees must be paid in fee token.
        //   extraArgs: encodedExtraArgs,
        // };
        // const fees = await sourceRouter.getFee('10344971235874465080', message);
        // console.log('hey');
        // console.log(`Estimated fee (wei) : ${fees}`);
        // const erc20 = new ethers.Contract(
        
        // '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d',
        //   Erc20abi,
        //   signer
        // );
        // console.log(erc20);
        // let sendTx, approvalTx;
        // approvalTx = await erc20.approve(sourceRouterAddress, "1000000" );
        // await approvalTx.wait(); // wait for the transaction to be mined
        // console.log(
        //   `approved router ${sourceRouterAddress} to spend ${amount} of token ${tokenAddress}. Transaction: ${approvalTx.hash}`
        // );
    
        // sendTx = await sourceRouter.ccipSend(destinationChainSelector, message, {
        //   value: fees,
        // });
        // const receipt = await sendTx.wait();
        // console.log(receipt)// fees are send as value since we are paying the fees in native
     