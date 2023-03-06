'use strict';

// these methods are here to help handle version changes in 
// ethers & web3.js 

const compatibility = {
  ethers: {

    // see https://docs.ethers.org/v6/migrating/#migrate-contracts
    _methodOperation: (contract, methodName, operationName, args) => {
      const isV5 = Object.keys(contract).indexOf('populateTransaction') > -1;
      if (isV5) {
        if (operationName === 'staticCall') {
          operationName = 'callStatic';
        }
        return contract[operationName][methodName](...args)
      } else {
        return contract[methodName][operationName](...args)
      }
    },

    populateTransaction: (contract, methodName, args) => {
      return compatibility.ethers._methodOperation(contract, methodName, 'populateTransaction', args)
    },

    staticCall: (contract, methodName, args) => {
      return compatibility.ethers._methodOperation(contract, methodName, 'staticCall', args)
    }
  },
};

var _43114 = {
  "name": "mainnet",
  "chainId": "43114",
  "contracts": {
    "ConstraintsAVAXV1": {
      "address": "0x121c0af084bB7FdD965dA1741687b1248e2FE465",
      "abi": [
        {
          "inputs": [
            {
              "internalType": "contract VerifierInterface",
              "name": "verifier",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "names",
              "type": "uint256[]"
            },
            {
              "indexed": false,
              "internalType": "bool",
              "name": "blocked",
              "type": "bool"
            }
          ],
          "name": "NamesBlocked",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "previousAdminRole",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "newAdminRole",
              "type": "bytes32"
            }
          ],
          "name": "RoleAdminChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "account",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "sender",
              "type": "address"
            }
          ],
          "name": "RoleGranted",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "account",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "sender",
              "type": "address"
            }
          ],
          "name": "RoleRevoked",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "contract VerifierInterface",
              "name": "verifier",
              "type": "address"
            }
          ],
          "name": "VerifierSet",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "DEFAULT_ADMIN_ROLE",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "MANAGER_ROLE",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "_verifier",
          "outputs": [
            {
              "internalType": "contract VerifierInterface",
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
              "internalType": "uint256[]",
              "name": "names",
              "type": "uint256[]"
            }
          ],
          "name": "blockNames",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "namespace",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "name",
              "type": "uint256"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "name": "check",
          "outputs": [],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            }
          ],
          "name": "getRoleAdmin",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "grantRole",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "hasRole",
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
              "internalType": "uint256",
              "name": "name",
              "type": "uint256"
            }
          ],
          "name": "isNameBlocked",
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
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "renounceRole",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "revokeRole",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "contract VerifierInterface",
              "name": "verifier",
              "type": "address"
            }
          ],
          "name": "setVerifier",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "interfaceId",
              "type": "bytes4"
            }
          ],
          "name": "supportsInterface",
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
              "internalType": "uint256[]",
              "name": "names",
              "type": "uint256[]"
            }
          ],
          "name": "unblockNames",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ]
    },
    "ConstraintsVerifier": {
      "address": "0x16acE87085E21E54659FF6EC8903D8ce626813C5",
      "abi": [
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "proof",
              "type": "bytes"
            },
            {
              "internalType": "uint256[]",
              "name": "pubSignals",
              "type": "uint256[]"
            }
          ],
          "name": "verifyProof",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ]
    },
    "ContractRegistryV1": {
      "address": "0x4832D668C2c75Fa10C597FD19B116d2E1873ED69",
      "abi": [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "adminAddress",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "previousAdminRole",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "newAdminRole",
              "type": "bytes32"
            }
          ],
          "name": "RoleAdminChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "account",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "sender",
              "type": "address"
            }
          ],
          "name": "RoleGranted",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "account",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "sender",
              "type": "address"
            }
          ],
          "name": "RoleRevoked",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "string",
              "name": "contractName",
              "type": "string"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "contractAddress",
              "type": "address"
            }
          ],
          "name": "Set",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "DEFAULT_ADMIN_ROLE",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "MANAGER_ROLE",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "contractName",
              "type": "string"
            }
          ],
          "name": "get",
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
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            }
          ],
          "name": "getRoleAdmin",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "grantRole",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "hasRole",
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
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "renounceRole",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "revokeRole",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "contractName",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "contractAddress",
              "type": "address"
            }
          ],
          "name": "set",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "interfaceId",
              "type": "bytes4"
            }
          ],
          "name": "supportsInterface",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ]
    },
    "Domain": {
      "address": "0x797AC669A1908ca68CD9854994345f570495541A",
      "abi": [
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "symbol",
              "type": "string"
            },
            {
              "internalType": "contract ContractRegistryInterface",
              "name": "contractRegistry",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "approved",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "Approval",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "operator",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "bool",
              "name": "approved",
              "type": "bool"
            }
          ],
          "name": "ApprovalForAll",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "string",
              "name": "uri",
              "type": "string"
            }
          ],
          "name": "ContractURISet",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "agent",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "registrant",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "name",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "leaseLength",
              "type": "uint256"
            }
          ],
          "name": "Recycle",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "agent",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "registrant",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "name",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "leaseLength",
              "type": "uint256"
            }
          ],
          "name": "Register",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "agent",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "holder",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "name",
              "type": "uint256"
            }
          ],
          "name": "Revoke",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "previousAdminRole",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "newAdminRole",
              "type": "bytes32"
            }
          ],
          "name": "RoleAdminChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "account",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "sender",
              "type": "address"
            }
          ],
          "name": "RoleGranted",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "account",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "sender",
              "type": "address"
            }
          ],
          "name": "RoleRevoked",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "agent",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "name",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "bool",
              "name": "suspended",
              "type": "bool"
            }
          ],
          "name": "Suspend",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "string",
              "name": "uri",
              "type": "string"
            }
          ],
          "name": "TokenBaseURISet",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "Transfer",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "ADMIN_AGENT",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "DEFAULT_ADMIN_ROLE",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "LEASING_AGENT",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "RECYCLING_AGENT",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "REVOCATION_AGENT",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "SUSPENSION_AGENT",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "_contractRegistry",
          "outputs": [
            {
              "internalType": "contract ContractRegistryInterface",
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
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "approve",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            }
          ],
          "name": "balanceOf",
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
          "inputs": [],
          "name": "contractURI",
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
          "inputs": [
            {
              "internalType": "uint256",
              "name": "name",
              "type": "uint256"
            }
          ],
          "name": "exists",
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
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "getApproved",
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
              "name": "name",
              "type": "uint256"
            }
          ],
          "name": "getDomainExpiry",
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
              "internalType": "uint256",
              "name": "domainId",
              "type": "uint256"
            }
          ],
          "name": "getNamespaceId",
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
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            }
          ],
          "name": "getRoleAdmin",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "internalType": "uint256",
              "name": "namespaceId",
              "type": "uint256"
            }
          ],
          "name": "getRoleForNamespace",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "pure",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "grantRole",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "hasRole",
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
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "operator",
              "type": "address"
            }
          ],
          "name": "isApprovedForAll",
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
              "internalType": "uint256",
              "name": "name",
              "type": "uint256"
            }
          ],
          "name": "isSuspended",
          "outputs": [
            {
              "internalType": "bool",
              "name": "suspended",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "name",
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
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "ownerOf",
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
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "namespaceId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "name",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "leaseLength",
              "type": "uint256"
            }
          ],
          "name": "recycle",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "registrant",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "namespaceId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "name",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "leaseLength",
              "type": "uint256"
            },
            {
              "internalType": "bytes",
              "name": "constraintsData",
              "type": "bytes"
            }
          ],
          "name": "register",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "renounceRole",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "namespaceId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "name",
              "type": "uint256"
            }
          ],
          "name": "revoke",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "revokeRole",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "safeTransferFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "bytes",
              "name": "_data",
              "type": "bytes"
            }
          ],
          "name": "safeTransferFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "operator",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "approved",
              "type": "bool"
            }
          ],
          "name": "setApprovalForAll",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "uri",
              "type": "string"
            }
          ],
          "name": "setBaseTokenURI",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "uri",
              "type": "string"
            }
          ],
          "name": "setContractURI",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "interfaceId",
              "type": "bytes4"
            }
          ],
          "name": "supportsInterface",
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
              "internalType": "uint256",
              "name": "namespaceId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "name",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "suspended",
              "type": "bool"
            }
          ],
          "name": "suspend",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "symbol",
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
          "inputs": [
            {
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
            }
          ],
          "name": "tokenByIndex",
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
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
            }
          ],
          "name": "tokenOfOwnerByIndex",
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
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "tokenURI",
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
          "name": "totalSupply",
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
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "transferFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ]
    },
    "EVMReverseResolverV1": {
      "address": "0xF4A1328B2d3BFd7aca965B6CcB688F1BE54838D0",
      "abi": [
        {
          "inputs": [
            {
              "internalType": "contract ContractRegistryInterface",
              "name": "_contractRegistry",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "name",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "path",
              "type": "uint256[]"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "target",
              "type": "address"
            }
          ],
          "name": "EntrySet",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "name",
              "type": "uint256"
            },
            {
              "internalType": "uint256[]",
              "name": "path",
              "type": "uint256[]"
            }
          ],
          "name": "clear",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "contractRegistry",
          "outputs": [
            {
              "internalType": "contract ContractRegistryInterface",
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
              "name": "target",
              "type": "address"
            }
          ],
          "name": "get",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "name",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "hash",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "name",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "hash",
              "type": "uint256"
            }
          ],
          "name": "getEntry",
          "outputs": [
            {
              "internalType": "address",
              "name": "entry",
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
              "name": "name",
              "type": "uint256"
            },
            {
              "internalType": "uint256[]",
              "name": "path",
              "type": "uint256[]"
            }
          ],
          "name": "set",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ]
    },
    "LeasingAgentV1": {
      "address": "0x5c9140B835F5A74E62B49C7Ba30a7362aADbD4Ed",
      "abi": [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "contractRegistryAddress",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "namespaceId",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "bool",
              "name": "enabled",
              "type": "bool"
            }
          ],
          "name": "Enabled",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "names",
              "type": "uint256[]"
            },
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "quantities",
              "type": "uint256[]"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "payment",
              "type": "uint256"
            }
          ],
          "name": "Registered",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "premiumStartTime",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "premiumEndTime",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "premiumPricePoints",
              "type": "uint256[]"
            }
          ],
          "name": "RegistrationPremiumSet",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "previousAdminRole",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "newAdminRole",
              "type": "bytes32"
            }
          ],
          "name": "RoleAdminChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "account",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "sender",
              "type": "address"
            }
          ],
          "name": "RoleGranted",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "account",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "sender",
              "type": "address"
            }
          ],
          "name": "RoleRevoked",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "DEFAULT_ADMIN_ROLE",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "MANAGER_ROLE",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "_contractRegistry",
          "outputs": [
            {
              "internalType": "contract ContractRegistryInterface",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "_enabled",
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
          "inputs": [],
          "name": "_namespaceId",
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
          "inputs": [],
          "name": "_premiumEndTime",
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
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "_premiumPricePoints",
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
          "inputs": [],
          "name": "_premiumStartTime",
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
              "internalType": "bool",
              "name": "enabled",
              "type": "bool"
            }
          ],
          "name": "enable",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "t",
              "type": "uint256"
            }
          ],
          "name": "getRegistrationPremium",
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
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            }
          ],
          "name": "getRoleAdmin",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "grantRole",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "hasRole",
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
              "internalType": "uint256[]",
              "name": "names",
              "type": "uint256[]"
            },
            {
              "internalType": "uint256[]",
              "name": "quantities",
              "type": "uint256[]"
            },
            {
              "internalType": "bytes[]",
              "name": "constraintsProofs",
              "type": "bytes[]"
            },
            {
              "internalType": "bytes[]",
              "name": "pricingProofs",
              "type": "bytes[]"
            }
          ],
          "name": "register",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256[]",
              "name": "names",
              "type": "uint256[]"
            },
            {
              "internalType": "uint256[]",
              "name": "quantities",
              "type": "uint256[]"
            },
            {
              "internalType": "bytes[]",
              "name": "constraintsProofs",
              "type": "bytes[]"
            },
            {
              "internalType": "bytes[]",
              "name": "pricingProofs",
              "type": "bytes[]"
            },
            {
              "internalType": "uint256[]",
              "name": "preimages",
              "type": "uint256[]"
            }
          ],
          "name": "registerWithPreimage",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "renounceRole",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "revokeRole",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "premiumStartTime",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "premiumEndTime",
              "type": "uint256"
            },
            {
              "internalType": "uint256[]",
              "name": "premiumPricePoints",
              "type": "uint256[]"
            }
          ],
          "name": "setRegistrationPremiumDetails",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "interfaceId",
              "type": "bytes4"
            }
          ],
          "name": "supportsInterface",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ]
    },
    "Multicall2": {
      "address": "0xe72137272De3d1a3759eeBb6ee525b62a129dF29",
      "abi": [
        {
          "inputs": [
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "target",
                  "type": "address"
                },
                {
                  "internalType": "bytes",
                  "name": "callData",
                  "type": "bytes"
                }
              ],
              "internalType": "struct Multicall2.Call[]",
              "name": "calls",
              "type": "tuple[]"
            }
          ],
          "name": "aggregate",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "blockNumber",
              "type": "uint256"
            },
            {
              "internalType": "bytes[]",
              "name": "returnData",
              "type": "bytes[]"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "target",
                  "type": "address"
                },
                {
                  "internalType": "bytes",
                  "name": "callData",
                  "type": "bytes"
                }
              ],
              "internalType": "struct Multicall2.Call[]",
              "name": "calls",
              "type": "tuple[]"
            }
          ],
          "name": "blockAndAggregate",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "blockNumber",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "blockHash",
              "type": "bytes32"
            },
            {
              "components": [
                {
                  "internalType": "bool",
                  "name": "success",
                  "type": "bool"
                },
                {
                  "internalType": "bytes",
                  "name": "returnData",
                  "type": "bytes"
                }
              ],
              "internalType": "struct Multicall2.Result[]",
              "name": "returnData",
              "type": "tuple[]"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "blockNumber",
              "type": "uint256"
            }
          ],
          "name": "getBlockHash",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "blockHash",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getBlockNumber",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "blockNumber",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getCurrentBlockCoinbase",
          "outputs": [
            {
              "internalType": "address",
              "name": "coinbase",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getCurrentBlockDifficulty",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "difficulty",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getCurrentBlockGasLimit",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "gaslimit",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getCurrentBlockTimestamp",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "addr",
              "type": "address"
            }
          ],
          "name": "getEthBalance",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "balance",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getLastBlockHash",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "blockHash",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bool",
              "name": "requireSuccess",
              "type": "bool"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "target",
                  "type": "address"
                },
                {
                  "internalType": "bytes",
                  "name": "callData",
                  "type": "bytes"
                }
              ],
              "internalType": "struct Multicall2.Call[]",
              "name": "calls",
              "type": "tuple[]"
            }
          ],
          "name": "tryAggregate",
          "outputs": [
            {
              "components": [
                {
                  "internalType": "bool",
                  "name": "success",
                  "type": "bool"
                },
                {
                  "internalType": "bytes",
                  "name": "returnData",
                  "type": "bytes"
                }
              ],
              "internalType": "struct Multicall2.Result[]",
              "name": "returnData",
              "type": "tuple[]"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bool",
              "name": "requireSuccess",
              "type": "bool"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "target",
                  "type": "address"
                },
                {
                  "internalType": "bytes",
                  "name": "callData",
                  "type": "bytes"
                }
              ],
              "internalType": "struct Multicall2.Call[]",
              "name": "calls",
              "type": "tuple[]"
            }
          ],
          "name": "tryBlockAndAggregate",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "blockNumber",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "blockHash",
              "type": "bytes32"
            },
            {
              "components": [
                {
                  "internalType": "bool",
                  "name": "success",
                  "type": "bool"
                },
                {
                  "internalType": "bytes",
                  "name": "returnData",
                  "type": "bytes"
                }
              ],
              "internalType": "struct Multicall2.Result[]",
              "name": "returnData",
              "type": "tuple[]"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ]
    },
    "NamespaceV1": {
      "address": "0x72cbb66B23dC7D98E46f0602aC2258F863297440",
      "abi": [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "namespaceId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "contract ConstraintsInterface",
              "name": "constraints",
              "type": "address"
            }
          ],
          "name": "ConstraintsSet",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "namespaceId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "gracePeriodLength",
              "type": "uint256"
            }
          ],
          "name": "GracePeriodLengthSet",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "namespaceId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "recyclePeriodLength",
              "type": "uint256"
            }
          ],
          "name": "RecyclePeriodLengthSet",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "previousAdminRole",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "newAdminRole",
              "type": "bytes32"
            }
          ],
          "name": "RoleAdminChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "account",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "sender",
              "type": "address"
            }
          ],
          "name": "RoleGranted",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "account",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "sender",
              "type": "address"
            }
          ],
          "name": "RoleRevoked",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "DEFAULT_ADMIN_ROLE",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "MANAGER_ROLE",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
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
          "name": "_constraints",
          "outputs": [
            {
              "internalType": "contract ConstraintsInterface",
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
          "name": "_initializedNamespaces",
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
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "name",
              "type": "uint256"
            },
            {
              "internalType": "bytes",
              "name": "constraintsData",
              "type": "bytes"
            }
          ],
          "name": "checkName",
          "outputs": [],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            }
          ],
          "name": "getGracePeriodLength",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "gracePeriodLength",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            }
          ],
          "name": "getRecyclePeriodLength",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "recyclePeriodLength",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            }
          ],
          "name": "getRoleAdmin",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "grantRole",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "hasRole",
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
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "contract ConstraintsInterface",
              "name": "constraints",
              "type": "address"
            }
          ],
          "name": "initNamespace",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "renounceRole",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "revokeRole",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "contract ConstraintsInterface",
              "name": "constraints",
              "type": "address"
            }
          ],
          "name": "setConstraints",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "gracePeriodLength",
              "type": "uint256"
            }
          ],
          "name": "setGracePeriodLength",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "recyclePeriodLength",
              "type": "uint256"
            }
          ],
          "name": "setRecyclePeriodLength",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "interfaceId",
              "type": "bytes4"
            }
          ],
          "name": "supportsInterface",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ]
    },
    "Poseidon": {
      "address": "0x6e03620156860584870b6415447770BbC7D6eB0E",
      "abi": [
        {
          "constant": true,
          "inputs": [
            {
              "internalType": "bytes32[3]",
              "name": "input",
              "type": "bytes32[3]"
            }
          ],
          "name": "poseidon",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "payable": false,
          "stateMutability": "pure",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "internalType": "uint256[3]",
              "name": "input",
              "type": "uint256[3]"
            }
          ],
          "name": "poseidon",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "pure",
          "type": "function"
        }
      ]
    },
    "PreRegistrationDistributionAgent": {
      "address": "0x51025Fe492Aa29573EdC62DB2CfE12249711EA82",
      "abi": [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "contractRegistryAddress",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "namespaceId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "registrationLength",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "previousAdminRole",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "newAdminRole",
              "type": "bytes32"
            }
          ],
          "name": "RoleAdminChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "account",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "sender",
              "type": "address"
            }
          ],
          "name": "RoleGranted",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "account",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "sender",
              "type": "address"
            }
          ],
          "name": "RoleRevoked",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "DEFAULT_ADMIN_ROLE",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address[]",
              "name": "recipients",
              "type": "address[]"
            },
            {
              "internalType": "uint256[]",
              "name": "names",
              "type": "uint256[]"
            },
            {
              "internalType": "bytes[]",
              "name": "constraintsProofs",
              "type": "bytes[]"
            }
          ],
          "name": "distributeNames",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            }
          ],
          "name": "getRoleAdmin",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "grantRole",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "hasRole",
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
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "renounceRole",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "revokeRole",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "interfaceId",
              "type": "bytes4"
            }
          ],
          "name": "supportsInterface",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ]
    },
    "PriceCheckVerifier": {
      "address": "0x8dE968AAC4905F8251879AC922A11c3fE53Ad107",
      "abi": [
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "proof",
              "type": "bytes"
            },
            {
              "internalType": "uint256[]",
              "name": "pubSignals",
              "type": "uint256[]"
            }
          ],
          "name": "verifyProof",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ]
    },
    "PricingOracleV1": {
      "address": "0x5A755aF3650179D02A93F37220Caf76a34D8D975",
      "abi": [
        {
          "inputs": [
            {
              "internalType": "contract VerifierInterface",
              "name": "verifier",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [],
          "name": "_verifier",
          "outputs": [
            {
              "internalType": "contract VerifierInterface",
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
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "convertWeiToUsdCents",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "usdCents",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "name",
              "type": "uint256"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "name": "getPriceForName",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "priceCentsUsd",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "priceFeed",
          "outputs": [
            {
              "internalType": "contract AggregatorV3Interface",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ]
    },
    "PublicResolverV1": {
      "address": "0x55f452383C0F0150CD440d077cDEE67de11B005d",
      "abi": [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "contractRegistryAddress",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "name",
              "type": "uint256"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "hash",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "path",
              "type": "uint256[]"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "key",
              "type": "string"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "data",
              "type": "string"
            }
          ],
          "name": "EntrySet",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "name",
              "type": "uint256"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "hash",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "path",
              "type": "uint256[]"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "key",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "data",
              "type": "string"
            }
          ],
          "name": "StandardEntrySet",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "name",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "hash",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "key",
              "type": "string"
            }
          ],
          "name": "resolve",
          "outputs": [
            {
              "internalType": "string",
              "name": "data",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "name",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "hash",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "key",
              "type": "uint256"
            }
          ],
          "name": "resolveStandard",
          "outputs": [
            {
              "internalType": "string",
              "name": "data",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "name",
              "type": "uint256"
            },
            {
              "internalType": "uint256[]",
              "name": "path",
              "type": "uint256[]"
            },
            {
              "internalType": "string",
              "name": "key",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "data",
              "type": "string"
            }
          ],
          "name": "set",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "name",
              "type": "uint256"
            },
            {
              "internalType": "uint256[]",
              "name": "path",
              "type": "uint256[]"
            },
            {
              "internalType": "uint256",
              "name": "key",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "data",
              "type": "string"
            }
          ],
          "name": "setStandard",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ]
    },
    "RainbowTableV1": {
      "address": "0x3b17bAcEDF86f4d36563d2920771ed105D8B6636",
      "abi": [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "contractRegistryAddress",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "hash",
              "type": "uint256"
            }
          ],
          "name": "Revealed",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "contractRegistry",
          "outputs": [
            {
              "internalType": "contract ContractRegistryInterface",
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
              "name": "hash",
              "type": "uint256"
            },
            {
              "internalType": "uint256[]",
              "name": "preimage",
              "type": "uint256[]"
            }
          ],
          "name": "getHash",
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
              "internalType": "uint256",
              "name": "hash",
              "type": "uint256"
            }
          ],
          "name": "isRevealed",
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
              "internalType": "uint256",
              "name": "hash",
              "type": "uint256"
            }
          ],
          "name": "lookup",
          "outputs": [
            {
              "internalType": "uint256[]",
              "name": "preimage",
              "type": "uint256[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256[]",
              "name": "preimage",
              "type": "uint256[]"
            },
            {
              "internalType": "uint256",
              "name": "hash",
              "type": "uint256"
            }
          ],
          "name": "reveal",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ]
    },
    "ResolutionUtilsV1": {
      "address": "0xcF26B69b98800a3b924304212D78bBff2163848f",
      "abi": [
        {
          "inputs": [
            {
              "internalType": "contract ContractRegistryInterface",
              "name": "_contractRegistry",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [],
          "name": "contractRegistry",
          "outputs": [
            {
              "internalType": "contract ContractRegistryInterface",
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
              "name": "addy",
              "type": "address"
            }
          ],
          "name": "reverseResolveEVMToName",
          "outputs": [
            {
              "internalType": "uint256[]",
              "name": "preimage",
              "type": "uint256[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ]
    },
    "ResolverRegistryV1": {
      "address": "0x3947d4c62C108A8A7bA3ED53AbaDcFF5D8998637",
      "abi": [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "contractRegistryAddress",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "name",
              "type": "uint256"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "hash",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "path",
              "type": "uint256[]"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "resolver",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "datasetId",
              "type": "uint256"
            }
          ],
          "name": "ResolverSet",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "name",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "hash",
              "type": "uint256"
            }
          ],
          "name": "get",
          "outputs": [
            {
              "internalType": "address",
              "name": "resolver",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "datasetId",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "name",
              "type": "uint256"
            },
            {
              "internalType": "uint256[]",
              "name": "path",
              "type": "uint256[]"
            },
            {
              "internalType": "address",
              "name": "resolver",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "datasetId",
              "type": "uint256"
            }
          ],
          "name": "set",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ]
    },
    "ReverseResolverRegistryV1": {
      "address": "0x87388F6EAAfA4bB970EEefd97D29e487949fBbBd",
      "abi": [
        {
          "inputs": [
            {
              "internalType": "contract ContractRegistryInterface",
              "name": "_contractRegistry",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "name",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "contractAddress",
              "type": "address"
            }
          ],
          "name": "AuthenticatorSet",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "standardKey",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "resolverAddress",
              "type": "address"
            }
          ],
          "name": "ResolverSet",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "previousAdminRole",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "newAdminRole",
              "type": "bytes32"
            }
          ],
          "name": "RoleAdminChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "account",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "sender",
              "type": "address"
            }
          ],
          "name": "RoleGranted",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "account",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "sender",
              "type": "address"
            }
          ],
          "name": "RoleRevoked",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "DEFAULT_ADMIN_ROLE",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "MANAGER_ROLE",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
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
          "name": "authenticators",
          "outputs": [
            {
              "internalType": "contract ReverseResolverAuthenticatorInterface",
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
              "name": "name",
              "type": "uint256"
            },
            {
              "internalType": "uint256[]",
              "name": "path",
              "type": "uint256[]"
            },
            {
              "internalType": "address",
              "name": "sender",
              "type": "address"
            }
          ],
          "name": "canWrite",
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
          "inputs": [],
          "name": "contractRegistry",
          "outputs": [
            {
              "internalType": "contract ContractRegistryInterface",
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
              "name": "standardKey",
              "type": "uint256"
            }
          ],
          "name": "getResolver",
          "outputs": [
            {
              "internalType": "address",
              "name": "resolverAddress",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            }
          ],
          "name": "getRoleAdmin",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "grantRole",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "hasRole",
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
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "renounceRole",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "revokeRole",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "name",
              "type": "uint256"
            },
            {
              "internalType": "contract ReverseResolverAuthenticatorInterface",
              "name": "authenticator",
              "type": "address"
            }
          ],
          "name": "setAuthenticator",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "standardKey",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "resolverAddress",
              "type": "address"
            }
          ],
          "name": "setResolver",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "interfaceId",
              "type": "bytes4"
            }
          ],
          "name": "supportsInterface",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ]
    },
    "SoftLaunchDistributionAgent": {
      "address": "0x0793Ce43c931707659513647D5Ab950a3eE1BC27",
      "abi": [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "contractRegistryAddress",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "namespaceId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "registrationLength",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "previousAdminRole",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "newAdminRole",
              "type": "bytes32"
            }
          ],
          "name": "RoleAdminChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "account",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "sender",
              "type": "address"
            }
          ],
          "name": "RoleGranted",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "account",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "sender",
              "type": "address"
            }
          ],
          "name": "RoleRevoked",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "DEFAULT_ADMIN_ROLE",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address[]",
              "name": "recipients",
              "type": "address[]"
            },
            {
              "internalType": "uint256[]",
              "name": "names",
              "type": "uint256[]"
            },
            {
              "internalType": "bytes[]",
              "name": "constraintsProofs",
              "type": "bytes[]"
            }
          ],
          "name": "distributeNames",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            }
          ],
          "name": "getRoleAdmin",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "grantRole",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "hasRole",
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
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "renounceRole",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "revokeRole",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "interfaceId",
              "type": "bytes4"
            }
          ],
          "name": "supportsInterface",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ]
    }
  }
};

