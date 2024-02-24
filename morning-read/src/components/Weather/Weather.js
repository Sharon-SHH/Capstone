import React, { useEffect, useState } from "react";
import axios from "axios";
const baseUrl = process.env.REACT_APP_SERVER_URL;

const Weather = ({ selectCity }) => {
    const [weather, setWeather] = useState({});
    
    useEffect(()=> {
        const fetchData = async () => {
          const encodedCity = encodeURIComponent(selectCity)
          const response = await axios.get(
            `${baseUrl}/weather?search=${encodedCity}`
          );
          console.log(response.data);
          setWeather(response.data);
        };
        if (selectCity) {
          fetchData();
        }
    }, [selectCity])
  return (
    <div className="weather">
      {weather && weather.weather ? (
        <div>
          <h3>Today's weather: {weather.weather[0].main}</h3>
          <p>Temperature:{(weather.main.temp - 273.15).toFixed(2)} °C</p>
          <p>Maximum Temperature: {(weather.main.temp_max - 273.15).toFixed(2)} °C</p>
          <p>Minimum Temperature: {(weather.main.temp_min - 273.15).toFixed(2)} °C</p>
        </div>
      ) : (
        <p>No data</p>
      )}
    </div>
  );
};

export default Weather;