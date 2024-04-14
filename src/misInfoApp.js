import { ethers } from "ethers";
const appABI = [
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
		"stateMutability": "nonpayable",
		"type": "function"
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
		"inputs": [],
		"name": "debunkerRewards",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAverageRating",
		"outputs": [],
		"stateMutability": "nonpayable",
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
				"internalType": "address",
				"name": "funder",
				"type": "address"
			},
			{
				"internalType": "uint16",
				"name": "_alpha",
				"type": "uint16"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
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
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "_debunkingUserAddresses",
		"outputs": [
			{
				"internalType": "address",
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
		"name": "_debunkingUserAddresses1",
		"outputs": [
			{
				"internalType": "address",
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
		"name": "currentDistributionStatus",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
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
		"name": "debunkingUserAddresses",
		"outputs": [
			{
				"internalType": "address",
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
		"name": "isFundingManager",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "criticOwner",
				"type": "address"
			}
		],
		"name": "sendCriticStructure",
		"outputs": [
			{
				"components": [
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
				"internalType": "struct MisinformationApp.criticUser",
				"name": "",
				"type": "tuple"
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
			},
			{
				"internalType": "uint16",
				"name": "",
				"type": "uint16"
			},
			{
				"internalType": "uint16",
				"name": "",
				"type": "uint16"
			},
			{
				"internalType": "uint16",
				"name": "",
				"type": "uint16"
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
	}
];

//const appContract = (web3, contract) => {
//    return new web3.eth.Contract(
//        appABI,
//        contract
//    )
//}

const appContract = (provider) => {
    return new ethers.Contract(
        "0x89E4cba7B6521a61204C76D8dA25d5f8f2cc2eCe", //
		appABI,
		provider
    )
}

export default appContract;
