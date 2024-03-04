import { ethers } from "ethers";
const appABI = [
	{
		"inputs": [],
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "contractBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
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
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
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
        "0x6e20c06339a18abb9a8d826ab84a13c0823ebccc",
		appABI,
		provider
    )
}
export default factoryContract
