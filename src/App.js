// src/App.js
import React, { useState, useRef } from 'react';
import './App.css'; // Import Tailwind CSS
import { ethers } from 'ethers';
import Webcam from 'react-webcam';
import CryptoJS from 'crypto-js';
import { split, combine } from 'shamir-secret-sharing';
//import secrets from 'secrets.js';
//import crypto from 'crypto-browserify';
//import { splitMnemonic } from 'shamir-bip39';
import Tornado from './tornado';



const App = () => {
  const [message, setMessage] = useState('');
  const [biometricData, setBiometricData] = useState('');
  const [hashedBiometricData, setHashedBiometricData] = useState('');
  const [shares, setShares] = useState([]);
  const [wallet, setWallet] = useState(null);
  const [recoveredPrivateKey, setRecoveredPrivateKey] = useState(null);
  const webcamRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(true);

  const handleAuthorize = async () => {
    // Add logic to authorize for recovery
    setMessage('Authorization in progress...');
  };

  const handleInitializeRecovery = async () => {
    // Add logic to initialize recovery
    setMessage('Recovery initialization in progress...');
  };

  const handleInitiateRecovery = async () => {
    // Add logic to initiate recovery
    setMessage('Self-recovery initiation in progress...');
  };

  const handleRecoverAccess = async () => {
    // Add logic to recover access
    setMessage('Access recovery in progress...');
  };





    // Convert a Uint8Array to a base64-encoded string
    const uint8ArrayToBase64 = (uint8Array) => btoa(String.fromCharCode.apply(null, uint8Array));


    const handleEnrollBiometrics = async () => {
      const imageSrc = webcamRef.current.getScreenshot();
      const hashedData = CryptoJS.SHA256(imageSrc).toString(CryptoJS.enc.Hex);
      console.log('Hashed Data:', hashedData);

      try {
        // Convert the hashed data to Uint8Array
        const hashedDataUint8 = new TextEncoder().encode(hashedData);

      
        const [share1, share2, share3] = await split(hashedDataUint8, 3, 2);
        console.log('SSS Shares:', share1, share2, share3);



        // Create a new local wallet
        const newWallet = ethers.Wallet.createRandom();

        // Store the shares along with the private key
        // const walletShares = [share1, share2, share3];

        /*
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider.getSigner());

        const transaction = await contract.storeSharesAndPrivateKey([share1, share2, share3], newWallet.privateKey);
        await transaction.wait();
          */
        

        
        //setShares(walletShares);

        setWallet(newWallet);
        setShares([share1, share2, share3]);
        


        // Combine shares to recover the hashed data
        const reconstructed = await combine([share1, share3]);

        // Convert the reconstructed data and hashedData to base64-encoded strings
        const reconstructedBase64 = uint8ArrayToBase64(reconstructed);
        const hashedDataBase64 = uint8ArrayToBase64(hashedDataUint8);

        console.log(reconstructedBase64 === hashedDataBase64); // true

        // Display a message indicating success
        setBiometricData(imageSrc);
        setHashedBiometricData(hashedData);
        setMessage('Biometric data enrolled successfully, and shares stored in the smart contract.');
        setIsCameraActive(false);
      } catch (error) {
        console.error('Error during splitting:', error);
        setMessage('Error during biometric enrollment. Please check the console.');
      }
    };


    const handleRecoverWallet = async () => {
      // Extract the shares from the state
      //// const sharesFromState = shares.slice(0, 2); // Assuming you need at least 2 shares for recovery
    
      try {
        // Ensure there are at least 2 shares for recovery
        /*
        if (sharesFromState.length < 2) {
          throw new Error('At least 2 shares are required for recovery.');
        }*/
    
        // Combine shares to recover the hashed data
       // const recoveredHashedDataUint8 = combine(sharesFromState);

       // Convert the hashed data to Uint8Array
       const hashedDataUint8 = new TextEncoder().encode(hashedBiometricData);

      
       const [share1, share2, share3] = await split(hashedDataUint8, 3, 2);
       console.log('SSS Shares:', share1, share2, share3);

       // Combine shares to recover the hashed data
       const reconstructed = await combine([share2, share3]);

       // Convert the reconstructed data and hashedData to base64-encoded strings
       const reconstructedBase64 = uint8ArrayToBase64(reconstructed);
       const hashedDataBase64 = uint8ArrayToBase64(hashedDataUint8);

       console.log(reconstructedBase64 === hashedDataBase64); // true
  
        const recoveredHashedDataUint8 = await combine([share1, share3]);
    
        // Convert the recovered hashed data to base64-encoded string
        const recoveredHashedDataBase64 = btoa(String.fromCharCode.apply(null, recoveredHashedDataUint8));
    
        // Display a message indicating success
        setMessage('Hashed data recovered successfully.');
    
        // Further logic for accessing the recovered data...
    
        // Assuming you want to set the recovered data as the private key
        setRecoveredPrivateKey(recoveredHashedDataBase64);
        console.log('Recovered Private Key:', wallet.privateKey)
        console.log('Recovered Private Key:', recoveredHashedDataBase64);
        console.log('Recovered Private Key:', recoveredHashedDataUint8)
      } catch (error) {
        // Handle the error if the recovery process fails
        console.error('Recovery failed:', error.message);
        setMessage('Recovery failed. Please check your shares.');
      }
    };
  



  const handleCreateWallet = async () => {
    // Create a new local wallet
    const newWallet = ethers.Wallet.createRandom();

    // Store the shares along with the private key
   // const walletShares = [...shares, newWallet.privateKey];
    setWallet(newWallet);

    // Display a message indicating success
    setMessage('Wallet created successfully.');
    //setShares(walletShares);
  };



  return (
    <div className="App">
      <h1>Wallet Recovery App</h1>
      <button onClick={handleAuthorize}>Authorize for Recovery</button>
      <button onClick={handleInitializeRecovery}>Initialize Recovery</button>
      <button onClick={handleInitiateRecovery}>Initiate Self-Recovery</button>
      <button onClick={handleRecoverAccess}>Recover Access</button>

      <div>
        <h2>Enroll Biometrics</h2>
        <Webcam
          audio={false}
          height={200}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={300}
          videoConstraints={{ facingMode: 'user' }} // Adjust this based on your requirements
          onUserMedia={() => setIsCameraActive(true)}
          {...(isCameraActive ? {} : { videoConstraints: false })} // Conditionally disable camera
        />
        <button onClick={handleEnrollBiometrics}>Enroll Biometrics</button>
        {biometricData && <p>Biometric Data: {biometricData}</p>}
      </div>

      
      <div>
        <h2>Create Wallet</h2>
        <button onClick={handleCreateWallet}>Create Wallet</button>
        {wallet && (
          <div>
            <p>Wallet Address: {wallet.address}</p>
            <p>Private Key: {wallet.privateKey}</p>
            <p>Hashed Biometric Data: {hashedBiometricData}</p>
          </div>
        )}
      </div>

      <div>
        <h2>Recover Wallet</h2>
        <button onClick={handleRecoverWallet}>Recover Wallet</button>
        {recoveredPrivateKey && (
          <div>
            <p>Recovered Private Key: {recoveredPrivateKey}</p>
            <p>Recovered Private Key: {wallet.privateKey}</p>
            <p>Recovered Shares: {shares}</p>
          </div>
        )}
      </div>

      <div>{message}</div>
      <Tornado />
    </div>
  );
};

export default App;