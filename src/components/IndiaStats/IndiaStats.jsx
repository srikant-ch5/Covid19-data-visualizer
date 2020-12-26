import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";

import { Cards, Chart, CountryPicker } from "..";

import styles from "./IndiaStats.module.css";
import { fetchIndiaData } from "../../api";

const IndiaStats = () => {
  const [data, setData] = useState({});
  const [state, setState] = useState("");

  const handleStateChange = async (state) => {
    //fetch the data
    const fetchedData = await fetchIndiaData(state);
    console.log(fetchedData);
    setData(fetchedData);
    setState(state);
  };

  useEffect(() => {
    const fetchAPI = async () => {
      setData(await fetchIndiaData());
    };

    fetchAPI();
  }, []);

  return (
    <div className={styles.container}>
      <CountryPicker
        handleStateChange={handleStateChange}
        Region={"IndiaStats"}
      />
      <Grid container>
        <Cards data={data} IndState={state} />
        <Chart data={data} IndState={state} />
      </Grid>
    </div>
  );
};

export default IndiaStats;