var _contracts$1 = {
  43114: _43114,
  
};

const ethersLoader = async (signerOrProvider, chainId) => {
  if (!_contracts$1[chainId]) throw `Contracts not found for chainId ${chainId}`
  const ethers = await import('#ethers');
  const contractData = _contracts$1[chainId];
  const contracts = {};
  for (let key in contractData.contracts) {
    contracts[key] = new ethers.Contract(
      contractData.contracts[key].address,
      contractData.contracts[key].abi,
      signerOrProvider
    );
  }

  return {
    getContracts: () => {
      return contracts
    },

    getResolverContract: (address) => {
      const iface = contracts.PublicResolverV1.interface;
      return new ethers.Contract(
        address,
        iface,
        signerOrProvider
      )
    },

    getEVMReverseResolverContract: (address) => {
      const iface = contracts.EVMReverseResolverV1.interface;
      return new ethers.Contract(
        address,
        iface,
        signerOrProvider
      )
    }
  }
};


function Web3ContractMethod(contract, abi, address) {
  const func = async (...args) => {
    return await contract.methods[abi.name](...args).call()
  };
  func.abi = abi;
  func.populateTransaction = async (...args) => {
    const data =  await contract.methods[abi.name](...args).encodeABI();
    return {
      to: address,
      data
    }
  };
  func.staticCall = async (...args) => {
    return await contract.methods[abi.name](...args).call()
  };
  return func
}

