import React from 'react';
import "../styles/ChildPage.css"
const ChildPage = () => {
    return (
        <div className='ChildPage'>
          <h1 >Welcome to Crypto Legacy</h1>
          <h3>Name surname</h3>
          <p id='firstparagraph'>amount</p>
          <p id='secondparagraph'>date</p>
          <img id='etherimage'src="https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/256/Ethereum-ETH-icon.png" 
          width="100" height="100"></img>
          <img id='bigetherimage'src="https://icons-for-free.com/iconfiles/png/512/eth+ethcoin+etherium+icon-1320162857971241492.png" 
          width="300" height="300"></img>
          <img id='dateimage' src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Blank_Calendar_page_icon.svg/1693px-Blank_Calendar_page_icon.svg.png"  
          width="300" height="300"
          ></img>
          <button className="buttonwithdraw">withdraw  </button>
          
          
        </div>
    );
};

export default ChildPage;