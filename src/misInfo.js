import { ethers } from "ethers";
const appABI = [
	{
		"inputs": [
			{
				"internalType": "uint16",
				"name": "reward",
				"type": "uint16"
			},
			{
				"internalType": "string",
				"name": "misInfoMessage",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "alpha",
				"type": "uint8"
			}
		],
		"name": "createMisinformationApp",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getDeployedMisInfos",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "s_deployedMisinformations",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

//const factoryContract = (web3) => {
//    return new web3.eth.Contract(
//        appABI,
//        "0x2d6c126aa026442945787ebff7d197cabcc6c556"
//    )
//}

const factoryContract = (provider) => {
    return new ethers.Contract(
        "0x51b95e87d2aefb34e121d2b120566a092e06c886",
		appABI,
		provider
    )
}
export default factoryContract