class Web3ContractAdapter {
  constructor(provider, abi, address) {
    this.contract = new provider.eth.Contract(
      abi,
      address
    );

    this.abi = abi;
    this.address = address;

    this.interface = {
      decodeFunctionResult: (methodName, responseData) => {
        const typesArray = this.__getTypesArray(methodName);
        const getOutputNames = this.__getOutputNames(methodName);
        const data = provider.eth.abi.decodeParameters(typesArray, responseData);
        getOutputNames.forEach((output, index) => {
          data[output] = data[index.toString()];
        });
        return data
      }
    };

    abi.map((contractMethodAbi) => {
      try {
        let name;
        let contractMethod = Web3ContractMethod(this.contract, contractMethodAbi, address);

        // if we already assigned a method with the same name,
        // we need to treat it as overloaded
        if (this[contractMethodAbi.name]) {
          
          // if the previous assignment was not overloaded, then we need to
          // also treat the previous assignment as overloaded
          if (this[contractMethodAbi.name] !== this.__multipleDefinitions) {
            name = this.__getMethodNameWithArguments(this[contractMethodAbi.name].abi);
            this[name] = this[contractMethodAbi.name];
          }

          // we need to set up the new assignment
          name = this.__getMethodNameWithArguments(contractMethodAbi);
          this[name] = contractMethod;

          // finally, set the method to throw an exception if
          // the user attempts to call it directly without
          // specifying the argument types
          this[contractMethodAbi.name] = this.__multipleDefinitions;
        } else {
          this[contractMethodAbi.name] = contractMethod;
        }
      } catch (err) {
        console.log(err);
      }
    });
  }

