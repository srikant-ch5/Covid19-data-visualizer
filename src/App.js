import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import DarkModeToggle from "react-dark-mode-toggle";

import GlobalStats from "./components/GlobalStats/GlobalStats";
import IndiaStats from "./components/IndiaStats/IndiaStats";
import Menu from "./components/Menu/Menu";

import styles from "./App.module.css";

import coronaImage from "./images/corona.jpg";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => false);
  return (
    <BrowserRouter className={styles.container}>
      <div
        className="App"
        style={{ justifyContent: "center", flexDirection: "column" }}
      >
        <Menu />

        <Switch>
          <Route exact path="/GlobalStats" component={GlobalStats} />
          <Route exact path="/IndiaStats" component={IndiaStats} />
          <Route path="/" component={null} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
