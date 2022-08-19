import React, {useState, useEffect} from 'react'
import './Home.css';
import logo from './logo2.svg';
import { Button, Modal } from 'antd';
import 'antd/dist/antd.css';
import {ethers} from 'ethers';
import {Routes, Route, useNavigate} from 'react-router-dom';


function Home() {
  
  // MODAL
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {

    connectWalletHandler();
    
    setIsModalVisible(false);
    if(defaultAccount != null)
    {
      
      navigate('/parent');
    }
    
    
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  }; 
   
  // END MODAL

  // METAMASK CONNECTION
  const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');
	const [provider, setProvider] = useState(null);

  const [name,setName] =useState(null);

	const connectWalletHandler = () => {
		if (window.ethereum && defaultAccount == null) {
			// set ethers provider
			setProvider(new ethers.providers.Web3Provider(window.ethereum));

			// connect to metamask
			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				setConnButtonText('Wallet Connected');
				setDefaultAccount(result[0]);
			})
			.catch(error => {
				setErrorMessage(error.message);
			});

		} else if (!window.ethereum){
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

useEffect(() => {
	if(defaultAccount){
	provider.getBalance(defaultAccount)
	.then(balanceResult => {
		setUserBalance(ethers.utils.formatEther(balanceResult));
	})
  
    navigate('/parent');
}
else{
  console.log("aaa");
}

}, [defaultAccount]);

  // METAMASK CONNECTION END

  // NAVIGATE PAGE

  const navigate = useNavigate();

  

  
  
  return (
      <div className="home">
        
        <h1 className='welcome'>WELCOME TO CRYPTO LEGACY</h1>
        <img src={logo} className='logo'/>
        <button type="primary" className="button" onClick={showModal}>
        Connect Wallet
        </button>
        <Modal className='modal' title="Warning" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <form>
           <h4>You will be connected your metamask account.Dou you want to continue?</h4>
            <label>Name : </label>
            <input type="text" onChange={(event) => {
                 
              setName(event.target.value);
              console.log(name);
            }} />
            <label> Surname : </label>
            <input type="text" />
          </form>
        </Modal>
      </div>
    );
  }
  
  export default Home;