import React, { useState, useEffect } from "react";
import "./Home.css";
import logo from "./logo-last.png";
import metalogo from "./logo2.svg";
import facebook from "./Facebook.png";
import instagram from "./instagram.png";
import youtube from "./Youtube.png";
import twitter from "./Twitter.png";
import linkedin from "./Linkedin.png";
import eth from "./ETH.png";
import { Button, Modal, Layout, Menu, Row, Col, Divider } from "antd";
import "antd/dist/antd.css";
import {
  connectWalletHandler,
  addParent,
  getParent,
  getChild,
} from "../../shared/contractDeploy";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Spin } from "antd";
import div1 from "./div1.png";
import div2 from "./div2.png";
import div3 from "./div3-1.png";
import div32 from "./div3-2.png";
import div33 from "./div3-3.png";

const { Header, Content, Footer } = Layout;

function Home() {
  // MODAL
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalWait, setIsModalWait] = useState(false);
  const [user, setUser] = useState();

  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  let navigate = useNavigate();

  const Role = {
    admin: 0,
    child: 1,
    parent: 2,
    unregister: 3,
  };

  const showModal = async () => {
    const roleValue = await connectWalletHandler();
    console.log(roleValue);

    if (roleValue === Role.unregister) {
      setIsModalVisible(true);
    } else if (roleValue === Role.parent) {
      navigate("../parent", { replace: true });
    } else if (roleValue === Role.child) {
      navigate("../child", { replace: true });
    }
  };

  const handleOk = async () => {
    await addParent(name, surname);
    setIsModalVisible(false);
    setIsModalWait(true);
    setTimeout(() => {
      navigate("../parent", { replace: true });
      setIsModalWait(false);
    }, 10000);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (

    <Layout>
      <Header className="header"
        style={{
          position: 'fixed',
          zIndex: 1,
          width: '100%',
        }}
      >
        <div className="logo" />
        <Row>
          <Col span={1}>
            <img src={logo} className="logo-last" />
            
          </Col>
          <Col span={9}><a className="legacy" href= "#">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LEGACY CRYPTO</a></Col>
          <Col span={9}>

          </Col>
          <Col span={4} >
            <Menu
              className="menu"
              mode="horizontal">

              <a className="aboutbutton" href="#/about">About&nbsp;&nbsp;&nbsp;&nbsp;</a>
              <button type="primary" className="button" onClick={showModal}>
                Connect Wallet
              </button>
              <Modal
                className="modal"
                title="Warning"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                {/* Burası çıkan pop up formu */}
                <form>
                  <h4>
                    You will be connected your metamask account.Dou you want to
                    continue?
                  </h4>
                  <label>Name : </label>
                  <input
                    type="text"
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                  <label> Surname : </label>
                  <input
                    type="text"
                    onChange={(event) => {
                      setSurname(event.target.value);
                    }}
                  />
                </form>
              </Modal>
              <Modal className="modal" title="Waiting" visible={isModalWait}>
                <Spin />
              </Modal>
            </Menu>
          </Col>
        </Row>
      </Header>

      <Content
        className="home"
        style={{

          width: '100%'
        }}
      >
        <div className="div-1">
          <img src={div1} className="div1pict" />
          <h1 className="div1text1"> LET'S CREATE FUTURE PLANS </h1>
          <h1 className="div1text12"> FOR YOUR CHILDREN TOGETHER!</h1>
        </div>

      </Content>

      <Content
        className="home"
        style={{

          width: '100%'
        }}
      >
        <div className="div-1">
          <img src={div2} className="div2pict" />
          <h1 className="div2text1"> WHAT IS LEGACY CRYPTO ?</h1>
          <img className="eth1" src={eth} />
          <p className="div2sub1"> LegacyCrypto is a web app that allows parents to save crypto money for their children. </p>
          <img className="eth2" src={eth} />
          <p className="div2sub2"> With LegacyCrypto, transfer ethereum to the account you have opened for your children so that they can use it in the future. </p>
          <img className="eth3" src={eth} />
          <p className="div2sub3"> Build the future of your children! </p>
          <img className="eth4" src={eth} />
          <p className="div2sub4"> You can also cancel these operations without transaction fee before the date you set. </p>
        </div>
      </Content>

      <Content
        className="home"
        style={{

          width: '100%'
        }}
      >
        <div>
          <img src={metalogo} className="logo" />
          <h1 className="div3text1"> WHAT IS METAMASK ?</h1>
          <p className="div3prg"> LegacyCrypto allows you to save etherium on your children's account,<br />provided they can use it on a date you specify.</p>
          <Button className="metabuton" href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn" target="_blank">Download Metamask Extension</Button>
        </div>

      </Content>

      <Content
        className="home"
        style={{

          width: '100%'
        }}>
        <div>
          <h1 className="div4text1"> CRYPTO LEGACY ? </h1>
          <Divider type="vertical" />
          <img className="div4img1" src={div3} />
          <h1 className="guven">SAFE</h1>
          <Divider type="vertical" />
          <img className="div4img2" src={div32} />
          <h1 className="hiz">FAST</h1>
          <Divider type="vertical" />
          <img className="div4img3" src={div33} />
          <h1 className="kolay ">EASY USE</h1>

        </div>
      </Content>

      <Footer
        style={{
          backgroundColor: '#5089C6',
          textAlign: 'center',
        }}
      >
        <h2 className="Powered">
          Powered by Intertech - All Rights Reserved
        </h2>
        <Divider />

        <a href="https://www.facebook.com/IntertechIT/"> <img src={facebook} className="facebooklogo" /></a>
        <Divider type="vertical" />
        <a href="https://www.instagram.com/intertechteyasam/"> <img src={instagram} className="instagramlogo" /></a>
        <Divider type="vertical" />
        <a href="https://twitter.com/intertechIT"> <img src={twitter} className="twitterlogo" /></a>
        <Divider type="vertical" />
        <a href="https://www.youtube.com/channel/UCXC8pcaXM5cSatFeqYbzxlg"> <img src={youtube} className="youtubelogo" /></a>
        <Divider type="vertical" />
        <a href="https://www.linkedin.com/company/intertech-information-technology-and-marketing-inc-/mycompany/verification/"> <img src={linkedin} className="linkedinlogo" /></a>


        <Divider/>
        <div className="FooterDiv">
          <a className="FooterDiv" href="https://www.intertech.com.tr/en/terms-of-use"> Terms of Use</a>
          <Divider type="vertical" />
          <a className="FooterDiv" href="https://www.intertech.com.tr/en/privacy-policy">Privacy Policy</a>
          <Divider type="vertical" />
          <a className="FooterDiv" href="https://www.intertech.com.tr/en/cookies-policy">Cookies Policy</a>
          <Divider type="vertical" />
          <a className="FooterDiv" href="https://www.intertech.com.tr/en/contact#">Contact Us</a>
        </div>
      </Footer>
    </Layout>

  );
}

export default Home;