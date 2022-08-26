import React, { useState, useEffect } from "react";
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

export const connectWalletHandler = async () => {
  let provider;

  if (window.ethereum) {
    // set ethers provider
    provider = new ethers.providers.Web3Provider(window.ethereum);

    // connect to metamask
    await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((result) => { })
      .catch((error) => { });

    contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider.getSigner());
    const userAddress = await provider.getSigner().getAddress();

    const roleValue = addressControl(userAddress);

    return roleValue;

  } else if (!window.ethereum) {
    console.log("Need to install MetaMask");
  }
};

export const addressControl = async (_address) => {
  const tx = await contract.addressControl(_address);
  return tx;
}

export const addParent = async (_firstName, _lastName) => {
  try {
    const tx = await contract.addParent(_firstName, _lastName);
    //console.log(tx);
  } catch (e) {
    if (e.reason.includes("user_already_exists")) {
      console.log("Kullanıcı zaten kayıtlı!");
    } else {
      console.log("Beklenmedik hata: ", e);
    }
  }

};

export const getParent = async () => {
  const parent = await contract.getParent();
  return parent;
};

export const getChild = async () => {
  const child = await contract.getChild();
  return child;
}

export const addChild = async (
  _adres,
  _firstName,
  _lastName,
  _dateOfBirth,
  _accessDate
) => {
  const tx = await contract.addChild(
    _adres,
    _firstName,
    _lastName,
    _dateOfBirth,
    _accessDate
  );
  await tx.wait();

};

export const getChildsFromParent = async () => {
  console.log("getChildsFromParent");
  const childArray = await contract.getChildsFromParent();
  console.log(childArray);
  return childArray;
};

export const storeETH = async (address, amount) => {
  console.log(address, " ", amount);
  const store = await contract.storeETH(address, { value: amount });
  console.log(store);
}

export const parentWithdraw = async (address, amount) => {
  console.log(address, " ", amount);
  const withdraw = await contract.parentWithdraw(address, amount);
  console.log(withdraw);
}

export const childWithdraw = async (date) => {
  const withdraw = await contract.childWithdraw(date);
  console.log(withdraw);
}