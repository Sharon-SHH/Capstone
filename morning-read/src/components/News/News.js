import { useEffect, useState } from "react";
import "./News.scss";
import axios from "axios";
import newsIcon from "../../assets/images/Icons/news-64.png";
import NewsItem from "../NewsItem/NewsItem";
import SpecificNews from "../SpecificNews/SpecificNews";

const baseUrl = process.env.REACT_APP_SERVER_URL;

const News = ()=> {
  const [newsList, setNewsList] = useState([]);
  const [specificNewsList, setSpecificNewsList] = useState([]);
  const [selectedOption, setSelectedOption] = useState("all");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${baseUrl}/news`);
      const tmpList = response.data?.articles?.results;
      // get specific news: filter related news, remove duplicated news
      const filterList = tmpList.filter(
        (item, index, self) =>
          item.sentiment >= 0.40 &&
          index === self.findIndex((t) => t.title === item.title)
      );

      const resultList =
        filterList &&
        filterList.sort(
          (firstItem, secondItem) => secondItem.sentiment - firstItem.sentiment
        );

      setSpecificNewsList(resultList);
    };

    fetchData();
  }, []);
  useEffect(()=> {
     const fetchData = async () => {
       // Get news List
       if (selectedOption === "all") {
         const responseN = await axios.get(`${baseUrl}/news/all/`);
         setNewsList(responseN.data);
       } else {
         const responseN = await axios.get(
           `${baseUrl}/news/all/${selectedOption}`
         );
         setNewsList(responseN.data);
       }
     };
     fetchData();
  }, [selectedOption])
  const handleSubmit = (e) => {
    e.preventDefault();
  };
   

  return (
    <form className="news" onSubmit={handleSubmit}>
      <h3>
        Today's News:{" "}
        <img className="news__icon" src={newsIcon} alt="taskIcon" />
      </h3>
      <section className="specific">
        <div className="specific__wrapper">
          {specificNewsList && specificNewsList.length > 0 ? (
            specificNewsList.map((specificItem) => (
              <SpecificNews
                key={specificItem.uri}
                specificItem={specificItem}
              />
            ))
          ) : (
            <p>Loading ...</p>
          )}
        </div>
      </section>
      <section className="newsResources">
        <h3>News Resources:</h3>
        <div>
          <label>
            <input
              type="radio"
              id="all"
              name="options"
              value="all"
              checked={selectedOption === "all"}
              onChange={handleOptionChange}
            />
            All
          </label>
          <label>
            <input
              type="radio"
              id="business"
              name="options"
              value="business"
              checked={selectedOption === "business"}
              onChange={handleOptionChange}
            />
            business
          </label>
          <label>
            <input
              type="radio"
              id="general"
              name="options"
              value="general"
              checked={selectedOption === "general"}
              onChange={handleOptionChange}
            />
            general
          </label>
          <label>
            <input
              type="radio"
              id="technology"
              name="options"
              value="technology"
              checked={selectedOption === "technology"}
              onChange={handleOptionChange}
            />
            technology
          </label>
          <label>
            <input
              type="radio"
              id="science"
              name="options"
              value="science"
              checked={selectedOption === "science"}
              onChange={handleOptionChange}
            />
            science
          </label>
        </div>
        <div>
          <ul>
            {newsList && newsList.length > 0 ? (
              newsList.map((item, index) => (
                <li key={index}>
                  <NewsItem item={item} />
                </li>
              ))
            ) : (
              <li>
                <p>No news</p>
              </li>
            )}
          </ul>
        </div>
      </section>
    </form>
  );
}

export default News;