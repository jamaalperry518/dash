import React, { useState } from "react";
import { connect } from "react-redux";

//components
import { HiOutlinePlus } from "react-icons/hi";
import { HiFire } from "react-icons/hi";
import { HiChartBar } from "react-icons/hi";
import { Link } from "react-router-dom";

const TabSwitch = (props) => {
  const [tabs, setTabs] = useState({
    mint: {
      name: "mint",
      link: "/",
      image: <HiOutlinePlus />,
      class: "tab plus ",
      selected: true,
    },
    burn: {
      name: "burn",
      link: "/burn",
      image: <HiFire />,
      class: "tab burn ",
      selected: false,
    },
    vaults: {
      name: "vaults",
      link: "/vaults",
      image: <HiChartBar />,
      class: "tab vaults ",
      selected: false,
    },
  });
  const tabsArr = Object.values(tabs);

  return (
    <div className={props.address ? "tab-switch" : "tab-switch inactive"}>
      {tabsArr.map((tab, i) => {
        return (
          <div className={tab.class}>
            <Link to={tab.link}>{tab.image}</Link>
          </div>
        );
      })}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    address: state.wallet.address,
  };
};

export default connect(mapStateToProps)(TabSwitch);
