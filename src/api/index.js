import axios from "axios";

const url = "https://covid19.mathdro.id/api";
const urlIndiaTotalData = `${url}/countries/India`;
const urlIndiaStatesData = `https://api.covid19india.org/v4/min/timeseries.min.json`;

export const fetchData = async (country) => {
  let changeableUrl = url;

  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }

  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableUrl);

    return {
      confirmed,
      recovered,
      deaths,
      lastUpdate,
    };
  } catch (error) {
    console.error(`Error while fetching data ${error}`);
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);
    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));

    return modifiedData;
  } catch (error) {
    console.error(error);
  }
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);

    return countries.map((country) => country.name);
  } catch (error) {
    console.error(error);
  }
};

export const fetchIndiaStates = async () => {
  try {
    const { data } = await axios.get(`${urlIndiaStatesData}`);

    localStorage.setItem("IndiaStats", JSON.stringify(data));

    return Object.keys(data).map((stateCode) => stateCode);
  } catch (error) {
    console.error(error);
  }
};

export const fetchIndiaData = async (state) => {
  try {
    if (state) {
      const INDdataInStorage = JSON.parse(localStorage.getItem("IndiaStats"));

      const APIStateDates = INDdataInStorage[state]["dates"];
      const keys = Object.keys(APIStateDates);
      const lastUpdate = keys[keys.length - 1];

      const { confirmed, deceased, recovered, tested } = APIStateDates[
        lastUpdate
      ]["total"];

      const {
        confirmed: dailyConfirm,
        deceased: dailyDeceased,
        recovered: dailyRecovered,
        tested: dailyTested,
      } = APIStateDates[lastUpdate]["delta"];

      return {
        confirmed,
        recovered,
        deaths: deceased,
        lastUpdate,
        dailyConfirm,
        dailyDeceased,
        dailyRecovered,
        dailyTested,
      };
    } else {
      const {
        data: { confirmed, recovered, deaths, lastUpdate },
      } = await axios.get(urlIndiaTotalData);

      return {
        confirmed,
        recovered,
        deaths,
        lastUpdate,
      };
    }
  } catch (error) {
    console.error(error);
  }
};
