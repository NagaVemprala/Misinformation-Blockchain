import { useEffect, useState } from "react";
import "./App.css";
import misInfo from './misInfo';
import misInfoApp from './misInfoApp';
import CreateMisinformationEvidence from "./Components/CreateMisinfoAppEvidence.js";
//import Web3 from 'web3';
import { ethers } from "ethers";
import CreateMisinformationApp from './Components/CreateMisinfoApp.js';
import ReactModal from 'react-modal';

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [misinfoContract, setMisinfoContract] = useState();
  const [signer, setSigner] = useState();
  const [misInfoTopicAddresses, setMisInforTopicAddresses] = useState([]);
  const [postEvidences, setPostEvidences] = useState([]);
  const [myObjects, setMyObjects] = useState([]);
  const [rewardObjects, setRewardObjects] = useState([0, '']);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [currentlyDisplayedEvidences, setCurrentlyDisplayedEvidences] = useState(0);

  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();
  }, [walletAddress]);


  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        console.log("In connectWallet");
        /* MetaMask is installed */
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        /* get accounts */
        const accounts = await provider.send("eth_requestAccounts", []);

        /* get signer */
        setSigner(await provider.getSigner());

        /* local contract instance */
        setMisinfoContract(misInfo(provider));

        /* set active wallet address */
        setWalletAddress(accounts[0]);
        console.log("In connectWallet - End");
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const getCurrentWalletConnected = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_accounts", []);
        setSigner(await provider.getSigner());

        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          console.log(accounts[0]);
        } else {
          console.log("Connect to MetaMask using the Connect button");
        }

        /* local contract instance */
        setMisinfoContract(misInfo(provider));
        console.log("In getCurrentWalletConnected - End");

      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      });
    } else {
      /* MetaMask is not installed */
      setWalletAddress("");
      console.log("Please install MetaMask");
    }
  };

  const getContractAddresses = async () => {
    const misInfoContractSigner = misinfoContract.connect(signer);
    const misinformationContracts = await misInfoContractSigner.getDeployedMisInfos();
    setMisInforTopicAddresses(misinformationContracts);
    handleUpdateString(signer);
  }

  const fetchAvailableMisInfos = async (address, signer, item) => {

    setSelectedItemIndex(item);

    const tempObject = { rewardValue: 0, misInfoDetailedMsg: "" };
    const tempPosts = { postMsg: "", postAddress: "" };
    //const tempArrayOfPosts = [];

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const misInfoTopicContract = misInfoApp(provider, address);
    const misInfoTopicSigner = misInfoTopicContract.connect(signer);
    const misInformationTopic = await misInfoTopicSigner.sendMisinfoAppDetails();
    const misInformationEvidenceAddresses = await misInfoTopicSigner.sendDebunkingUserAddresses();
    console.log("misInformationEvidenceAddresses: ", misInformationEvidenceAddresses);
    //setPostEvidences([]);
    if (
      (misInformationEvidenceAddresses.length > 0) && (currentlyDisplayedEvidences < misInformationEvidenceAddresses.length)
    ) {
      const i = currentlyDisplayedEvidences;

      //for (let i = 0; i < misInformationEvidenceAddresses.length; i++) {
      //  tempPosts.postAddress = misInformationEvidenceAddresses[i];
      //  tempPosts.postMsg = await misInfoTopicSigner.sendDebunkingUserStruct(misInformationEvidenceAddresses[i]);
      tempPosts.postAddress = misInformationEvidenceAddresses[i];
      tempPosts.postMsg = await misInfoTopicSigner.sendDebunkingUserStruct(misInformationEvidenceAddresses[i]);
      //  console.log("tempPosts: ", tempPosts);
      console.log("Before something: ", postEvidences);
      setPostEvidences((postEvidences) => [...postEvidences, tempPosts]);
      setCurrentlyDisplayedEvidences(currentlyDisplayedEvidences + 1);
      console.log("After something: ", postEvidences);
      //  tempArrayOfPosts.push(tempPosts);
      //console.log(tempArrayOfPosts);
    }
    //setPostEvidences(tempArrayOfPosts);
    //console.log("postEvidences: ", tempArrayOfPosts);
    //}

    tempObject.misInfoDetailedMsg = misInformationTopic[0];
    tempObject.rewardValue = misInformationTopic[1];

    setRewardObjects([misInformationTopic[0], misInformationTopic[1]]);
  };

  const declareRewards = async (address) => {
    console.log(address);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const misInfoTopicContract = misInfoApp(provider, address);
    const misInfoTopicSigner = misInfoTopicContract.connect(signer);
    const updateDebunkerRatings = await misInfoTopicSigner.updateDebunkerRatings();
    console.log(updateDebunkerRatings);
  }

  const handleUpdateString = async (signer) => {

    const tempObjects = Array(misInfoTopicAddresses.length)
      .fill()
      .map(() => ({ rewardValue: 0, misInfoDetailedMsg: "" }));

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    for (let i = 0; i < misInfoTopicAddresses.length; i++) {
      const contract = misInfoTopicAddresses[i];

      /* local contract instance */
      const misInfoTopicContract = misInfoApp(provider, contract);
      const misInfoTopicSigner = misInfoTopicContract.connect(signer);
      const misInformationTopic = await misInfoTopicSigner.sendMisinfoAppDetails();

      tempObjects[i].misInfoDetailedMsg = misInformationTopic[0];
      tempObjects[i].rewardValue = misInformationTopic[1];

      setMyObjects((myObjects) => [...myObjects, tempObjects[i]]);

    }
  };

  const handleStarClick = async (address, newRating) => {
    // setRating(newRating);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const _signer = await provider.getSigner();
    const misInfoAppContract = misInfoApp(provider, address);
    const misInfoTopicSigner = misInfoAppContract.connect(_signer);
    const misInfoAppResponse = await misInfoTopicSigner.cUserratePost(address, newRating);
    setShowPopup(true);
    console.log(misInfoAppResponse);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <h1 className="navbar-item is-size-4">Debunking Misinformation through a Decentralized Social Media Platform</h1>
          </div>
          <div id="navbarMenu" className="navbar-menu">
            <div className="navbar-end is-align-items-center">
              <button
                className="button is-white connect-wallet"
                onClick={connectWallet}
              >
                <span className="is-link has-text-weight-bold">
                  {walletAddress && walletAddress.length > 0
                    ? `Connected: ${walletAddress.substring(
                      0,
                      6
                    )}...${walletAddress.substring(38)}`
                    : "Connect Wallet"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <section className="hero is-fullheight">
        <div className="faucet-hero-body">
          <div className="container has-text-centered main-content">
            <h1 className="title is-1">Possible Misinformation that requires debunking! </h1>
            <p>Post evidence information if you believe this event is around a misinformation.</p>

            <CreateMisinformationApp fromAddress={walletAddress} />
          </div>

          <div className="container has-text-centered main-content">
            <div className="box address-box">
              <div className="container">

                <div className="row">

                  <button onClick={getContractAddresses} className="button is-link is-medium">
                    Refresh to see existing reward scopes
                  </button>


                  <ul className="list">
                    {misInfoTopicAddresses.map((address, item) => <div>
                      <li className="list-item" key={item}>Unverified Claim # {item + 1}</li>
                      <button onClick={() => fetchAvailableMisInfos(address, signer, item)}>Click to fetch the misinformation post!</button>

                      {selectedItemIndex >= 0 && selectedItemIndex === item && (
                        <div>
                          <p className="bold-p">Claim: {rewardObjects[0]}</p>
                          <p className="bold-p">Potential Reward: {rewardObjects[1]}</p>
                          <div id="navbarMenu" className="navbar-menu">
                            <div className="navbar-item is-align-items-center">
                              <button className="button is-primary declare-rewards" onClick={() => declareRewards(address)}>
                                <span className="is-link has-text-weight-bold"> Declare Rewards! </span>
                              </button>
                            </div>
                          </div>
                          <CreateMisinformationEvidence address={address} />
                        </div>

                      )}

                      <div>
                        {postEvidences.length > 0 && selectedItemIndex >= 0 && selectedItemIndex === item && (
                          <ul className="list-container">
                            {postEvidences.map((obj, item) => (
                              <li key={item} className="list-item">{obj.postMsg}
                                <div className="star-rating">
                                  {[...Array(5)].map((star, index) => {
                                    return (
                                      <span
                                        key={index}
                                        className={index < star ? 'on' : 'off'}
                                        onClick={() => handleStarClick(obj.postAddress, index + 1)}
                                      >
                                        ★
                                      </span>
                                    );
                                  })}
                                  <ReactModal
                                    isOpen={showPopup}
                                    contentLabel="Star Rating Selected"
                                    onRequestClose={handlePopupClose}
                                    className="star-rating-modal"
                                  >
                                    <div>
                                      <h2 className="modal-content-h2">Your rating has been posted to Blockchain...Thank you for your efforts!</h2>
                                      <br></br>
                                      <button onClick={handlePopupClose} className="modal-content">Close</button>
                                    </div>
                                  </ReactModal>
                                </div>

                              </li>
                            ))}
                          </ul>
                        )}
                        {postEvidences.length === 0 && <p>No items found.</p>}
                      </div>

                    </div>
                    )}
                  </ul>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
