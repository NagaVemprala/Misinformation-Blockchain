import { useState } from "react";
import misInfo from '../misInfo';
import { ethers } from "ethers";

function CreateMisinformationApp() {
    const [rewardValue, setRewardValue] = useState(0);
    const [minRating, setMinRating] = useState(0);
    const [misInformationMsg, setMisInformationMsg] = useState("");

    const handleRewardChange = (event) => {
        setRewardValue(event.target.value);
    };

    const handleMinRatingChange = (event) => {
        setMinRating(event.target.value);
    };

    const handleMsgChange = (event) => {
        setMisInformationMsg(event.target.value);
    };

    const handlePost = async () => {

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const _signer = await provider.getSigner();
        const misInfoFactoryContract = misInfo(provider);
        const misInfoFactorySigner = misInfoFactoryContract.connect(_signer);
        const misInfoAppResponse = await misInfoFactorySigner.createMisinformationApp(rewardValue, misInformationMsg, minRating);
        console.log(misInfoAppResponse);
    };

    return (
        <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr 2fr", gap: "2px" }}>
            <label htmlFor="rewardAmount" style={{ fontSize: "20px", color: "#5d0e8b", textAlign: "left" }}> Reward for debunking misinformation $ </label>
            <input
                type="number"
                id="rewardAmount"
                value={rewardValue}
                onChange={handleRewardChange}
                style={{ backgroundColor: "white", padding: "10px", border: "1px solid #ccc", width: "500px" }}
            />
            <br />
            <label htmlFor="misInformationMsg" style={{ fontSize: "20px", color: "#5d0e8b", textAlign: "left" }}> Enter the misinformation message! </label>
            <input
                type="text"
                id="misInformationMsg"
                value={misInformationMsg}
                onChange={handleMsgChange}
                style={{ backgroundColor: "white", padding: "10px", border: "1px solid #ccc", width: "500px" }}
            />
            <br />
            <label htmlFor="minRating" style={{ fontSize: "20px", color: "#5d0e8b", textAlign: "left" }}>Set the minimum required quality rating! </label>
            <input
                type="number"
                id="minRating"
                value={minRating}
                onChange={handleMinRatingChange}
                style={{ backgroundColor: "white", padding: "10px", border: "1px solid #ccc", width: "500px" }}
            />

            <div>
                <br></br>
                <button onClick={handlePost}>Submit</button>
            </div>

        </div>

    );
}

export default CreateMisinformationApp;