  __getABIForMethod = (methodName) => {
    const nameWithArguments = this.__getMethodNameWithArguments(this[methodName].abi);
    const abi = this[nameWithArguments] ? this[nameWithArguments].abi : this[methodName].abi;
    return abi
  }

  __getTypesArray = (methodName) => {
    const abi = this.__getABIForMethod(methodName);
    return abi.outputs.map((output) => output.type)
  }

  __getOutputNames = (methodName) => {
    const abi = this.__getABIForMethod(methodName);
    return abi.outputs.map((output) => output.name)
  }

  __getMethodNameWithArguments = (methodAbi) => {
    // returns the method name with arguments, as ethers
    // uses for overloaded functions
    const args = methodAbi.inputs.map((input) => input.type).join(',');
    return `${methodAbi.name}(${args})`
  }

  __multipleDefinitions = () => {
    throw "This method has multiple definitions; access it like you would in ethers."
  }
}

const web3Loader = async (provider, chainId) => {
  if (!_contracts$1[chainId]) throw `Contracts not found for chainId ${chainId}`
  const contractData = _contracts$1[chainId];
  const contracts = {};
  for (let key in contractData.contracts) {
    contracts[key] = new Web3ContractAdapter(
      provider,
      contractData.contracts[key].abi,
      contractData.contracts[key].address,
    );
  }

  return {
    getContracts: () => {
      return contracts
    },

    getResolverContract: (address) => {
      contracts.PublicResolverV1.interface;
      return new Web3ContractAdapter(
        provider,
        contracts.PublicResolverV1.abi,
        address
      )
    },

    getEVMReverseResolverContract: (address) => {
      contracts.EVMReverseResolverV1.interface;
      return new Web3ContractAdapter(
        provider,
        contracts.EVMReverseResolverV1.abi,
        address
      )
    }
  }
};

