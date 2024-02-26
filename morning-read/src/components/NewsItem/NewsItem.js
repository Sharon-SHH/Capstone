import "./NewsItem.scss";

const NewsItem = ({item}) => {
    return (
      <div>
        <a href={item.url}>{item.name}</a> <span className="newsTag">{item.category}</span>
        <p>{item.description}</p>
      </div>
    );
};

export default NewsItem;
