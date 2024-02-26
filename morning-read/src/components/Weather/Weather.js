import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Weather.scss";
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
          <h3>
            Today's weather:{" "}
            <span className="details">{weather.weather[0].main}</span>
          </h3>
          <p>
            Temperature:{" "}
            <span className="details">
              {(weather.main.temp - 273.15).toFixed(2)} °C
            </span>
          </p>
          <div className="reservedTasks__content">
            <p>
              Maximum Temperature:{" "}
              <span className="details">
                {(weather.main.temp_max - 273.15).toFixed(2)} °C
              </span>
            </p>
            <p>
              Minimum Temperature:{" "}
              <span className="details">
                {(weather.main.temp_min - 273.15).toFixed(2)} °C
              </span>
            </p>
          </div>
        </div>
      ) : (
        <p>No data</p>
      )}
    </div>
  );
};

export default Weather;