var _contracts = {
  ethersLoader,
  web3Loader
};

var records = {
  "records": [
    {
      "key": 1,
      "name": "X_CHAIN",
      "regex": {
        "address": "[xX]-(AVAX|avax)[A-Za-z0-9]{39}"
      },
      "label": "X-Chain Address",
      "description": "Address on Avalanche X-Chain"
    },
    {
      "key": 2,
      "name": "P_CHAIN",
      "regex": {
        "address": "[pP]-(AVAX|avax)[A-Za-z0-9]{39}"
      },
      "label": "P-Chain Address",
      "description": "Address on Avalanche P-Chain"
    },
    {
      "key": 3,
      "name": "EVM",
      "regex": {
        "address": "0x[a-fA-F0-9]{40}"
      },
      "label": "C-Chain / EVM Address",
      "description": "Address on EVM-type network, including Avalanche C-Chain"
    },
    {
      "key": 4,
      "name": "VALIDATOR",
      "regex": {
        "node_id": "NodeID-[A-Za-z0-9]{33}"
      },
      "label": "Validator NodeID",
      "description": "Validator NodeID on the Avalanche Network"
    },
    {
      "key": 5,
      "name": "DNS_CNAME",
      "regex": {
        "hostname": "([A-Za-z0-9\\-]+\\.)+[A-Za-z0-9\\-]+"
      },
      "label": "DNS CNAME Record",
      "description": "DNS CNAME Record"
    },
    {
      "key": 6,
      "name": "DNS_A",
      "regex": {
        "ipv4": "\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b",
        "ipv6": "(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))"
      },
      "label": "DNS A Record",
      "description": "DNS A Record"
    },
    {
      "key": 7,
      "name": "AVATAR",
      "regex": {
        "http": "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()!@:%_\\+.~#?&\\/\\/=]*)"
      },
      "label": "Avatar",
      "description": "An image which the user wishes to use as their avatar. Value should be a URL which references the image."
    },
    {
      "key": 8,
      "name": "CONTENT",
      "regex": {
        "http": "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()!@:%_\\+.~#?&\\/\\/=]*)",
        "ipfs": "ipfs:\\/\\/[A-Za-z0-9]{46}"
      },
      "label": "Content",
      "description": "A downloadable file. Value should be a URL (e.g. IPFS, HTTPS, ..) which references the image."
    },
    {
      "key": 9,
      "name": "PHONE",
      "regex": {
      },
      "label": "Phone Number",
      "description": "A telephone number. Should conform to E.164 international number format."
    }
  ]
};

const RECORDS = records.records.reduce((sum, curr) => {
  sum[curr.name] = curr.key;
  return sum
}, {});

RECORDS._standardKeyList = records.records.map(record => record.key);
RECORDS._LIST = records.records;

