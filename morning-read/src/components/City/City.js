import { useEffect, useState } from "react";
import axios from "axios";
import "./City.scss";
import Weather from "../Weather/Weather";
const baseUrl = process.env.REACT_APP_SERVER_URL;

const City = () => {
    const [searchValue, setSearchValue] = useState("");
    const [cityList, setCityList] = useState([]);
    const [selectCity, setSelectCity] = useState("Toronto,ca");
    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    }
    const handleSelectCity = (e) => {
        setSelectCity(e.target.value);
    }
    const fetchData = async () => {
      const response = await axios.get(
        `${baseUrl}/weather/city?search=${searchValue}`
      );
      setCityList(response.data);
      setSelectCity(cityList[0]);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    }
    return (
      <div className="cityWeather">
        <h3>Select your city:</h3>
        <form className="city" onSubmit={handleSubmit}>
          <div className="cityWeather__inputCity">
            <input
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
              placeholder="Enter city"
            />
            <button className="cityWeather__btn" type="submit">
              Search
            </button>
          </div>
          {cityList && cityList.length > 0 && (
            <div>
              <select value={selectCity} onChange={handleSelectCity}>
                {cityList.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <Weather selectCity={selectCity} />
            </div>
          )}
        </form>
      </div>
    );
};

export default City;