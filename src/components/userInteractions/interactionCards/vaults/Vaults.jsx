import React from "react";
import { connect } from "react-redux";
import { motion } from "framer-motion";

//components
import SingleVault from "./SingleVault";

const Vaults = (props) => {
  const allVaults = Object.values(props.vaults);
  const variants = {
    hidden: {
      y: "-5rem",

      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        default: {
          type: "spring",
          damping: 15,
        },
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      scaleX: 0.98,
      y: "2rem",
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <motion.div
      initial={variants.hidden}
      animate={variants.visible}
      exit={variants.exit}
      className="vaults-container"
    >
      <p className="section-heading">Vaults currently available.</p>
      {allVaults?.map((vault, i) => {
        return <SingleVault key={i} vault={vault} />;
      })}
    </motion.div>
  );
};

const mapStateToProps = (state) => {
  return {
    vaults: state.vaults.state,
    address: state.wallet.address,
  };
};
export default connect(mapStateToProps)(Vaults);
