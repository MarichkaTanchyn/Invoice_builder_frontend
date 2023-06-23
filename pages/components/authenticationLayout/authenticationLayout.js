import Header from "../util/header/header";
import React from "react";
import style from "../layout/layout.module.css";


const AuthenticationLayout = ({ children }) => {
  return (
      <div className={style.pageContainer}>
          <Header/>
          <div className={style.pageContentContainer}>
              {children}
          </div>
      </div>
  );
};

export default AuthenticationLayout;