import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import DarkModeToggle from "react-dark-mode-toggle";
import "./Menu.css";

import coronaImage from "../../images/corona.jpg";

import styles from "./Menu.css";

const Menu = (props) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [optionClicked, setOptionClicked] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => false);

  const setClassNames = (num) => {
    const classArr = ["m-item"];
    if (openMenu) classArr.push(`open-${num}`);

    return classArr.join(" ");
  };

  useEffect(() => {
    const currentRoute = window.location.pathname;
    currentRoute === "/" || currentRoute === "/Covid19-data-visualizer/"
      ? setOptionClicked(false)
      : setOptionClicked(true);
  }, []);

  const pushToRoute = (routeTopush) => {
    props.history.push(routeTopush);
    setOpenMenu(false);

    routeTopush === "/" ? setOptionClicked(false) : setOptionClicked(true);
  };

  return (
    <div className={styles.container}>
      <div className={optionClicked ? "MenuRight" : "Menu"}>
        <div className={"m-item m-logo"} onClick={() => setOpenMenu(!openMenu)}>
          <img
            style={{ width: "50px", marginTop: "5px" }}
            alt="COVID-19"
            src={coronaImage}
          />
        </div>
        <div
          className={setClassNames(1)}
          onClick={() => pushToRoute("/IndiaStats")}
        >
          India Stats
        </div>
        <div
          className={setClassNames(2)}
          onClick={() => pushToRoute("/GlobalStats")}
        >
          Global Stats
        </div>
        <div className={setClassNames(3)} onClick={() => pushToRoute("/")}>
          Sign out
        </div>
        <div className={setClassNames(4)}>
          <DarkModeToggle
            onChange={setIsDarkMode}
            checked={isDarkMode}
            size={80}
          />
        </div>
      </div>
    </div>
  );
};

export default withRouter(Menu);
