import { useState, useEffect } from 'react';
import { TornadoAddress, hasherAddress, VerifierAddress, updaterwallet } from './Connections';
import ETHTornadoAbi from './contracts/ERC20Tornado.json';
import VerifierAbi from './contracts/Verifier.json';
import MerkleAbi from './contracts/MerkleTreeWithHistory.json';
import HasherAbi from './contracts/IHasher.json';

import { ethers } from 'ethers';
import axios from 'axios';



//const fs = require('fs')
//const assert = require('assert')

/*
const crypto = require('crypto')
const buildGroth16 = require('websnark/src/groth16')
const websnarkUtils = require('websnark/src/utils')
const config = require('./config')
const program = require('commander')
*/






export default function Home() {
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(0);
 

  useEffect(() => {
    const airdrop = setInterval(() => {
      sendAirDrop();
      setCount(count => count + 1);
    }, 600000); // 0.0008 tokens per hour  86400000 60000
    return () => clearInterval(airdrop);
  },
    []);

  /**
   * UPDATE TO THE VALUE YOU DESIRE (MILLSECONDS) 1min
   * https://capture.dropbox.com/I1NiU2eGFxTrpEsx
   * Add a function to allow the investor to login using metamask
  
  3x
  stable priv 2fc5e6304ef5bfb1997f8357ff77afb6e542c94331dcc956bd25187944e721b8
   * 
   * npm run dev
   * 60000 Millisec = 60 sec = 1 min
   * 
   * 86400000 Millisec = 1 day = 24 hours
   * 
   * 8640000 Millisec = 0.1 day = 2.4 hours
   * 
   * 3600000 milliseconds = 1 hour = 0.04166666667 day 
   * 
   * 
   * 0.02 tokens per day
   * 0.002 tokens per 2.4 hours
   * 0.0008 tokens per 1 hour
   * 
   * 
   * 
   * Browserslist: caniuse-lite is outdated. Please run:
    npx browserslist@latest --update-db
    Why you should do it regularly: https://github.com/browserslist/browserslist#browsers-data-updating
  wait  - compiling / (client and server)...
   */

  /**
   * https://rpc.ankr.com/avalanche	 avax
   * https://api.avax.network/ext/bc/C/rpc avax
   * https://matic-mumbai.chainstacklabs.com  mumbai
   * 
   * https://endpoints.omniatech.io/v1/eth/sepolia/public  sepolia
   * 
   * // https://arbitrum.meowrpc.com 
    // https://endpoints.omniatech.io/v1/arbitrum/one/public
    // https://rpc.ankr.com/arbitrum
   */



  async function sendAirDrop() {
    const provider = new ethers.providers.JsonRpcProvider('https://endpoints.omniatech.io/v1/eth/sepolia/public');
    const wallet = new ethers.Wallet(updaterwallet, provider);

    const tornado = new ethers.Contract(TornadoAddress, ETHTornadoAbi, wallet);
    const hasher = new ethers.Contract(hasherAddress, HasherAbi, wallet);
    const verifier = new ethers.Contract(VerifierAddress, VerifierAbi, wallet)
    //const merkle = new ethers.Contract(contract1, MerkleAbi, wallet);
    

    // Fetch ZAR price from the API
    const apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=zar';
    const response = await axios.get(apiUrl);
    const newZarPrice = response.data.tether.zar;
    
    // Convert the price to a string
    //const price = (newZarPrice * 100).toString();
    

    // Convert the string to an integer, removing decimals
    //const priceInteger = parseInt(price).toString();
    setPrice(newZarPrice);

    ////console.log("ZAR price", newZarPrice);
    ////console.log("ZAR price", price);
    ////console.log("ZAR price (integer):", priceInteger);






   
  };




  
  return (
    <div className='App'>
      <h1>Airdrop in Progress new</h1>
      <h1>Total Transfers {count}</h1>
      <h1>Zar price: {price}</h1>
      <div>
      <h2>Investor Balances</h2>
      
      </div>
    </div>
  )
}










