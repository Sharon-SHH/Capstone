import "./SpecificNews.scss";

const SpecificNews = ({specificItem}) => {
    return (
      <div className="spNews">
        <h4>
          <a href={specificItem.url}>{specificItem.title}</a>
        </h4>{" from "}
        <span className="details">
          {specificItem?.source?.uri}
        </span>
        <p>{specificItem.body}</p>
      </div>
    );
}
export default SpecificNews;