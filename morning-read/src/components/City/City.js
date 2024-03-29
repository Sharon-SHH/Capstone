import { useState } from "react";
import axios from "axios";
import "./City.scss";
import Weather from "../Weather/Weather";
import weatherIcon from "../../assets/images/Icons/weather.svg";
const baseUrl = process.env.REACT_APP_SERVER_URL;

const City = () => {
  const [searchValue, setSearchValue] = useState("");
  const [cityList, setCityList] = useState([]);
  const [selectCity, setSelectCity] = useState("");
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };
  const handleSelectCity = (e) => {
    setSelectCity(e.target.value);
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/weather/city?search=${searchValue}`
      );
      setCityList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
    setSelectCity("");
  };
  return (
    <div className="cityWeather">
      <h3>
        Display Weather for a Specified City{" "}
        <img
          className="cityWeather__Icon"
          src={weatherIcon}
          alt="WeatherIcon"
        />
      </h3>

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
              <option value="">Please select the city</option>
              {cityList.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {selectCity && <Weather selectCity={selectCity} />}
          </div>
        )}
      </form>
    </div>
  );
};

export default City;
