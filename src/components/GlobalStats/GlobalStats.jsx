import React,{useState, useEffect} from "react";
import { Card, CardContent, Typography, Grid} from "@material-ui/core";
import {BrowserRouter, Route, Switch} from "react-router-dom";


import { Cards, Chart, CountryPicker} from '../../components'

import styles from './GlobalStats.module.css'
import { fetchData } from '../../api'

const GlobalStats = () => {

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
        
        
        return (
            <div className={styles.container}>
                
                <CountryPicker handleCountryChange={handleCountryChange}/>
                <Grid container>
                    <Cards data={data} country={country}/>
                    <Chart data={data} country={country}/>
                </Grid>                
            </div>
        )
    
};

export default GlobalStats;
