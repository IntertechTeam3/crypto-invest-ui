import React from 'react';
import "./child.css";
import image from "../Parent/image.png"
import line from "../Parent/line.png"
import balance from "./balance.png"
import calender from "./calender.png"
import {Routes, Route, useNavigate} from 'react-router-dom';

const ChildPage = () => {
    const navigate = useNavigate();

    return (
        <div className='childpage'>
          <h1 className='account'>My Account</h1>
          <h1 className='number'>Balance</h1>
          <button className='withdrawbut'>withdraw</button>

          <img src={image} className="ethlogo" ></img>
          <img src={line} className="line" ></img>
          <img src={balance} className="balanceimg" ></img>
          <img src={calender} className="calender" ></img>
        </div>
    );
};

export default ChildPage;
