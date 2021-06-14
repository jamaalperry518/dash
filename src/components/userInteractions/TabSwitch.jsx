import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

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
      link: "/",
      image: <HiChartBar />,
      class: "tab vaults ",
      selected: false,
    },
  });

  const popupVariats = {
    initial: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 1 } },
  };
  const [showModal, setShow] = useState(false);

  const tabsArr = Object.values(tabs);

  const selectHandler = (data) => {
    if (data.name === "vaults") {
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 1500);
    } else {
      let copy = { ...tabs };
      copy["mint"]["selected"] = false;
      copy["burn"]["selected"] = false;
      copy["vaults"]["selected"] = false;
      copy[data.name]["selected"] = true;
      setTabs(copy);
    }
  };

  useEffect(() => {
    console.log(showModal);
  }, [showModal]);

  return (
    <AnimatePresence>
      <div className={props.address ? "tab-switch" : "tab-switch inactive"}>
        {tabsArr.map((tab, i) => {
          return (
            <motion.div
              whileHover={
                tab.name !== "vaults"
                  ? {
                      boxShadow: ".2rem .2rem .6rem rgba(255 255, 255, 0.31)",
                      color: "#1330f4",
                      transition: {
                        duration: 0.3,
                        type: "spring",
                        stiffness: 200,
                      },
                      x: "-.3rem",
                      scale: 1.01,
                    }
                  : null
              }
              key={i}
              onClick={() => selectHandler(tab)}
              className={
                tab.name === "vaults"
                  ? "inactive-tab"
                  : tab.selected
                  ? `${tab.class} selected`
                  : tab.class
              }
            >
              <Link
                to={tab.link}
                className={tab.name === "vaults" ? "disabled" : "tab-link"}
              >
                {tab.image}
              </Link>
            </motion.div>
          );
        })}
        {showModal && (
          <motion.div
            key="popup"
            className="soon-popup"
            initial={popupVariats.initial}
            animate={popupVariats.visible}
            exit={popupVariats.exit}
          >
            <p className="popup-text">Vaults coming soon!</p>
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
};
const mapStateToProps = (state) => {
  return {
    address: state.wallet.address,
  };
};

export default connect(mapStateToProps)(TabSwitch);
