import { ContractFactory, ethers } from "ethers";
import abi from "../data/contract.json";
import { Routes, Route, useNavigate } from "react-router-dom";

export let contract;
const CONTRACT_ADDRESS = "0x1B48129Fa3AA02d182f5e65811Cdc74D8ce554Bb";

export const connectWallet = async () => {
  console.log("Connect Wallet");
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider.getSigner());

  console.log(provider.getSigner());
  console.log(contract);
};

export const connectWalletHandler = () => {
  let provider;

  if (window.ethereum) {
    // set ethers provider
    provider = new ethers.providers.Web3Provider(window.ethereum);

    // connect to metamask
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((result) => {})
      .catch((error) => {});

    contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider.getSigner());
    console.log(contract);
  } else if (!window.ethereum) {
    console.log("Need to install MetaMask");
  }
};

export const addParent = async (_firstName, _lastName) => {
  console.log("addParent");
  console.log(contract);
  const tx = await contract.addParent(_firstName, _lastName);
  console.log(tx);
  console.log("added");
  console.log("");
};

export const getParent = async () => {
  console.log("getParent");
  const parent = await contract.getParent();
  console.log(parent.firstName);
  console.log(parent);
  console.log("get");
  console.log("");
};

export const addChild = async (
  _adres,
  _firstName,
  _lastName,
  _dateOfBirth,
  _accessDate
) => {
  console.log("addChild");
  const tx = await contract.addChild(
    _adres,
    _firstName,
    _lastName,
    _dateOfBirth,
    _accessDate
  );
  console.log(tx);
  console.log("added Child");
  const parent = await contract.getParent();
};

export const getChildsFromParent = async () => {
  console.log("getChildsFromParent");
  const childArray = await contract.getChildsFromParent();
  console.log(childArray);
  return childArray;
};

export const getChild = async () => {
  console.log("getChild");
  const child = await contract.getChild(
    "0xA745240Fe1D25819FCA6143D15139d44fD7832C4"
  );
  console.log(child);
  //console.log("Child Balance", ethers.utils.formatEther(child.balance));
  //console.log("Child Balance", child.balance.toString());
};
