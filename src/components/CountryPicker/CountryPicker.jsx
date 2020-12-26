import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";

import styles from "./CountryPicker.module.css";

import { fetchCountries, fetchIndiaStates } from "../../api";
import { STATE_NAMES } from "../../constants";

const CountryPicker = ({ handleCountryChange, handleStateChange, Region }) => {
  const [fetchedCountries, setFetchedCountries] = useState([]);
  const [fetchedIndiaStates, setFetchedIndiaStates] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      Region === "IndiaStats"
        ? setFetchedIndiaStates(await fetchIndiaStates())
        : setFetchedCountries(await fetchCountries());
    };
    fetchAPI();
  }, [setFetchedCountries, setFetchedIndiaStates]); //second parameter coz: useEffect will run endlessly without second params, after passing second params useEffect will run only when setFetchCountries is changed )

  return (
    <FormControl className={styles.formControl}>
      {Region === "IndiaStats" ? (
        <NativeSelect
          defaultValue=""
          onChange={(e) => handleStateChange(e.target.value)}
        >
          <option value="">India</option>
          {fetchedIndiaStates.map((state, i) => {
            if (state !== "UN" && state !== "TT")
              return (
                <option key={i} value={state}>
                  {STATE_NAMES[state]}
                </option>
              );
          })}
        </NativeSelect>
      ) : (
        <NativeSelect
          defaultValue=""
          onChange={(e) => handleCountryChange(e.target.value)}
        >
          <option value="">Global</option>
          {fetchedCountries.map((country, i) => (
            <option key={i} value={country}>
              {country}
            </option>
          ))}
        </NativeSelect>
      )}
    </FormControl>
  );
};

export default CountryPicker;
