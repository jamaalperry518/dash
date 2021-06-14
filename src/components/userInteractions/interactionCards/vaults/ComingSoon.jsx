import React from "react";
import scss from "./comingSoon.module.scss";

const ComingSoon = () => {
  return (
    <div className={scss["coming-soon-container"]}>
      <h1 className={scss["page-title"]}>Vaults coming soon.</h1>
      <p className={scss["coming-soon-text"]}>
        Burn or Mint some Array while you wait. We apreciate your support!
      </p>
    </div>
  );
};

export default ComingSoon;
