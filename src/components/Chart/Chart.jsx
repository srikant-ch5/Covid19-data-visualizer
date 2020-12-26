import React, { useState, useEffect } from "react";
import { fetchDailyData, fetchIndiaData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";
import { Grid } from "@material-ui/core";

import { STATE_NAMES } from "../../constants";

const Chart = ({
  data: { confirmed, deaths, recovered },
  country,
  IndState,
}) => {
  const [dailyData, setDailyData] = useState([]);
  const [dailyIndiaData, setDailyIndiaData] = useState([]);

  //you cannot create async function using useEffect since its synchronous for race conditions so create another function inside the useEffect
  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };

    const fetchIndiaAPI = async () => {
      console.log(`India Daily data`);
      setDailyIndiaData(await fetchIndiaData());
    };
    IndState ? fetchIndiaAPI() : fetchAPI();
  }, []); //without [] -> empty array dependency useEffect will keep o running with [] it will only run once like componentDidMount

  //have two charts
  const lineChart =
    //for global data
    dailyData.length ? (
      <Line
        data={{
          labels: dailyData.map(({ date }) => date),
          datasets: [
            {
              data: dailyData.map(({ confirmed }) => confirmed),
              label: "Infected",
              borderColor: "#3333ff",
              fill: true,
            },
            {
              data: dailyData.map(({ deaths }) => deaths),
              label: "Deaths",
              borderColor: "red",
              backgroundColor: "rgba(255, 0,0,0.5)",
              fill: true,
            },
          ],
        }}
      />
    ) : null;

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "#99f2c8",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)",
            ],
            data: country
              ? [confirmed.value, recovered.value, deaths.value]
              : [confirmed, recovered, deaths],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: {
          display: true,
          text: `Current State in ${country || STATE_NAMES[IndState]}`,
        },
      }}
    />
  ) : null;
  return (
    <Grid className={styles.container}>
      {country || IndState ? barChart : lineChart}
    </Grid>
  );
};

export default Chart;
