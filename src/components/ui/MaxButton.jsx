import React from "react";
import { motion } from "framer-motion";

const MaxButton = (props) => {
  const buttonVariants = {
    initial: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: { duration: 0.4 },
    },
  };
  return (
    <>
      {props.amount > 0 ? (
        <motion.button
          className="max-button"
          onClick={clear}
          className={scss["max-button"]}
          initial={buttonVariants.initial}
          animate={buttonVariants.visible}
        >
          clear
        </motion.button>
      ) : (
        <motion.button
          className="max-button"
          onClick={setMax}
          className={scss["max-button"]}
          initial={buttonVariants.initial}
          animate={buttonVariants.visible}
        >
          max
        </motion.button>
      )}
    </>
  );
};

export default MaxButton;
