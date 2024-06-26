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
  const [misinfoSingleContract, setMisinfoSingleContract] = useState();
  const [misinfoClaim, setMisinfoClaim] = useState();
  const [misinfoReward, setMisinfoReward] = useState();
  const [signer, setSigner] = useState();
  const [misInfoTopicAddresses, setMisInforTopicAddresses] = useState([]);
  const [postEvidences, setPostEvidences] = useState([]);
  const [myObjects, setMyObjects] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [fundingManager, setFundingManager] = useState(false);
  const [evidenceRewardShare, setEvidenceRewardShare] = useState(0);
  const [criticRewardShare, setCriticRewardShare] = useState(0);

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
        //setMisinfoContract(misInfo(provider));
        setMisinfoSingleContract(misInfoApp(provider));
        const misInfoTopicSigner = misinfoSingleContract.connect(signer);
        const misInformationRewardDetails = await misInfoTopicSigner.sendMisinfoAppDetails();
        setMisinfoClaim(misInformationRewardDetails[0]);
        setMisinfoReward(misInformationRewardDetails[1]);
        setFundingManager(await misInfoTopicSigner.isFundingManager());
        fetchRewardValue(accounts[0]);
        console.log(misInformationRewardDetails);
        console.log("evidenceRewardShare: ", evidenceRewardShare);
        console.log("criticRewardShare: ", criticRewardShare);

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
        //setMisinfoContract(misInfo(provider));
        setMisinfoSingleContract(misInfoApp(provider));
        const misInfoTopicSigner = misinfoSingleContract.connect(signer);
        const misInformationRewardDetails = await misInfoTopicSigner.sendMisinfoAppDetails();
        setMisinfoClaim(misInformationRewardDetails[0]);
        setMisinfoReward(misInformationRewardDetails[1]);
        setFundingManager(await misInfoTopicSigner.isFundingManager());
        fetchRewardValue(accounts[0]);
        console.log("evidenceRewardShare: ", evidenceRewardShare);
        console.log("criticRewardShare: ", criticRewardShare);

        console.log(misInformationRewardDetails);
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

  const fetchAvailableMisInfos = async () => {

    const tempPosts = [];
    const misInfoTopicSigner = misinfoSingleContract.connect(signer);
    const misInformationEvidenceAddresses = await misInfoTopicSigner.sendDebunkingUserAddresses();

    setPostEvidences([]);
    if (misInformationEvidenceAddresses.length > 0) {
      for (let i = 0; i < misInformationEvidenceAddresses.length; i++) {
        const postAddress = misInformationEvidenceAddresses[i];
        const postMsg = await misInfoTopicSigner.sendDebunkingUserStruct(misInformationEvidenceAddresses[i]);
        tempPosts.push({ postAddress, postMsg });
        console.log("tempPosts: ", tempPosts);
      }
      setPostEvidences(tempPosts);
    }

  };

  const declareRewardsEvidence = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    //const misInfoTopicContract = misInfoApp(provider, address);
    const misInfoTopicSigner = misinfoSingleContract.connect(signer);
    console.log("0xf6CaDaD93F1561E0CA0fFED9b3eD803B7F3D42c0");
    const updateDebunkerRatings = await misInfoTopicSigner.updateDebunkerRatings();
    //const updateDebunkerRatings = await misInfoTopicSigner.sendDebunkingUserStruct("0xf6CaDaD93F1561E0CA0fFED9b3eD803B7F3D42c0")
    console.log("updateDebunkerRatings --> ", updateDebunkerRatings);
  }

  const declareRewardsCritique = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const misInfoTopicSigner = misinfoSingleContract.connect(signer);

    const updateCriticRatings = await misInfoTopicSigner.updateCriticRatings();
    //const debunkUserAvgRating = await misInfoTopicSigner.getAverageRating();
    //console.log(debunkUserAvgRating);
    console.log(updateCriticRatings);
  }

  const fetchRewardValue = async (address) => {
    const misInfoTopicSigner = misinfoSingleContract.connect(signer);
    const evidenceRewardProportion = await misInfoTopicSigner.debunkingUserStruct(address);
    const criticRewardProportion = await misInfoTopicSigner.criticUserStruct(address);
    //console.log("Some change. ", evidenceRewardProportion, evidenceRewardProportion["rewardProportion"], evidenceRewardProportion.evidenceRewardProportion);
    setEvidenceRewardShare(evidenceRewardProportion["rewardProportion"]);
    setCriticRewardShare(criticRewardProportion["rewardProportion"]);    
  }

  const declareRewardsCritique1 = async (address) => {
    console.log(address);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const misInfoTopicContract = misInfoApp(provider, address);
    const misInfoTopicSigner = misInfoTopicContract.connect(signer);
    const updateCriticRatings = await misInfoTopicSigner.updateCriticRatings();
    console.log(updateCriticRatings);
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
      console.log(myObjects);

    }
  };

  const handleStarClick = async (address, newRating) => {
    // setRating(newRating);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const _signer = await provider.getSigner();
    //const misInfoAppContract = misInfoApp(provider, address);
    const misInfoTopicSigner = misinfoSingleContract.connect(_signer);
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
      {evidenceRewardShare > 0 || criticRewardShare > 0 ? (
      <div class="crypto-earned-afterfacts">
              <span id="crypto-amount">Earned for providing evidence - {evidenceRewardShare} </span>
              <br></br>
              <span id="crypto-amount">Earned for rating claims - {criticRewardShare} </span>
      </div>
      ) : null}
      <section className="hero is-fullheight">
        <div className="faucet-hero-body">
          <div className="container has-text-centered main-content">

            <div className="title is-4">
              <p>{misinfoClaim}</p>
            </div>

            <div class="crypto-earned">
              <span>Potential Rewards: </span>
              <span id="crypto-amount">{misinfoReward} TKNs</span>
            </div>
          </div>

          <div className="container has-text-centered main-content">
            <div className="box address-box">
              <div className="container">

                <div className="row">

                  <button onClick={fetchAvailableMisInfos} className="button is-link is-medium">
                    Refresh to see existing reward scopes
                  </button>


                  <ul className="list">

                      
                      <div>
                        {fundingManager && (
                        <div id="navbarMenu" className="navbar-menu">
                          <div className="navbar-item is-align-items-center">
                            <button className="button is-primary declare-rewards-evidence" onClick={() => declareRewardsEvidence()}>
                              <span className="is-link has-text-weight-bold"> Declare Rewards - Evidence! </span>
                            </button>
                          </div>
                          <div className="navbar-item is-align-items-center">
                            <button className="button is-warning declare-rewards-critique" onClick={() => declareRewardsCritique()}>
                              <span className="is-link has-text-weight-bold"> Declare Rewards - Critique! </span>
                            </button>
                          </div>
                        </div>
                        )}
                        <CreateMisinformationEvidence />
                      </div>


                      <div>
                        {postEvidences.length > 0 && (
                          <ul className="list-container">
                            {postEvidences.map((item, idx) => (
                              <li key={idx} className="list-item"> <b>Posted by:</b> {item.postAddress}, <br></br> {idx + 1}. {item.postMsg} <br></br>
                                <div className="star-rating">
                                  {[...Array(5)].map((star, index) => {
                                    return (
                                      <span
                                        key={index}
                                        className={index < star ? 'on' : 'off'}
                                        onClick={() => handleStarClick(item.postAddress, index + 1)}
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
                        {postEvidences.length === 0 && <p className="content is-medium">No evidences are posted yet to fact check!/Click above "Button" to fetch claims!</p>}
                      </div>

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
