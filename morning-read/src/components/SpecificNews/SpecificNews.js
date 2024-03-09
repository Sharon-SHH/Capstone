import "./SpecificNews.scss";
import React, { useState } from "react";


const SpecificNews = ({specificItem}) => {
  const [showAll, setShowAll] = useState(false);
  const handleReadMore = () => {
    setShowAll(true);
  };
  return (
    <div className="spNews">
      <h4>
        <a href={specificItem.url}><strong>{specificItem.title}</strong></a>
      </h4>

      {" from "}
      <span className="details">{specificItem?.source?.uri}</span>
      <p>
        {showAll ? specificItem.body : `${specificItem.body.slice(0, 500)}...`}
      </p>
      <div className="spNews__wrapper">
        {!showAll && specificItem.body.length > 100 && (
          <button className="spNews__more" onClick={handleReadMore}>
            {">"}
          </button>
        )}
      </div>
    </div>
  );
}
export default SpecificNews;