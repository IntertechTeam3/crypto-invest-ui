import React, { useEffect, useState } from "react";
import { getChild, childWithdraw } from "../../shared/contractDeploy";
import "./Child.css";
import dayjs from "dayjs";
import ProfileComponent from "../../component/ProfileComponent";
import { Button, Layout, Progress } from "antd";
const { Content } = Layout;

const ChildPage = () => {
  const [child, setChild] = useState({});
  const [active, isActive] = useState(true);
  const [dayDif, setDayDif] = useState();

  const getChildInformations = async () => {
    try {
      const res = await getChild();
      setChild({
        firstName: res.firstName,
        lastName: res.lastName,
        balance: (res.balance || 0).toString(),
        accessDateTimeStamp: dayjs
          .unix(res.accessDateTimeStamp)
          .format("DD/MM/YYYY"),
        dateOfBirthTimeStamp: dayjs
          .unix(res.dateOfBirthTimeStamp)
          .format("DD/MM/YYYY"),
        timeDif: (res.accessDateTimeStamp - dayjs().unix()) / 60 / 60 / 24,
      });
      let balanceString = parseInt(res.balance.toString());
      console.log("deger: ", balanceString > 0);
      console.log(child.timeDif);

      console.log(
        "deger: ",
        dayjs().unix() >= res.accessDateTimeStamp.toNumber()
      );
      if (
        dayjs().unix() >= res.accessDateTimeStamp.toNumber() &&
        balanceString > 0
      ) {
        console.log("girdi");
        console.log(balanceString);
        isActive(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getChildInformations();
  }, []);

  return (
    <Layout>
      <Content
        style={{ background: "#16357B", minHeight: "700px", marginTop: "60px" }}
      >
        <ProfileComponent />
        <div className="divChild">
          <div id="divBalance">
            <div id="balance" />
            <h4>{child.balance}</h4>
          </div>
          <div id="divButton">
            {console.log(active)}
            {/*     <Progress
              type="circle"
              percent={1}
              format={(percent) => `${percent} Days`}
            />
            <Progress type="circle" percent={100} format={() => "Done"} /> */}
            <Button
              type="primary"
              onClick={async () => {
                await childWithdraw(dayjs().unix());
                setTimeout(() => {
                  getChildInformations();
                }, 50000);
              }}
              disabled={active}
            >
              Withdraw
            </Button>
          </div>
          <div id="divDate">
            <div id="date" />
            <h4>{child.accessDateTimeStamp}</h4>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default ChildPage;
