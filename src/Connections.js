import { ethers } from 'ethers';





export const rpc = 'https://endpoints.omniatech.io/v1/eth/sepolia/public';
//export const rpc = 'https://ethereum-sepolia.publicnode.com';
export const updaterwallet = '2fc5e6304ef5bfb1997f8357ff77afb6e542c94331dcc956bd25187944e721b8';
const provider = new ethers.providers.JsonRpcProvider(rpc);
export const updater1 = new ethers.Wallet(updaterwallet, provider);





// Replace these with the actual ABI and contract address

export const hasherAddress = '0x050e03BCAA6BEf21e40871D61af7B573fFF8bF5F';
export const VerifierAddress = '0x6F07E4BC6dDaeAf2c397E1bE7Ae39848810EFedB';
export const TornadoAddress = '0x922d537a17e38D83Ba89E54b9F792eBc6fbad03C';

//export const ETHTornado = new ethers.Contract(TornadoAddress, contractABI, updater1);





export const uzarAddress = '0xa1Aa496E0BE29d4624579a302dD8b2f9f55765e3'; 


export const providert = new ethers.providers.JsonRpcProvider('https://endpoints.omniatech.io/v1/eth/sepolia/public');
export const treasury = "0xB054A21ed66a584998ED1C48f6C6eE75b9cbC707";







export async function convertWeiToEth(tokenbalance) {
    const output = ethers.utils.formatEther(tokenbalance);
    return output;
}