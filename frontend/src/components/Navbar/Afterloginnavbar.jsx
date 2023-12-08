import React from "react";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContextProvider";
import logoImage from "../../Images/logo.png";

import style from "./afterloginnavbar.module.css";

const Afterloginnavbar = () => {
  const [state, setstate] = useState({
    availability: false,
    all_filters: false,
    sortBy: false,
  });
  const [show, setShow] = useState(false);

  const { setUser, setToken } = useContext(AuthContext);

  const hanndelchange = (name, value = null) => {
    setstate({ ...state, [name]: value ? value : !state[name] });
    setShow(!show);
  };
  return (
    <div className={style.header}>
      <div className={style.header_1}></div>
      <div className={style.header_2}>
        <div className={style.header_3}>
          <div className={style.header_4}>
            <div className={style.header_5}>
              <div className={style.header_5_1}>
                <Link className={style.homepagelink} to="/">
                  <img
                    src={logoImage}
                    alt="Gatherly Logo"
                    style={{ width: 145, height: 104 }}
                  />
                </Link>
                <div className={style.header_5_1_search}>
                  <form action="" className={style.header_5_1_form}>
                    <div className={style.header_5_1_form_1}>
                      <div className={style.header_5_1_form_2}>
                        <input
                          type="search"
                          placeholder="Search for Keywords"
                          className={style.header_5_1_form_3}
                        />
                      </div>
                      <div className={style.header_5_1_form_4}>
                        <input
                          type="text"
                          name=""
                          id=""
                          placeholder="Chakdaha,In"
                          className={style.header_5_1_form_5}
                        />
                      </div>
                      <button className={style.header_5_1_form_6}>
                        <svg
                          data-swarm-icon="true"
                          height="18"
                          width="18"
                          viewBox="0 0 18 18"
                          id="search-button"
                        >
                          <path d="M11.89 10.477L16.415 15 15 16.414l-4.523-4.523a6 6 0 111.414-1.414zM7 11a4 4 0 100-8 4 4 0 000 8z"></path>
                        </svg>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className={style.header_5_1_form_7}>
                <Link to="/start" className={style.header_5_1_form_8}>
                  Start a new group - 30% off!
                </Link>
                <Link to="/" className={style.header_5_1_form_9}>
                  <svg
                    data-swarm-icon="true"
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9.666 19.086a9.862 9.862 0 002.334.278c4.97 0 9-3.663 9-8.182S16.97 3 12 3s-9 3.663-9 8.182c0 2.37 1.108 4.504 2.879 5.998L5.455 21l4.21-1.914zM5.868 21.91a1 1 0 01-1.407-1.02l.367-3.308C3.034 15.888 2 13.613 2 11.182 2 6.088 6.497 2 12 2s10 4.088 10 9.182c0 5.093-4.497 9.182-10 9.182-.756 0-1.501-.077-2.226-.229L5.868 21.91z"></path>
                  </svg>
                </Link>
                <Link to="/" className={style.header_5_1_form_10}>
                  <svg
                    data-swarm-icon="true"
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M10.5 5.163l-.357.106A6.503 6.503 0 005.5 11.5v4c0 .943-.557 1.5-1.5 1.5a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h16a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5c-.943 0-1.5-.557-1.5-1.5v-4a6.503 6.503 0 00-4.643-6.23l-.357-.107V4.5a1.5 1.5 0 00-3 0v.663zM12 2a2.5 2.5 0 012.499 2.426A7.503 7.503 0 0119.5 11.5v4c0 .39.11.5.5.5a1.5 1.5 0 011.5 1.5v1A1.5 1.5 0 0120 20H4a1.5 1.5 0 01-1.5-1.5v-1A1.5 1.5 0 014 16c.39 0 .5-.11.5-.5v-4a7.503 7.503 0 015.001-7.074A2.5 2.5 0 0112 2zM9.5 21h5a.5.5 0 110 1h-5a.5.5 0 110-1z"></path>
                  </svg>
                </Link>
                <div className={style.header_5_1_form_11}>
                  <button
                    id="availability"
                    className={style.header_5_1_form_12}
                    onClick={() => hanndelchange("availability")}
                  >
                    <img
                      src="https://img.icons8.com/ios-filled/50/000000/user-male-circle.png"
                      alt="prof"
                    />
                    <div className={style.header_5_1_form_13}>
                      <svg
                        data-swarm-icon="true"
                        height="18"
                        width="18"
                        viewBox="0 0 18 18"
                      >
                        <path d="M13.293 6.293a1 1 0 011.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L9 10.586l4.293-4.293z"></path>
                      </svg>
                    </div>
                  </button>
                  <div
                    className={`${style.header_5_1_form_14} ${
                      show && style.makeItVisible
                    }`}
                  >
                    <div>
                      <div
                        className={style.header_5_1_form_15}
                        style={{ borderBottom: "1px rgba(217,217,217) solid" }}
                      >
                        <ul className={style.header_5_1_form_16}>
                          <li>
                            <Link to="/" className={style.header_5_1_form_17}>
                              Your events
                            </Link>
                          </li>
                          <li>
                            <Link to="/" className={style.header_5_1_form_17}>
                              Your groups
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className={style.header_5_1_form_15}>
                        <hr className={style.header_5_1_form_18} />
                        <ul className={style.header_5_1_form_16}>
                          <li>
                            <Link
                              to="/profile"
                              className={style.header_5_1_form_17}
                            >
                              View profile
                            </Link>
                          </li>
                          <li>
                            <Link to="/" className={style.header_5_1_form_17}>
                              Settings
                            </Link>
                          </li>
                          <li>
                            <Link to="/" className={style.header_5_1_form_17}>
                              Help
                            </Link>
                          </li>
                          <li>
                            <div
                              onClick={() => {
                                setUser({});
                                setToken("");
                              }}
                              className={style.header_5_1_form_17}
                            >
                              Log out
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Afterloginnavbar;