// These functions are meant to wrap an ethers or a web3 provider to 
// configure native resolution in those libraries.
const providers = function (AVVY) {
  return {
    ethersProvider: function (provider, config) {
      const defaultConfig = {
        chainId: 43114
      };
      if (!config) config = defaultConfig; 
      for (let key in defaultConfig) {
        if (!config[key]) config[key] = defaultConfig[key];
      }

      const avvy = new AVVY(provider, {
        chainId: config.chainId
      });

      const _lookupAddress = provider.lookupAddress;
      const _resolveName = provider.resolveName;

      provider.lookupAddress = async (address) => {
        address = await address; // can accept promises

        const output = await avvy.batch([address]).reverseToNames(avvy.RECORDS.EVM);
        if (output[0]) return output[0]

        return _lookupAddress(address)
      };

      provider.resolveName = async (name) => {
        name = await name; // can accept promises

        if (typeof name === 'string' && name.toLowerCase().endsWith('.avax')) {
          let _name = await avvy.name(name).resolve(avvy.RECORDS.EVM);
          return _name
        } 

        return _resolveName.call(provider, name)
      };

      return provider
    }
  }
};

function utils(poseidonFunc) {

  /*
    converts a number into a bitstring
    algorithm mirrors that of github.com/iden3/circomlib
  */
  const num2Bits = (inputNum, numBits) => {
    var lc1 = 0n;
    var e2 = 1n;
    var out = [];
    for (var i = 0n; i < numBits; i += 1n) {
      out[i] = (BigInt(inputNum) >> i) & 1n;
      lc1 += out[i] * e2;
      e2 = e2 + e2;
    }
    return out;
  };

  /*
    converts a bitstring into a number
    algorithm mirrors that of github.com/iden3/circomlib
  */
  const bits2Num = (inputBits) => {
    var lc1 = BigInt(0);
    var e2 = BigInt(1);
    for (var i = 0; i < inputBits.length; i += 1) {
      lc1 += BigInt(inputBits[i]) * e2;
      e2 = e2 + e2;
    }
    return lc1;
  };

  /*
    converts a string to an array of numbers (ascii codes)
    zero-pads the string to `len` length
  */
  const string2AsciiArray = (text, len) => {
    if (len === undefined) throw "string2AsciiArray requires a padding length"
    if (text.length > len) throw "Out of bounds"
    const signal = text.split('').map(t => t.charCodeAt(0));
    while (signal.length < len) {
      signal.push(0);
    }
    return signal
  };

  const characterAllowlist = 'abcdefghijklmnopqrstuvwxyz0123456789-'.split('').map(s => s.charCodeAt(0));

  const asciiArray2String = (codes) => {
    let string = '';
    let code;
    for (let i = 0; i < codes.length; i += 1) {
      code = parseInt(codes[i]);
      if (code === 0) ; else if (characterAllowlist.indexOf(code) > -1) {
        string += String.fromCharCode(code);
      } else {
        throw "Unrecognized character found"
      }
    }
    return string
  };


  /*
    prepares an ascii array for input into 
    the posiedon algorithm
  */
  const _singlePreimageSignal = (chars) => {
    const inputBitsArr = chars.map(c => num2Bits(c, 8));
    const preimageStr = inputBitsArr.reduce((sum, curr) => {
      return sum + curr.join('')
    }, '');
    const preimageNum = bits2Num(preimageStr);
    return preimageNum
  };

  /*
    splits an ascii array into chunks of
    length 31 & prepares each chunk 
    for insertion into the poseidon algorithm
  */
  const asciiArray2PreimageSignal = (_chars) => {
    const chars = [];
    let c;
    for (var i = 0; i < _chars.length; i += 1) {
      if (i % 31 === 0) {
        c = [];
        chars.push(c);
      }
      c.push(_chars[i]);
    }
    return chars.map(_singlePreimageSignal)
  };

  // inverse of asciiArray2PreimageSignal
  const preimageSignal2AsciiArray = (arr) => {
    const charArrays = arr.map(aa => {
      const outputBits = num2Bits(BigInt(aa), 248n);
      return outputBits.join('')
    });
    let bits = charArrays[0] + charArrays[1];
    let pack = [];
    let chars = [];
    for (let i = 0; i < bits.length; i += 1) {
      pack.push(bits[i]);
      if (pack.length === 8) {
        chars.push(bits2Num(pack));
        pack = [];
      }
    }
    return chars
  };

  /* runs a preimageSignal through the poseidon hash */
  const preimageSignal2HashSignal = async (num) => {
    return await poseidonFunc(num)
  };

  const nameHashIteration = async (prevHash, label) => {
    const ascii = string2AsciiArray(label, 62);
    const preimage = asciiArray2PreimageSignal(ascii);
    const hash = await preimageSignal2HashSignal([prevHash].concat(preimage));
    return hash
  };

  const nameHash = async (domain) => {
    let labels = domain.split('.');
    labels.reverse();
    let hash = 0;
    for (let i = 0; i < labels.length; i += 1) {
      hash = await nameHashIteration(hash, labels[i]);
    }
    return hash
  };

  const encodeNameHashInputSignals = async (domain) => {
    let labels = domain.split('.');
    labels.reverse();
    let outputs = labels.map(label => {
      const ascii = string2AsciiArray(label, 62);
      const preimage = asciiArray2PreimageSignal(ascii);
      return preimage
    });
    let flattened = [];
    for (let i = 0; i < outputs.length; i += 1) {
      flattened.push(outputs[i][0]);
      flattened.push(outputs[i][1]);
    }
    return flattened
  };

  const decodeNameHashInputSignals = async (inputSignals) => {
    let unflattened = [];
    for (let i = 0; i < inputSignals.length; i += 1) {
      if (i % 2 === 0) {
        unflattened.push([
          inputSignals[i],
          inputSignals[i+1]
        ]);
      }
    }
    const arr = unflattened.map(pair => {
      const arr = preimageSignal2AsciiArray(pair);
      return asciiArray2String(arr)
    });
    arr.reverse();
    return arr.join('.')
  };

  const generateNameAndPath = async (domain) => {
    const name = await nameHash(domain);
    const inputSignals = await encodeNameHashInputSignals(domain);
    return {
      name,
      path: inputSignals.slice(4)
    }
  };

  return {
    num2Bits,
    bits2Num,
    string2AsciiArray,
    asciiArray2PreimageSignal,
    preimageSignal2HashSignal,
    nameHash,
    nameHashIteration,
    encodeNameHashInputSignals,
    decodeNameHashInputSignals,
    generateNameAndPath
  }
}

const MulticallBatchExecutor = function (provider) {
  return {
    execute: async (txs) => {
      const nullIndexes = [];
      const payload = txs.map((tx, index) => {
        if (tx) {
          return {
            target: tx.to,
            callData: tx.data
          }
        } else {
          nullIndexes.push(index);
          return null
        }
      }).filter(tx => tx !== null);
      const res = await compatibility.ethers.staticCall(
        provider.contracts.Multicall2,
        'tryAggregate',
        [false, payload]
      );
      const ret = res.map(r => r.returnData);

      // fill null indexes
      for (let i = 0; i < nullIndexes.length; i += 1) { 
        ret.splice(nullIndexes[i], 0, null);
      }
      return ret
    }
  }
};

