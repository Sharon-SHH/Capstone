const SpecificNews = ({specificItem}) => {
    return (
      <div>
        <a href={specificItem.url}>{specificItem.title}</a>{" "}
        <span>
          {specificItem?.source?.uri} & {specificItem.sentiment}
        </span>
        <p>{specificItem.body}</p>
      </div>
    );
}
export default SpecificNews;