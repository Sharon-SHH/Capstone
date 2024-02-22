const NewsItem = ({item}) => {
    return (
      <div>
        <a href={item.url}>{item.name}</a> <span>{item.category}</span>
        <p>{item.description}</p>
      </div>
    );
};

export default NewsItem;
