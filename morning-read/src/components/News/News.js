import { useEffect, useState } from "react";
import "./News.scss";
import axios from "axios";
import NewsItem from "../NewsItem/NewsItem";
import newsData from "../../data/data.json";

const baseUrl = process.env.REACT_APP_SERVER_URL;

const News = ()=> {
  const [checkboxes, setCheckboxes] = useState({
    business: false,
    general: false,
    technology: false,
    science: false,
  });
  const [checkedNames, setCheckedNames] = useState("");
  const [newsList, setNewsList] = useState([]);
  const handleCheckboxChange = (checkboxName) => {
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [checkboxName]: !prevCheckboxes[checkboxName],
    }));
  };
  // console.log("click1", checkboxName);
  // setCheckboxes({...checkboxes, [checkboxName]:!checkboxes[checkboxName]});
  // console.log("click2", checkboxes);
  useEffect(() => {
    setCheckedNames(
      Object.keys(checkboxes)
        .filter((key) => checkboxes[key])
        .join(",")
    );
    console.log(checkedNames);
    const fetchData = async () => {
      //   const response = await axios.get(`${baseUrl}/news/${checkedNames}`);
      //   const response = await axios.get(`${baseUrl}/news`);

    //   const newsList = response.data?.articles?.results;
      //   setNewsList(response.data);
      const newsList = newsData;
    //   console.log(response);
      const uniqueNames = [...new Set(newsList.map((item) => item.source.uri))];
      console.log(uniqueNames);
      const resource = [
        "uk.investing.com",
        "dailynews.com",
        "dailymail.co.uk",
        "finance.yahoo.com",
        "investing.com",
        "english.news.cn",
      ];
    };
    fetchData();
  }, [checkboxes]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const fetchData = async () => {
    //   const response = await axios.get(`${baseUrl}/news`);
      const response = newsData;
      console.log(response);
      setNewsList(response);
    };
    fetchData();
  };

  return (
    <form className="news" onSubmit={handleSubmit}>
      <h3>Today's News:</h3>
      <div>
        <label>
          <input
            type="checkbox"
            name="business"
            checked={checkboxes.business}
            onChange={() => handleCheckboxChange("business")}
          />
          business
        </label>
        <label>
          <input
            type="checkbox"
            name="general"
            checked={checkboxes.general}
            onChange={() => handleCheckboxChange("general")}
          />
          general
        </label>
        <label>
          <input
            type="checkbox"
            name="technology"
            checked={checkboxes.technology}
            onChange={() => handleCheckboxChange("technology")}
          />
          technology
        </label>
        <label>
          <input
            type="checkbox"
            name="science"
            checked={checkboxes.science}
            onChange={() => handleCheckboxChange("science")}
          />
          science
        </label>
      </div>
      <div>
        {/* <button type="submit">OK</button> */}
        {newsList && newsList.length > 0 ? (
          newsList.map((item, index) => <NewsItem key={index} item={item} />)
        ) : (
          <p>No news</p>
        )}
      </div>
    </form>
  );
}

export default News;