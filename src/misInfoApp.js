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
				"internalType": "address",
				"name": "funder",
				"type": "address"
			},
			{
				"internalType": "uint8",
				"name": "_alpha",
				"type": "uint8"
			}
		],
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "debunkerAddress",
				"type": "address"
			},
			{
				"internalType": "uint8",
				"name": "_rating",
				"type": "uint8"
			}
		],
		"name": "cUserratePost",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "post",
				"type": "string"
			}
		],
		"name": "createPost",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "criticRewards",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "criticUserStruct",
		"outputs": [
			{
				"internalType": "address",
				"name": "criticUserAddress",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "criticUserEligibleForRewards",
				"type": "bool"
			},
			{
				"internalType": "uint16",
				"name": "totalCriticRatings",
				"type": "uint16"
			},
			{
				"internalType": "uint16",
				"name": "rewardProportion",
				"type": "uint16"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "debunkerRewards",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "debunkingUserStruct",
		"outputs": [
			{
				"internalType": "address",
				"name": "debunkUserAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "debunkPost",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "debunkUserEligibleForRewards",
				"type": "bool"
			},
			{
				"internalType": "uint16",
				"name": "debunkerPostRating",
				"type": "uint16"
			},
			{
				"internalType": "uint16",
				"name": "sumTotalOfRatings",
				"type": "uint16"
			},
			{
				"internalType": "uint16",
				"name": "totalCriticsRated",
				"type": "uint16"
			},
			{
				"internalType": "uint16",
				"name": "rewardProportion",
				"type": "uint16"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "sendDebunkerPosts",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "debunkUserAddress",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "debunkPost",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "debunkUserEligibleForRewards",
						"type": "bool"
					},
					{
						"internalType": "uint16",
						"name": "debunkerPostRating",
						"type": "uint16"
					},
					{
						"internalType": "uint16",
						"name": "sumTotalOfRatings",
						"type": "uint16"
					},
					{
						"internalType": "uint16",
						"name": "totalCriticsRated",
						"type": "uint16"
					},
					{
						"internalType": "uint16",
						"name": "rewardProportion",
						"type": "uint16"
					}
				],
				"internalType": "struct MisinformationApp.debunkingUser[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "sendDebunkingUserAddresses",
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
				"internalType": "address",
				"name": "_debunkingUserAddress",
				"type": "address"
			}
		],
		"name": "sendDebunkingUserStruct",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "sendMisinfoAppDetails",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint16",
				"name": "",
				"type": "uint16"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "postOwner",
				"type": "address"
			}
		],
		"name": "sendPost",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "debunkUserAddress",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "debunkPost",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "debunkUserEligibleForRewards",
						"type": "bool"
					},
					{
						"internalType": "uint16",
						"name": "debunkerPostRating",
						"type": "uint16"
					},
					{
						"internalType": "uint16",
						"name": "sumTotalOfRatings",
						"type": "uint16"
					},
					{
						"internalType": "uint16",
						"name": "totalCriticsRated",
						"type": "uint16"
					},
					{
						"internalType": "uint16",
						"name": "rewardProportion",
						"type": "uint16"
					}
				],
				"internalType": "struct MisinformationApp.debunkingUser",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "updateCriticRatings",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "updateDebunkerRatings",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

//const appContract = (web3, contract) => {
//    return new web3.eth.Contract(
//        appABI,
//        contract
//    )
//}

const appContract = (provider, contract) => {
    return new ethers.Contract(
        contract,
		appABI,
		provider
    )
}

export default appContract;