const JsonBatchExecutor = function (fetchJson, jsonRpcUrl) {
  return {
    execute: async (txs) => {
      const nullIndexes = [];
      const payload = txs.map((tx, index) => {
        if (tx) {
          return {
            jsonrpc: '2.0',
            id: index + 1,
            method: 'eth_call',
            params: [tx, 'latest']
          }
        } else {
          nullIndexes.push(index);
          return null
        }
      }).filter(tx => tx !== null);
      const res = await fetchJson(jsonRpcUrl, JSON.stringify(payload));
      const json = res.map(r => r.result);
      
      // fill null indexes
      for (let i = 0; i < nullIndexes.length; i += 1) {
        json.splice(nullIndexes[i], 0, null);
      }
      return json
    }
  }
};

const web3Provider = async function (provider, chainId) {
  const contractLoader = await _contracts.web3Loader(provider, chainId);
  const contracts = contractLoader.getContracts(provider, chainId);

  return {
    contracts,
    getExpiry: async (hash) => {
      const expiry = await contracts.Domain.getDomainExpiry(hash);
      return parseInt(expiry.toString())
    },
    lookupHash: async (hash) => {
      const result = await contracts.RainbowTableV1.lookup(hash);
      return result
    },
    lookupHashBatch: async (batchExecutor, hashes) => {
      const txs = [];
      for (let i = 0; i < hashes.length; i += 1) {
        if (hashes[i] === null) {
          txs.push(null);
        } else {
          txs.push(
            await compatibility.ethers.populateTransaction(
              contracts.RainbowTableV1,
              'lookup',
              [hashes[i]]
            )
          );
        }
      }
      const results = (await batchExecutor.execute(txs)).map(res => {
        try {
          return contracts.RainbowTableV1.interface.decodeFunctionResult('lookup', res).preimage
        } catch (error) {
          return null
        }
      });
      return results
    },
    getResolver: async (domain, hash) => {
      const resolver = await contracts.ResolverRegistryV1.get(domain, hash);
      return resolver
    },
    resolveStandard: async (resolverAddress, datasetId, hash, key) => {
      const resolverContract = contractLoader.getResolverContract(resolverAddress);
      const result = await resolverContract.resolveStandard(datasetId, hash, key);
      return result
    },
    resolve: async (resolverAddress, datasetId, hash, key) => {
      const resolverContract = contractLoader.getResolverContract(resolverAddress);
      const result = await resolverContract.resolve(datasetId, hash, key);
      return result
    },
    reverseResolveEVM: async (key, value) => {
      const address = await contracts.ReverseResolverRegistryV1.getResolver(key);
      const contract = contractLoader.getEVMReverseResolverContract(address);
      return await contract.get(value)
    },
    reverseResolveEVMBatch: async (batchExecutor, key, values) => {
      const address = await contracts.ReverseResolverRegistryV1.getResolver(key);
      const contract = contractLoader.getEVMReverseResolverContract(address);
      const txs = [];
      for (let i = 0; i < values.length; i += 1) {
        txs.push(
          await compatibility.ethers.populateTransaction(
            contract,
            'get',
            [values[i]]
          )
        );
      }
      const results = (await batchExecutor.execute(txs)).map(res => {
        if (res === null) {
          return null
        } else {
          try {
            return contract.interface.decodeFunctionResult('get', res).hash
          } catch (error) {
            return null
          }
        }
      });
      return results
    },
    reverseResolveEVMBatchToNames: async (batchExecutor, values) => {
      const txs = [];
      for (let i = 0; i < values.length; i += 1) {
        txs.push(
          await compatibility.ethers.populateTransaction(
            contracts.ResolutionUtilsV1,
            'reverseResolveEVMToName',
            [values[i]]
          )
        );
      }
      const results = (await batchExecutor.execute(txs)).map(res => {
        if (res === null) {
          return null
        } else {
          try {
            return contracts.ResolutionUtilsV1.interface.decodeFunctionResult('reverseResolveEVMToName', res).preimage
          } catch (error) {
            return null
          }
        }
      });
      return results
    },
    getReverseResolverAddress: async (key) => {
      return await contracts.ReverseResolverRegistryV1.getResolver(key)
    },
    poseidon: async (num) => {
      return await contracts.Poseidon['poseidon(uint256[3])'](num)
    }
  }
};

const ethersProvider = async function (provider, chainId) {
  const contractLoader = await _contracts.ethersLoader(provider, chainId);
  const contracts = contractLoader.getContracts(provider, chainId);

  return {
    contracts,
    getExpiry: async (hash) => {
      const expiry = await contracts.Domain.getDomainExpiry(hash);
      return parseInt(expiry.toString())
    },
    lookupHash: async (hash) => {
      const result = await contracts.RainbowTableV1.lookup(hash);
      return result
    },
    lookupHashBatch: async (batchExecutor, hashes) => {
      const txs = [];
      for (let i = 0; i < hashes.length; i += 1) {
        if (hashes[i] === null) {
          txs.push(null);
        } else {
          txs.push(
            await compatibility.ethers.populateTransaction(
              contracts.RainbowTableV1,
              'lookup',
              [hashes[i]]
            )
          );
        }
      }
      const results = (await batchExecutor.execute(txs)).map(res => {
        try {
          return contracts.RainbowTableV1.interface.decodeFunctionResult('lookup', res).preimage
        } catch (error) {
          return null
        }
      });
      return results
    },
    getResolver: async (domain, hash) => {
      const resolver = await contracts.ResolverRegistryV1.get(domain, hash);
      return resolver
    },
    resolveStandard: async (resolverAddress, datasetId, hash, key) => {
      const resolverContract = contractLoader.getResolverContract(resolverAddress);
      const result = await resolverContract.resolveStandard(datasetId, hash, key);
      return result
    },
    resolve: async (resolverAddress, datasetId, hash, key) => {
      const resolverContract = contractLoader.getResolverContract(resolverAddress);
      const result = await resolverContract.resolve(datasetId, hash, key);
      return result
    },
    reverseResolveEVM: async (key, value) => {
      const address = await contracts.ReverseResolverRegistryV1.getResolver(key);
      const contract = contractLoader.getEVMReverseResolverContract(address);
      return await contract.get(value)
    },
    reverseResolveEVMBatch: async (batchExecutor, key, values) => {
      const address = await contracts.ReverseResolverRegistryV1.getResolver(key);
      const contract = contractLoader.getEVMReverseResolverContract(address);
      const txs = [];
      for (let i = 0; i < values.length; i += 1) {
        txs.push(
          await compatibility.ethers.populateTransaction(
            contract,
            'get',
            [values[i]]
          )
        );
      }
      const results = (await batchExecutor.execute(txs)).map(res => {
        if (res === null) {
          return null
        } else {
          try {
            return contract.interface.decodeFunctionResult('get', res).hash
          } catch (error) {
            return null
          }
        }
      });
      return results
    },
    reverseResolveEVMBatchToNames: async (batchExecutor, values) => {
      const txs = [];
      for (let i = 0; i < values.length; i += 1) {
        txs.push(
          await compatibility.ethers.populateTransaction(
            contracts.ResolutionUtilsV1,
            'reverseResolveEVMToName',
            [values[i]]
          )
        );
      }
      const results = (await batchExecutor.execute(txs)).map(res => {
        if (res === null) {
          return null
        } else {
          try {
            return contracts.ResolutionUtilsV1.interface.decodeFunctionResult('reverseResolveEVMToName', res).preimage
          } catch (error) {
            return null
          }
        }
      });
      return results
    },
    getReverseResolverAddress: async (key) => {
      return await contracts.ReverseResolverRegistryV1.getResolver(key)
    },
    poseidon: async (num) => {
      return await contracts.Poseidon['poseidon(uint256[3])'](num)
    }
  }
};

