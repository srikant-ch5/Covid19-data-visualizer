import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import CountUp from "react-countup";
import cx from "classnames";
import styles from "./Cards.module.css";
import Paper from "@material-ui/core/Paper";

import Chart from "../Chart/Chart";
const Cards = ({
  data: {
    confirmed,
    recovered,
    deaths,
    lastUpdate,
    dailyConfirm,
    dailyDeceased,
    dailyRecovered,
    dailyTested,
  },
  country,
  IndState,
}) => {
  console.log(dailyConfirm);
  if (!confirmed) {
    return "Loading ...";
  }
  return (
    <Grid>
      <Grid
        item
        component={Card}
        xs={12}
        className={cx(styles.card, styles.infected)}
      >
        <CardContent style={{ backgroundColor: "#99f2c8" }}>
          <Typography color="textSecondary" gutterBottom>
            Infected
          </Typography>
          <Typography variant="h5">
            <CountUp
              start={0}
              end={IndState ? confirmed : confirmed.value}
              duration={2.5}
              seperator=","
            />
          </Typography>
          <Typography color="textSecondary">
            {new Date(lastUpdate).toDateString()}{" "}
            {dailyConfirm ? <b>&#8593; {dailyConfirm} </b> : ""}
          </Typography>
          <Typography variant="body2">
            Number of active cases of Covid 19
          </Typography>
        </CardContent>
      </Grid>
      <Grid
        item
        component={Card}
        xs={12}
        className={cx(styles.card, styles.recovered)}
      >
        <CardContent style={{ backgroundColor: "rgba(0, 255, 0, 0.5)" }}>
          <Typography color="textSecondary" gutterBottom>
            Recovered
          </Typography>
          <Typography variant="h5">
            <CountUp
              start={0}
              end={IndState ? recovered : recovered.value}
              duration={2.5}
              seperator=","
            />
          </Typography>
          <Typography color="textSecondary">
            {new Date(lastUpdate).toDateString()}{" "}
            {dailyRecovered ? <b>&#8593; {dailyRecovered} </b> : ""}
          </Typography>
          <Typography variant="body2">
            Number of recoveries from Covid 19
          </Typography>
        </CardContent>
      </Grid>
      <Grid
        item
        component={Card}
        xs={12}
        className={cx(styles.card, styles.deaths)}
      >
        <CardContent style={{ backgroundColor: "#c31432" }}>
          <Typography color="textSecondary" gutterBottom>
            Deaths
          </Typography>
          <Typography variant="h5">
            <CountUp
              start={0}
              end={IndState ? deaths : deaths.value}
              duration={2.5}
              seperator=","
            />
          </Typography>
          <Typography color="textSecondary">
            {new Date(lastUpdate).toDateString()}{" "}
            {dailyDeceased ? <b>&#8593; {dailyDeceased} </b> : ""}
          </Typography>
          <Typography variant="body2">Number of deaths Covid 19</Typography>
        </CardContent>
      </Grid>
    </Grid>
  );
};

export default Cards;
