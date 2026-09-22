import "./Loading.css";

const Loading = ({ text = "Loading..." }) => {
  return (
    <div className="loading-state">
      <div className="loading-spinner" aria-label="Loading" />
      <p>{text}</p>
    </div>
  );
}

export default Loading;