class AVVY {
  constructor(provider, opts) {
    this.init(provider, opts);
    this.provider = null;
    this.batchExecutor = null;
    this.RECORDS = RECORDS;
    this._promises = {};
    this.contracts = new Promise((resolve, reject) => {
      this._promises.contracts = {
        resolve, 
        reject
      };
    });
    this.provider = new Promise((resolve, reject) => {
      this._promises.provider = {
        resolve,
        reject
      };
    });
  }

  async init(_provider, _opts) {
    
    const _avvy = this;

    // optionally pass chainId
    const opts = _opts || {};
    const chainId = opts.chainId || 43114;

    // configure the provider
    let providerInit;
    if (_provider.constructor.name === 'Web3') {
      providerInit = web3Provider(_provider, chainId);
    } else {
      providerInit = ethersProvider(_provider, chainId);
    }

    providerInit.then((provider) => {

      // set provider
      this._promises.provider.resolve(provider);

      // set contracts
      this._promises.contracts.resolve(provider.contracts);

      // configure batching
      if (opts.batchJsonRpc && opts.fetchJson) {
        _avvy.batchExecutor = JsonBatchExecutor(opts.fetchJson, opts.batchJsonRpc);
      } else {
        _avvy.batchExecutor = MulticallBatchExecutor(provider);
      }
    });

    // pre-cache hash for "avax" TLD
    const providerPoseidonCache = {
      '0': {
        '2019653217': {
          '0': 4272832630669137235923015693490068373911885005413996126751674003559469537065n
        }
      }
    };
    const providerPoseidon = async (num) => {
      const n1 = num[0].toString();
      const n2 = num[1].toString();
      const n3 = num[2].toString();
      if ((n1 in providerPoseidonCache)
          && (n2 in providerPoseidonCache[n1])
          && (n3 in providerPoseidonCache[n1][n2])) {
        return providerPoseidonCache[n1][n2][n3]
      }
      const provider = await this.provider;
      const bignum = await provider.poseidon(num);
      const result = bignum._isBigNumber ? bignum.toBigInt() : bignum;
      if (!(n1 in providerPoseidonCache)) providerPoseidonCache[n1] = {};
      if (!(n2 in providerPoseidonCache[n1])) providerPoseidonCache[n1][n2] = {};
      providerPoseidonCache[n1][n2][n3] = result;
      return result
    };
    const _utils = utils(opts.poseidon || providerPoseidon);

    // represents a Name in the system
    const Name = function (name) {

      // lowercase the name. if someone passes in NAME.avax
      // that is equivalent to name.avax
      name = name.toLowerCase();

      // the domain is the first two labels of the name (namespace, and the next label)
      const getDomain = async () => {
        await _avvy.ready;
        const split = name.split('.');
        split.reverse();
        const _domain = split.slice(0, 2);
        _domain.reverse();
        const domain = _domain.join('.');
        const hash = await _utils.nameHash(domain);
        return {
          domain,
          hash
        }
      };

      return {
        name,
        resolve: async (key) => {
          await _avvy.ready;
          let resolveMethod;
          let provider = await _avvy.provider;
          
          // standard keys are numeric
          if (typeof key == 'number') {
            if (RECORDS._standardKeyList.indexOf(key) === -1) {
              throw `Unknown numeric key ${key} passed to resolve(). If you wish to use a custom key, pass a string.`
            }
            resolveMethod = provider.resolveStandard;
          } 
          
          // custom keys are strings
          else if (typeof key === 'string') {
            resolveMethod = provider.resolve;
          }

          else {
            throw "Unknown key type passed to resolve()"
          }

          let domain = await getDomain(); // this is the domain with 2 labels, e.g. name.avax
          let nameHash = await _utils.nameHash(name);
          let expiresAt = await provider.getExpiry(domain.hash);
          if (expiresAt === 0) {
            throw "Domain has not been registered"
          }
          const now = parseInt(Date.now() / 1000);
          if (now >= expiresAt) {
            throw "Domain registration is expired"
          }

          // find the active resolver
          // for a name aaa.bbb.ccc.avax, we must
          // check for a resolver set at:
          // - aaa.bbb.ccc.avax
          // - bbb.ccc.avax
          // - ccc.avax
          // the resolver set at the longest subdomain is the one to use
          let split = name.split('.');
          let resolver;
          while (split.length >= 2) {
            let subdomain = split.join('.');
            let hash = await _utils.nameHash(subdomain);
            try {
              resolver = await provider.getResolver(domain.hash, hash);
              break
            } catch (err) {}
            split = split.slice(1);
          }

          if (!resolver) throw "No resolver set"

          // fetch the value
          return await resolveMethod(resolver.resolver, resolver.datasetId, nameHash, key)
        },
      }
    };

    // represents the hash of a Name in the system
    const Hash = function (hash) {
      
      // attempt to look up the hash from the API
      const lookup = async () => {
        let provider = await _avvy.provider;
        let signal;
        try {
          signal = await provider.lookupHash(hash);
        } catch (err) {
          // hash not revealed
          return null
        }
        const preimage = await _utils.decodeNameHashInputSignals(signal);
        return Name(preimage)
      };

      return {
        hash,
        lookup,
      }
    };

    const name = (n) => {
      return Name(n)
    };

    const hash = (h) => {
      return Hash(h)
    };

    const batch = (items) => {
      const reverse = async (key) => {
        let provider = await _avvy.provider;
        return await provider.reverseResolveEVMBatch(this.batchExecutor, key, items)
      };

      const reverseToNames = async (key) => {
        let provider = await _avvy.provider;
        const signals = await provider.reverseResolveEVMBatchToNames(this.batchExecutor, items);
        const decoded = [];
        for (let i = 0; i < signals.length; i += 1) {
          if (signals[i].length === 0 || signals[0] === null) {
            decoded.push(null);
          } else {
            decoded.push(await _utils.decodeNameHashInputSignals(signals[i]));
          }
        }
        return decoded
      };

      const lookup = async () => {
        let provider = await _avvy.provider;
        const lookupResults = await provider.lookupHashBatch(this.batchExecutor, items);
        const decoded = [];
        for (let i = 0; i < lookupResults.length; i += 1) {
          if (lookupResults[i] === null) {
            decoded.push(null);
          } else {
            decoded.push(await _utils.decodeNameHashInputSignals(lookupResults[i]));
          }
        }
        return decoded
      };

      return {
        lookup,
        reverse,
        reverseToNames,
      }
    };

    const reverse = async (key, value) => {
      let method;
      let provider = await _avvy.provider;
      switch (key) {
        case RECORDS.EVM:
          method = provider.reverseResolveEVM;
          break
      }
      if (!method) throw "Reverse resolver is not implemented for this standard key"
      let result;
      try {
        result = await method(key, value);
      } catch (err) {
       return null
      }
      return Hash(result.hash)
    };
    
    this.name = name;
    this.hash = hash;
    this.reverse = reverse;
    this.batch = batch;
    this.utils = _utils;
  }
}

AVVY.RECORDS = RECORDS;
AVVY.providers = providers(AVVY);

module.exports = AVVY;
