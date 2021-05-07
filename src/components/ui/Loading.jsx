import React from "react";
import { logo } from "../../assets/svg";
import scss from "./loading.module.scss";
const Loading = () => {
  return <div className={scss["loading-container"]}>{logo}</div>;
};

export default Loading;
