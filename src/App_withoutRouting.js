import React,{useState, useEffect} from "react";
import { Card, CardContent, Typography, Grid} from "@material-ui/core";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import DarkModeToggle from "react-dark-mode-toggle";

import { Cards, Chart, CountryPicker} from './components'

import styles from './App.module.css'
import { fetchData } from './api'

//import coronaImage from './images/corona.jpg'

const App = () => {

    const [data, setData] = useState({});
    const [country, setCountry]= useState("");
    
    const handleCountryChange = async(country)   =>  {
        //fetch the data
        const fetchedData= await fetchData(country)
        console.log(fetchedData);
        setData(fetchedData)
        setCountry(country)
    }

    useEffect(() => {

        const fetchAPI = async() =>{
            setData(await fetchData());
        }

        fetchAPI();
    },[])
        
        const [isDarkMode, setIsDarkMode] = useState(() => false);     
        return (
            <BrowserRouter className={styles.container}>
                {/*<img className={styles.image} alt="COVID-19" src={coronaImage} />*/}
                <DarkModeToggle
                    onChange={setIsDarkMode}
                    checked={isDarkMode}
                    size={80}
                    />
                <CountryPicker handleCountryChange={handleCountryChange}/>
                <Grid container>
                    <Cards data={data} country={country}/>
                    <Chart data={data} country={country}/>
                </Grid>                
            </BrowserRouter>
        )
    
};

export default App;
