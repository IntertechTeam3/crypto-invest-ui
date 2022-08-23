import React from 'react';
import {useState, useEffect} from 'react'
import "./Parent.css"
import image from"./image.png"
import line from"./line.png"
import kids from"./kids.png"
import orders from"./orders.png"
import {Routes, Route, useNavigate} from 'react-router-dom';
import { useHistory } from "react-router-dom";

const ParentMenu = () => {
    const navigate = useNavigate();

    return (
        <div className='parentpage'>
          <h1 className='h1-parent'>Welcome to Crypto Legacy</h1>
          <i class="fa-brands fa-ethereum"></i>
          <button className="button button1" onClick={() => navigate('/childlist')}></button>
          <button className="button button2" onClick={() => navigate('/orders')}></button>
          <img src={image} className="ethlogo" ></img>
          <img src={line} className="line" ></img>
          <h2 >Kids</h2>
          <h3>Orders</h3>
        </div>
    );
};

export default ParentMenu;
