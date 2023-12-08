import React from "react";
import { Link } from "react-router-dom";

import style from "./Navbar.module.css";
import logoImage from "../../Images/logo.png";

const Navbarwrapper = () => {
  return (
    <header className={style.header}>
      <div className={style.subhead}></div>
      <div className={style.px6}>
        <div className={style.px7}>
          <div className={style.mainpart}>
            <div className={style.mainpart1}>
              <div className={style.logo}>
                <Link className={style.homepagelink} to="/">
                  <img
                    src={logoImage}
                    alt="Gatherly Logo"
                    style={{ width: 145, height: 104 }}
                  />
                </Link>
              </div>
              <div className={style.loginsignup}>
                <Link
                  to="/login"
                  className={style.loginlink}
                  style={{ alignItems: "flex-start", marginRight: "20px",fontSize: "18px" }}
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className={style.loginlink}
                  style={{ fontSize: "18px" }}
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbarwrapper;
