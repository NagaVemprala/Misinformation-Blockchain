import { useState } from "react";
import misInfoApp from '../misInfoApp';
import { ethers } from "ethers";

function CreateMisinformationEvidence(props) {
    const [misInformationEvidence, setMisInformationEvidence] = useState("");

    const handleMsgChange = (event) => {
        setMisInformationEvidence(event.target.value);
    };

    const handlePost = async () => {

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const _signer = await provider.getSigner();
        const misInfoAppContract = misInfoApp(provider, props.address);
        const misInfoTopicSigner = misInfoAppContract.connect(_signer);
        const misInfoAppResponse = await misInfoTopicSigner.createPost(misInformationEvidence);
        console.log(misInfoAppResponse);
    };

    return (
        <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr 2fr", gap: "1px" }}>
            <label htmlFor="misInformationEvidence" style={{ fontSize: "16px", color: "#177B7B", textAlign: "left" }}> Post evidence to debunk probable misinformation! </label>
            <input
                type="text"
                id="misInformationEvidence"
                value={misInformationEvidence}
                onChange={handleMsgChange}
                style={{ backgroundColor: "white", padding: "10px", border: "1px solid #ccc", width: "500px" }}
            />
            <br />
            

                <br></br>
                <div><button onClick={handlePost} className="button is-link is-medium"> Submit</button></div>
                
        </div>

    );
}

export default CreateMisinformationEvidence;
