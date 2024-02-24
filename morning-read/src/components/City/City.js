import { useState } from "react";
import axios from "axios";
import Weather from "../Weather/Weather";
const baseUrl = process.env.REACT_APP_SERVER_URL;

const City = () => {
    const [searchValue, setSearchValue] = useState("");
    const [cityList, setCityList] = useState([]);
    const [selectCity, setSelectCity] = useState("");
    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    }
    const handleSelectCity = (e) => {
        setSelectCity(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const fetchData = async () => {
            const response = await axios.get(`${baseUrl}/weather/city?search=${searchValue}`);
            console.log(response.data);
            setCityList(response.data);
            setSelectCity(cityList[0]);
        }
        fetchData();
    }
    return (
      <div>
        <h3>Select your city:</h3>
        <form className="city" onSubmit={handleSubmit}>
          <input
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Enter city"
          />
          <button type="submit">Search</button>
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