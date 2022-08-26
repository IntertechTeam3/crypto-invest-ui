import React, { useState, useEffect } from "react";
import { ContractFactory, ethers } from "ethers";
import abi from "../data/contract.json";
import { Routes, Route, useNavigate } from "react-router-dom";

export let contract;
const CONTRACT_ADDRESS = "0x1B48129Fa3AA02d182f5e65811Cdc74D8ce554Bb";

export const connectWalletHandler = async () => {
  let provider;

  if (window.ethereum) {
    // set ethers provider
    provider = new ethers.providers.Web3Provider(window.ethereum);

    // connect to metamask
    await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((result) => {})
      .catch((error) => {});

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
};

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

export const addChild = async (_adres, _firstName, _lastName, _accessDate) => {
  console.log("addChild");
  const tx = await contract.addChild(
    _adres,
    _firstName,
    _lastName,
    _accessDate
  );
  await tx;
};

export const getChildsFromParent = async () => {
  console.log("getChildsFromParent");
  const childArray = await contract.getChildsFromParent();
  console.log(childArray);
  return childArray;
};

export const getChild = async (_adres) => {
  console.log("getChild");
  const child = await contract.getChild();
  console.log(child);
  console.log("gettedChild");
  return child;
};

export const storeETH = async (address, amount) => {
  console.log(address, " ", amount);
  const store = await contract.storeETH(address, { value: amount });
  console.log(store);
};

export const parentWithdraw = async (address, amount) => {
  console.log(address, " ", amount);
  const withdraw = await contract.parentWithdraw(address, amount);
  console.log(withdraw);
};

export const childWithdraw = async (date) => {
  const withdraw = await contract.childWithdraw(date);
  console.log(withdraw);
};

export const getAllParent = async () => {
  console.log("getAllParents");
  console.log(contract);
  const allParents = await contract.getAllParent();
  console.log(allParents);
  console.log("gettedAllParents");
  return allParents;
};

export const getAllChild = async () => {
  console.log("getAllChild");
  const allChilds = await contract.getAllChild();
  console.log(allChilds);
  console.log("gettedAllChild");
  return allChilds;
};

export const getAllUser = async () => {
  console.log("getAllUsers");
  let allUsers = await getAllParent();
  allUsers = [...allUsers, ...(await getAllChild())];

  console.log(allUsers);
  return allUsers;
};

export const getChildsFromParentWithAddress = async (_address) => {
  console.log("getChildsFromParent");
  const childParent = await contract.getChildsFromParentWithAddress(_address);
  console.log(childParent);
  return childParent;
};
