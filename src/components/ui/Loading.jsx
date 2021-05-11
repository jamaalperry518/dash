import React from "react";
import { logo } from "../../assets/svg";
import scss from "./loading.module.scss";
import { motion } from "framer-motion";
const Loading = () => {
  return (
    <div className={scss["loading-container"]}>
      <motion.div
        animate={{
          opacity: [0.3, 0.7, 1, 0.7, 0.8, 1, 0.5],
          scale: [1.5, 1.8, 1.5, 1.6, 1.5, 1.6, 1.5],
          transition: { duration: 5 },
        }}
      >
        {logo}
      </motion.div>
    </div>
  );
};

export default Loading;
